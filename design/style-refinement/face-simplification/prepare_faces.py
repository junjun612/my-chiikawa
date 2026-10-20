"""Extract selected generated expressions at a shared cell scale.

No per-face tight-crop upscaling: all sprites retain the same transparent 323px
coordinate frame. This script touches only its candidate/review folder unless
--publish is explicitly supplied. Global catalog files are never changed.
"""
from pathlib import Path
import argparse, copy, hashlib, importlib.util, json, math, shutil
import cv2
import numpy as np
from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
spec = importlib.util.spec_from_file_location('ear_qa', ROOT/'design/expansion/ears/attachment_qa.py')
q = importlib.util.module_from_spec(spec); spec.loader.exec_module(q)
CANVAS_W, CANVAS_H = 323, 230
COMMON_SCALE = 1.06
# (new ID suffix, sheet, one-based cell, label, eye category)
SELECTED = [
 (19,2,1,'잔잔한 미소','dot'), (20,2,3,'반가워','bean'),
 (21,2,6,'갸우뚱','dot'), (22,1,4,'눈웃음','closed'),
 (23,1,3,'나른해','half'), (24,1,6,'궁금해','dot'),
 (25,1,13,'조심조심','dot'), (26,1,2,'수줍은 미소','dot'),
 (27,2,4,'만족해','closed'), (28,2,10,'쪽','dot'),
 (29,2,11,'소곤소곤 웃음','closed'), (30,2,5,'시무룩','dot'),
 (31,1,5,'어라','dot'), (32,1,7,'살짝 윙크','wink'),
 (33,1,12,'훌쩍','tear'), (34,1,9,'당황했어','dot'),
 (35,2,16,'장난스러운 윙크','wink'), (36,2,15,'메롱','dot'),
]


def current_faces():
    return {p['id']:p for p in q.PARTS['face']}


def preserve():
    before=HERE/'before';before.mkdir(exist_ok=True)
    manifest=HERE/'before-parts.json'
    if not manifest.exists():
        items=[copy.deepcopy(current_faces()[f'face_{n:02}']) for n in range(19,37)]
        manifest.write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n')
        for p in items:shutil.copy2(ROOT/p['src'],before/Path(p['src']).name)
    hashes=HERE/'preserved-face01-18-sha256.json'
    if not hashes.exists():
        hashes.write_text(json.dumps({f'face_{n:02}':hashlib.sha256((ROOT/current_faces()[f'face_{n:02}']['src']).read_bytes()).hexdigest() for n in range(1,19)},indent=2)+'\n')


def clean(cell):
    arr=np.array(cell);mask=(arr[:,:,3]>16).astype('uint8')
    count,labels,stats,_=cv2.connectedComponentsWithStats(mask,8)
    keep=np.isin(labels,[n for n in range(1,count) if stats[n,4]>=10]).astype('uint8')
    keep=cv2.dilate(keep,np.ones((3,3),dtype='uint8'))>0
    arr[:,:,3]=np.where(keep,arr[:,:,3],0)
    return Image.fromarray(arr)


def get_cheeks(im):
    a=np.array(im).astype(int);r,g,b,alpha=[a[:,:,c] for c in range(4)]
    pink=(alpha>96)&(r>140)&(r-g>20)&(b>g)&(r-b>10)
    xx=np.indices(alpha.shape)[1];answer=[]
    for side in [xx<im.width/2,xx>=im.width/2]:
        mask=(pink&side).astype('uint8')
        count,labels,stats,cent=cv2.connectedComponentsWithStats(mask,8)
        largest=1+np.argmax(stats[1:,4]);ys,xs=np.where(labels==largest)
        answer.append([float(xs.mean()),float(ys.mean()),(float(xs.max()-xs.min()+1))/2])
    return answer


