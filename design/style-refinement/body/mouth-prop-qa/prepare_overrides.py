"""Conservative full-face clearance for 25 bodies x 31 broad props.

Uses all 36 actual facial alpha sprites, original hand ink and original prop
alpha. Writes an isolated proposal only. No global catalog/engine/art changes.
"""
from pathlib import Path
import importlib.util,json,math,time
from functools import lru_cache
import cv2
import numpy as np
from PIL import Image,ImageDraw

HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[3]
spec=importlib.util.spec_from_file_location('face_qa',ROOT/'design/style-refinement/face-simplification/prepare_faces.py')
fq=importlib.util.module_from_spec(spec);spec.loader.exec_module(fq);q=fq.q
# Keep the exact pre-proposal catalog when the root later merges these offsets.
# Re-running the preparation must not reinterpret the already-fixed layout as
# the original layout and erase all overrides.
BASELINE=HERE/'baseline-parts.json'
if BASELINE.exists():
    q.PARTS=json.loads(BASELINE.read_text())
    q.BY_ID={p['id']:p for parts in q.PARTS.values() for p in parts}
EXCLUDED={'prop_04','prop_05','prop_11','prop_13','prop_30'}
PROPS=[p for p in q.PARTS['prop'] if p['id'] not in EXCLUDED]
COLOR='#eef9f3'


def rotate(v,deg):
    a=math.radians(deg);c,s=math.cos(a),math.sin(a);x,y=v
    return np.array([x*c-y*s,x*s+y*c])


def exact_prop_mask(b,p,center,angle,scale):
    S=190/b['w'];size=b['anchors']['prop'][2]*S*scale
    ps=min(size/p['w'],size*1.25/p['h']);cv=Image.new('RGBA',(512,512))
    q.layer(cv,p,ps,[p['w']/2,p['h']/2],center,angle)
    return np.array(cv)[:,:,3]>96


def facial_masks(b):
    A=b['anchors'];S=190/b['w'];top=440-b['h']*S;answer=[]
    for f in q.PARTS['face']:
        cv=Image.new('RGBA',(512,512));fs=A['face'][2]*S*1.2/q.FACE_REF
        q.layer(cv,f,fs,[f['w']/2,f['h']/2],[161+A['face'][0]*S,top+A['face'][1]*S],A['face'][3] if len(A['face'])>3 else 0)
        mask=np.array(cv)[:,:,3]>128
        answer.append(mask)
    union=np.logical_or.reduce(answer).astype('uint8')
    # 3px during search absorbs raster-rounding differences; final requirement2px.
    safe=cv2.dilate(union,np.ones((7,7),np.uint8))>0
    final=cv2.dilate(union,np.ones((5,5),np.uint8))>0
    return answer,safe,final


def hands(b):
    raw=Image.open(ROOT/b['arms']).convert('RGBA');a=np.array(raw).astype(float)
    a[:,:,3]*=np.clip((220-a[:,:,:3].max(2))/100,0,1)
    stroke=Image.fromarray(a.astype(np.uint8));native_mask=a[:,:,3]>80
    H,W=native_mask.shape;out=[];hulls=np.zeros((H,W),np.uint8)
    yy,xx=np.where(native_mask)
    for sel in [xx<W/2,xx>=W/2]:
        if np.count_nonzero(sel)<3:continue
        pts=np.column_stack((xx[sel],yy[sel])).astype(np.int32);hull=cv2.convexHull(pts)
        mask=np.zeros((H,W),np.uint8);cv2.fillConvexPoly(mask,hull,255);hulls=np.maximum(hulls,mask)
        this=np.zeros_like(a,dtype=np.uint8);this[yy[sel],xx[sel],3]=255
        path=HERE/f'{b["id"]}-hand-ink-{len(out)}.png';Image.fromarray(this).save(path)
        cv=Image.new('RGBA',(512,512));S=190/b['w'];top=440-b['h']*S
        q.layer(cv,{'src':str(path.relative_to(ROOT)),'w':b['w'],'h':b['h']},S,[0,0],[161,top])
        ink=np.array(cv)[:,:,3]>96;py,px=np.where(ink)
        if not len(px):continue
        sign=-1 if px.mean()<256 else 1
        targets=[];x_outer=px.min() if sign<0 else px.max();height=py.max()-py.min()
        for frac in [.27,.73]:
            ideal=np.array([x_outer,py.min()+height*frac]);points=np.column_stack((px,py))
            # A C's lower end is further inward than its upper end. Restrict the
            # vertical half so both targets do not collapse onto the upper tip.
            region=points[:,1]<(py.min()+height*.5) if frac<.5 else points[:,1]>=(py.min()+height*.5)
            candidates=points[region];scores=((candidates-ideal)**2).sum(1);point=candidates[np.argmin(scores)].astype(float)
            targets.append(point)
        out.append({'ink':ink,'sign':sign,'center':np.array([px.mean(),py.mean()]),'targets':targets,
            'bounds':[int(px.min()),int(py.min()),int(px.max()),int(py.max())]})
    # Same filled hull and recolored body pixels as the live hand renderer.
    body=q.sprite(b,COLOR).resize((W,H),Image.Resampling.LANCZOS);ba=np.array(body)
    ba[:,:,3]=np.minimum(ba[:,:,3],hulls);overlay=Image.fromarray(ba);overlay.alpha_composite(stroke)
    path=HERE/f'{b["id"]}-hand-overlay.webp';overlay.save(path,'WEBP',lossless=True)
    handpart={'src':str(path.relative_to(ROOT)),'w':b['w'],'h':b['h']}
    union=np.logical_or.reduce([h['ink'] for h in out])
    return out,union,handpart