def extract(n,sheet_no,cell_no,label,category):
    sheet=Image.open(HERE/f'source-sheet-{sheet_no:02}.png').convert('RGBA')
    x,y=(cell_no-1)%4,(cell_no-1)//4;cw,ch=sheet.width/4,sheet.height/4
    box=tuple(round(v) for v in (x*cw,y*ch,(x+1)*cw,(y+1)*ch))
    cell=clean(sheet.crop(box));cheeks=get_cheeks(cell)
    cx=sum(c[0] for c in cheeks)/2;cy=sum(c[1] for c in cheeks)/2-cw*.048
    scale=CANVAS_W/cw*COMMON_SCALE
    # Shared sheet-cell scale; use pale cheek position only to align origins.
    # The sprite's own feature bbox NEVER determines its magnification.
    im=cell.transform((CANVAS_W,CANVAS_H),Image.Transform.AFFINE,
        (1/scale,0,cx-CANVAS_W/2/scale,0,1/scale,cy-CANVAS_H/2/scale),Image.Resampling.BICUBIC)
    ident=f'face_{n:02}';path=HERE/'candidates'/f'{ident}.webp'
    path.parent.mkdir(exist_ok=True);im.save(path,'WEBP',lossless=True,method=6)
    c_out=[[round((c[0]-cx)*scale+CANVAS_W/2,2),round((c[1]-cy)*scale+CANVAS_H/2,2),round(c[2]*scale,2)] for c in cheeks]
    meta={'id':ident,'label':label,'src':str(path.relative_to(ROOT)),'w':CANVAS_W,'h':CANVAS_H,'cheeks':c_out}
    audit={'id':ident,'sheet':sheet_no,'cell':cell_no,'label':label,'eyeType':category,
      'scale':round(scale,5),'sourceOrigin':[round(cx,3),round(cy,3)],'contentBBox':im.getbbox(),
      'sourceCell':[round(cw,3),round(ch,3)],'rule':'shared cell scale; no per-sprite bbox normalization'}
    # Measure separate eye components, excluding outer cheeks and central mouth.
    a=np.array(cell);dark=(a[:,:,:3].max(2)<95)&(a[:,:,3]>96)
    count,labels,stats,cent=cv2.connectedComponentsWithStats(dark.astype('uint8'),8)
    measured=[];cheek_y=sum(c[1] for c in cheeks)/2
    for sign in [-1,1]:
        target=np.array([cx+sign*cw*.16,cheek_y-cw*.10])
        candidates=[i for i in range(1,count) if stats[i,4]>20 and sign*(cent[i,0]-cx)>cw*.08 and sign*(cent[i,0]-cx)<cw*.26 and cent[i,1]<cheek_y-cw*.03]
        i=min(candidates,key=lambda i:np.linalg.norm(cent[i]-target))
        measured.append({'bbox':[round(float(v)*scale,2) for v in stats[i,:4]],'width':round(stats[i,2]*scale,2),'height':round(stats[i,3]*scale,2)})
    audit['eyes']=measured
    a=np.array(im);audit['edgeAlphaMax']=int(max(a[0,:,3].max(),a[-1,:,3].max(),a[:,0,3].max(),a[:,-1,3].max()))
    return meta,audit


def glow(cv,face,scale,target,rotation):
    # Same current-engine radial multiply blush, for composition QA.
    yy,xx=np.indices((512,512));rad=math.radians(rotation);co,si=math.cos(rad),math.sin(rad)
    arr=np.array(cv).astype(float)
    for cx,cy,r in face.get('cheeks',[]):
        dx=(cx-face['w']/2)*scale;dy=(cy-face['h']/2)*scale
        px=target[0]+dx*co-dy*si;py=target[1]+dx*si+dy*co
        lx=(xx-px)*co+(yy-py)*si;ly=(-(xx-px)*si+(yy-py)*co)/.7
        R=r*scale*1.7;distance=np.sqrt(lx*lx+ly*ly)/R
        alpha=np.interp(distance,[0,.55,1],[.42,.42*.4,0]);alpha[distance>1]=0
        rgb=np.array([255,128,150])/255
        arr[:,:,:3]*=1-alpha[:,:,None]*(1-rgb)
    return Image.fromarray(np.uint8(np.clip(arr,0,255)))


def compose(b,face,color='#fff8eb'):
    A=b['anchors'];S=190/b['w'];left=161;top=440-b['h']*S
    P=lambda a:(left+a[0]*S,top+a[1]*S)
    factor=min(1.1,max(.72,math.sqrt(A['H']*S/q.REF_H)))
    U=190/313*A.get('earScale',factor);theta=A.get('head',{}).get('rotation',0)
    co,si=math.cos(math.radians(theta)),math.sin(math.radians(theta));cv=Image.new('RGBA',(512,512),'#f3f7e9')
    ear=q.BY_ID['ears_02']
    for side,key in [('L','earL'),('R','earR')]:
        e=ear[side];dx,dy=e.get('offset',[0,0]);px,py=P(A[key]);target=[px+(dx*co-dy*si)*U,py+(dx*si+dy*co)*U]
        rot=e['rotation']+theta if 'rotation' in e else A[key][2]
        q.layer(cv,e,U,[e['root'][0],e['root'][1]-e.get('sink',.36)*e['h']],target,rot,color)
    q.layer(cv,b,S,[0,0],[left,top],color=color)
    fs=A['face'][2]*S*1.2/323;target=P(A['face']);rot=A['face'][3] if len(A['face'])>3 else 0
    cv=glow(cv,face,fs,target,rot)
    q.layer(cv,face,fs,[face['w']/2,face['h']/2],target,rot)
    return cv


def review(faces):
    board=Image.new('RGB',(1440,720),'#fff9ed');draw=ImageDraw.Draw(board)
    for i,face in enumerate(faces):
        im=Image.open(ROOT/face['src']).convert('RGBA');im.thumbnail((230,190),Image.Resampling.LANCZOS)
        x,y=(i%6)*240,(i//6)*240;board.paste(im,(x+(240-im.width)//2,y+15),im);draw.text((x+85,y+210),face['id'],fill='#493a31')
    board.save(HERE/'selected-18-raw.jpg',quality=95)
    old={p['id']:p for p in json.loads((HERE/'before-parts.json').read_text())}
    for bid in ['body_01','body_17','body_20','body_25']:
        board=Image.new('RGB',(1440,900),'#fff9ed');draw=ImageDraw.Draw(board)
        for i,face in enumerate(faces):
            cv=compose(q.BY_ID[bid],face);thumb=cv.crop((125,170,405,452));thumb.thumbnail((240,275),Image.Resampling.LANCZOS)
            x,y=(i%6)*240,(i//6)*300;board.paste(thumb,(x+(240-thumb.width)//2,y+5));draw.text((x+75,y+282),face['id'],fill='#493a31')
        board.save(HERE/f'after-{bid}.jpg',quality=95)
    board=Image.new('RGB',(1440,900),'#fff9ed');draw=ImageDraw.Draw(board)
    for row,n in enumerate([19,20,27]):
        for col,(bid,before) in enumerate([('body_01',True),('body_01',False),('body_17',True),('body_17',False),('body_20',False),('body_25',False)]):
            face=copy.deepcopy(old[f'face_{n:02}']) if before else faces[n-19]
            if before:face['src']=str((HERE/'before'/Path(face['src']).name).relative_to(ROOT))
            cv=compose(q.BY_ID[bid],face);thumb=cv.crop((125,170,405,452));thumb.thumbnail((240,275),Image.Resampling.LANCZOS)
            x,y=col*240,row*300;board.paste(thumb,(x+(240-thumb.width)//2,y+5));draw.text((x+45,y+282),f'{face["id"]} / {"before" if before else "after"}',fill='#493a31')
    board.save(HERE/'before-after.jpg',quality=95)


def main():
    args=argparse.ArgumentParser();args.add_argument('--publish',action='store_true');args=args.parse_args()
    preserve();faces=[];audits=[]
    for args0 in SELECTED:
        meta,audit=extract(*args0);faces.append(meta);audits.append(audit)
    (HERE/'candidate-parts.json').write_text(json.dumps(faces,ensure_ascii=False,indent=2)+'\n')
    review(faces)
    if args.publish:
        for face in faces:
            target=ROOT/'parts/face'/Path(face['src']).name;shutil.copy2(ROOT/face['src'],target);face['src']=str(target.relative_to(ROOT))
        (HERE/'face-replacements.json').write_text(json.dumps(faces,ensure_ascii=False,indent=2)+'\n')
    oldhashes=json.loads((HERE/'preserved-face01-18-sha256.json').read_text())
    for ident,expected in oldhashes.items():
        assert hashlib.sha256((ROOT/current_faces()[ident]['src']).read_bytes()).hexdigest()==expected,ident
    assert all(a['edgeAlphaMax']==0 for a in audits), 'clipped alpha at cell edge'
    (HERE/'selection-audit.json').write_text(json.dumps({'items':audits,'canvas':[CANVAS_W,CANVAS_H],'commonCellScale':COMMON_SCALE,
        'preservedOriginalFaces':list(oldhashes),'replacedCount':len(faces)},ensure_ascii=False,indent=2)+'\n')
    print('Prepared 18 expressions at fixed 323px width; four 18-face body QA pages and before/after saved. Published:',args.publish)


if __name__=='__main__':main()