class Fit:
    def __init__(self,b,p,face_safe,face_final,hand_data,ink):
        self.b=b;self.p=p;self.safe=face_safe;self.final=face_final;self.hands=hand_data;self.ink=ink
        A=b['anchors'];self.S=190/b['w'];self.top=440-b['h']*self.S
        self.anchor=np.array([161+A['prop'][0]*self.S,self.top+A['prop'][1]*self.S])
        off=A.get('propOffsets',{}).get(p['id'],[0,0]);self.old=list(off)
        self.oldcenter=self.anchor+np.array(off[:2])*self.S
        self.baseangle=A['prop'][3] if len(A['prop'])>3 else 0
        self.oldangle=self.baseangle+(off[2] if len(off)>2 else 0)
        self.oldscale=off[3] if len(off)>3 else 1
        size=A['prop'][2]*self.S;self.ps=min(size/p['w'],size*1.25/p['h'])
        self.original=q.sprite(p).resize((round(p['w']),round(p['h'])),Image.Resampling.LANCZOS)
        self.cache={}

    def geom(self,angle,scale):
        key=(round(angle,3),round(scale,3))
        if key not in self.cache:
            im=self.original.resize((max(1,round(self.p['w']*self.ps*scale)),max(1,round(self.p['h']*self.ps*scale))),Image.Resampling.BICUBIC)
            im=im.rotate(-angle,Image.Resampling.BICUBIC,expand=True)
            yy,xx=np.where(np.array(im)[:,:,3]>96)
            self.cache[key]=np.column_stack((xx-im.width/2,yy-im.height/2))
        return self.cache[key]

    def measure(self,center,angle,scale,exact=False):
        if exact:
            mask=exact_prop_mask(self.b,self.p,center,angle,scale);yy,xx=np.where(mask)
            face=self.final
        else:
            xy=np.rint(self.geom(angle,scale)+center).astype(int);xx,yy=xy[:,0],xy[:,1];face=self.safe
        if xx.min()<76 or xx.max()>436 or yy.min()<150 or yy.max()>447:return None
        collision=int(np.count_nonzero(face[yy,xx]));contact=int(np.count_nonzero(self.ink[yy,xx]))
        counts=[int(np.count_nonzero(h['ink'][yy,xx])) for h in self.hands]
        return {'collision':collision,'inkContact':contact,'handContacts':counts,'propPixels':len(xx),
            'bounds':[int(xx.min()),int(yy.min()),int(xx.max()),int(yy.max())]}

    def valid(self,center,angle,scale):
        result=self.measure(center,angle,scale)
        if not result or result['collision'] or result['inkContact']<6:return None
        result=self.measure(center,angle,scale,exact=True)
        if not result or result['collision'] or result['inkContact']<6:return None
        return result

    def serialize(self,center,angle,scale):
        offset=(center-self.anchor)/self.S
        return [round(float(offset[0]),3),round(float(offset[1]),3),round(angle-self.baseangle,3),round(scale,3)]

    def corner_points(self,sign,scale):
        # These are actual alpha contour points, never empty bbox corners.
        im=self.original.resize((max(1,round(self.p['w']*self.ps*scale)),max(1,round(self.p['h']*self.ps*scale))),Image.Resampling.BICUBIC)
        mask=(np.array(im)[:,:,3]>96).astype('uint8');contours,_=cv2.findContours(mask,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
        pts=np.concatenate(contours,axis=0)[:,0,:].astype(float);norm=pts/np.array([im.width,im.height]);answer=[]
        for u,v in [(.12,.88),(.22,.78),(.32,.68),(.05,.96),(.08,.55),(.08,.40),(.12,.25)]:
            if sign<0:u=1-u
            idx=np.argmin(((norm-[u,v])**2).sum(1));point=pts[idx]-np.array([im.width/2,im.height/2])
            if not any(np.linalg.norm(point-z)<2 for z in answer):answer.append(point)
        return answer

    def solve(self):
        before=self.measure(self.oldcenter,self.oldangle,self.oldscale,exact=True)
        if before and before['collision']==0:return None,dict(mode='unchanged',before=before,after=before)
        # Favor small downward moves and restrained shrinking at the current hold.
        central=[]
        for scale in [self.oldscale,self.oldscale*.96,self.oldscale*.92,self.oldscale*.88,self.oldscale*.84]:
            if scale<.65:continue
            for dy in [0,2,4,6,8,10,12,14]:
                for dx in [0,-2,2]:
                    center=self.oldcenter+[dx,dy]
                    cost=math.hypot(dx,dy)/10+(1-scale/self.oldscale)*12
                    central.append((cost,center,self.oldangle,scale))
        central.sort(key=lambda v:v[0])
        for cost,center,angle,scale in central:
            result=self.valid(center,angle,scale)
            if result:return self.serialize(center,angle,scale),dict(mode='central-downsize',before=before,after=result,cost=round(cost,3))
        # Use the outer C already present. For two hands, prefer the right hand.
        ordered=sorted(self.hands,key=lambda h:h['center'][0],reverse=True)
        # Visual QA: full-size, gently tilted envelope in the left hand reads
        # much better here than the tiny 70-degree right-hand candidate.
        if (self.b['id'],self.p['id'])==('body_06','prop_17'):
            ordered=[h for h in ordered if h['sign']==-1]
        for hand in ordered:
            sign=hand['sign'];candidates=[]
            for scale in [1,.94,.88,.82,.76,.70,.65]:
                if scale>self.oldscale+.001 and self.oldscale<1:continue
                for delta in [0,10,20,30,40,50,60,70,-10]:
                    angle=self.baseangle+sign*delta
                    if abs(angle)>72:continue
                    for local in self.corner_points(sign,scale):
                        for target in hand['targets']:
                            center=target-rotate(local,angle)
                            cost=np.linalg.norm(center-self.oldcenter)/10+(1-scale)*12+abs(delta)/24
                            candidates.append((cost,center,angle,scale,target,local))
            candidates.sort(key=lambda v:v[0])
            for cost,center,angle,scale,target,local in candidates:
                result=self.valid(center,angle,scale)
                if result:return self.serialize(center,angle,scale),dict(mode='outer-hand',before=before,after=result,
                    cost=round(float(cost),3),handSign=sign,handInkPoint=[float(x) for x in target],
                    propAlphaContourPoint=[round(float(v),3) for v in local],
                    contactPivotError=round(float(np.linalg.norm(center+rotate(local,angle)-target)),8))
        return None,dict(mode='unresolved',before=before)


def render(b,p,face,offset,handpart):
    cv=fq.compose(b,face,COLOR);A=b['anchors'];S=190/b['w'];top=440-b['h']*S
    dx,dy=offset[:2];rot=offset[2] if len(offset)>2 else 0;scale=offset[3] if len(offset)>3 else 1
    size=A['prop'][2]*S*scale;ps=min(size/p['w'],size*1.25/p['h'])
    q.layer(cv,p,ps,[p['w']/2,p['h']/2],[161+(A['prop'][0]+dx)*S,top+(A['prop'][1]+dy)*S],(A['prop'][3] if len(A['prop'])>3 else 0)+rot)
    q.layer(cv,handpart,S,[0,0],[161,top]);return cv


def main():
    (HERE/'baseline-parts.json').write_text(json.dumps(q.PARTS,ensure_ascii=False,indent=2)+'\n')
    overrides={};report=[];start=time.time();handparts={};unresolved=[]
    for b in q.PARTS['body']:
        face_masks,safe,final=facial_masks(b);hs,ink,handpart=hands(b);handparts[b['id']]=handpart
        updates={};records=[]
        for p in PROPS:
            fit=Fit(b,p,safe,final,hs,ink);offset,result=fit.solve();old=fit.old
            beforemask=exact_prop_mask(b,p,fit.oldcenter,fit.oldangle,fit.oldscale)
            hits=[int(np.count_nonzero(mask&beforemask)) for mask in face_masks]
            worst=int(np.argmax(hits));record={'body':b['id'],'prop':p['id'],'beforeOffset':old,
                'afterOffset':offset or old,'worstBeforeFace':q.PARTS['face'][worst]['id'],
                'beforeFaceIntersections':{q.PARTS['face'][i]['id']:v for i,v in enumerate(hits) if v},**result}
            if offset:updates[p['id']]=offset
            if result['mode']=='unresolved':unresolved.append((b['id'],p['id']))
            report.append(record);records.append(record)
        if updates:overrides[b['id']]=updates
        (HERE.parent/'mouth-prop-overrides.json').write_text(json.dumps(overrides,ensure_ascii=False,indent=2)+'\n')
        (HERE/'audit.json').write_text(json.dumps({'pairs':len(report),'faceChecks':len(report)*36,'changedPairs':sum(len(v) for v in overrides.values()),'unresolved':unresolved,'report':report},ensure_ascii=False,indent=2)+'\n')
        # One worst-expression sheet per body, showing all31 final props.
        board=Image.new('RGB',(1440,1440),'#fff9ed');draw=ImageDraw.Draw(board)
        for i,r in enumerate(records):
            p=q.BY_ID[r['prop']];face=q.BY_ID[r['worstBeforeFace']];cv=render(b,p,face,r['afterOffset'],handpart)
            im=cv.crop((85,170,440,455));im.thumbnail((240,215),Image.Resampling.LANCZOS);x,y=i%6*240,i//6*240
            board.paste(im,(x+(240-im.width)//2,y));draw.text((x+25,y+218),f'{p["id"]} / {face["id"]} / {r["mode"][:7]}',fill='#523b30')
        board.save(HERE/f'after-{b["id"]}.jpg',quality=94)
        print(b['id'],len(updates),'changed','unresolved',sum(r['mode']=='unresolved' for r in records),'seconds',round(time.time()-start,1),flush=True)
    changed=[r for r in report if r['mode'] not in ['unchanged','unresolved']]
    selected=sorted(changed,key=lambda r:sum(r['beforeFaceIntersections'].values()),reverse=True)[:18]
    board=Image.new('RGB',(1440,2160),'#fff9ed');draw=ImageDraw.Draw(board)
    for i,r in enumerate(selected):
        b=q.BY_ID[r['body']];p=q.BY_ID[r['prop']];f=q.BY_ID[r['worstBeforeFace']]
        for j,off in enumerate([r['beforeOffset'],r['afterOffset']]):
            cv=render(b,p,f,off,handparts[b['id']]);im=cv.crop((85,170,440,455));im.thumbnail((240,215),Image.Resampling.LANCZOS)
            x=(i%3)*480+j*240;y=i//3*360;board.paste(im,(x+(240-im.width)//2,y+25));draw.text((x+15,y+246),f'{b["id"]}/{p["id"]}/{f["id"]}',fill='#523b30');draw.text((x+80,y+269),'before' if j==0 else 'after',fill='#523b30')
    board.save(HERE/'before-after-key18.jpg',quality=95)
    print('Complete:',len(report),'pairs;',len(changed),'changes;',len(unresolved),'unresolved;',round(time.time()-start,1),'sec',flush=True)


if __name__=='__main__':main()
