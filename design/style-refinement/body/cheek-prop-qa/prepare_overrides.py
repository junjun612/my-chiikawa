"""Preserve each existing shaft contact while shrinking/tilting four props.

Only writes the isolated override proposal and visual review artifacts.
"""
from pathlib import Path
import importlib.util, json, math
import cv2
import numpy as np
from PIL import Image,ImageDraw

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
spec=importlib.util.spec_from_file_location('face_qa',ROOT/'design/style-refinement/face-simplification/prepare_faces.py')
fq=importlib.util.module_from_spec(spec);spec.loader.exec_module(fq)
q=fq.q
HANDLE={'prop_04':(.30,.82),'prop_11':(.42,.88)}
SETTINGS={('body_24','prop_04'):(-50,.85),('body_24','prop_11'):(-45,.85),
          ('body_30','prop_04'):(-60,.85),('body_30','prop_11'):(-50,.85)}


def rotate(point,deg):
    co,si=math.cos(math.radians(deg)),math.sin(math.radians(deg));x,y=point
    return np.array([x*co-y*si,x*si+y*co])


def proposal(body,prop,old,rotation=-12,scale=.88):
    A=body['anchors'];ps=min(A['prop'][2]/prop['w'],A['prop'][2]*1.25/prop['h'])
    handle=HANDLE[prop['id']]
    local=np.array([(handle[0]-.5)*prop['w']*ps,(handle[1]-.5)*prop['h']*ps])
    theta=A['prop'][3] if len(A['prop'])>3 else 0
    contact=np.array(A['prop'][:2])+old[:2]+rotate(local,theta)
    center=contact-rotate(local*scale,theta+rotation)
    offset=center-np.array(A['prop'][:2])
    answer=[round(float(offset[0]),3),round(float(offset[1]),3),rotation,scale]
    newcontact=np.array(A['prop'][:2])+answer[:2]+rotate(local*scale,theta+rotation)
    return answer,{'contactPointBodyPixels':[round(float(v),4) for v in contact],
       'contactErrorBodyPixels':round(float(np.linalg.norm(newcontact-contact)),6),
       'handleSourceFraction':list(handle),'rotationDelta':rotation,'scale':scale}


def hand_overlay(body,color):
    im=Image.open(ROOT/body['arms']).convert('RGBA');a=np.array(im).astype(float)
    a[:,:,3]*=np.clip((220-a[:,:,:3].max(2))/100,0,1)
    mask=np.zeros(a.shape[:2],np.uint8);yy,xx=np.where(a[:,:,3]>80)
    for side in [xx<im.width/2,xx>=im.width/2]:
        points=np.column_stack([xx[side],yy[side]]).astype(np.int32)
        if len(points)>2:cv2.fillConvexPoly(mask,cv2.convexHull(points),255)
    out=q.sprite(body,color);b=np.array(out);b[:,:,3]=np.minimum(b[:,:,3],mask)
    out=Image.fromarray(b);out.alpha_composite(Image.fromarray(a.astype(np.uint8)))
    target=HERE/f'{body["id"]}_hand.webp';out.save(target,'WEBP',lossless=True)
    return {'src':str(target.relative_to(ROOT)),'w':body['w'],'h':body['h']}


def render(body,prop,offset):
    color='#eef9f3';face=q.BY_ID['face_19'];cv=fq.compose(body,face,color)
    A=body['anchors'];S=190/body['w'];top=440-body['h']*S
    dx,dy=offset[:2];rot=offset[2] if len(offset)>2 else 0;scale=offset[3] if len(offset)>3 else 1
    target=(161+(A['prop'][0]+dx)*S,top+(A['prop'][1]+dy)*S)
    size=A['prop'][2]*S*scale;ps=min(size/prop['w'],size*1.25/prop['h'])
    angle=(A['prop'][3] if len(A['prop'])>3 else 0)+rot
    q.layer(cv,prop,ps,[prop['w']/2,prop['h']/2],target,angle)
    arms=hand_overlay(body,color);q.layer(cv,arms,S,[0,0],[161,top])
    # Direct geometric check on the visible cheek color, excluding the soft glow.
    fmask=q.sprite(face);arr=np.array(fmask);r,g,b,a=[arr[:,:,i].astype(int) for i in range(4)]
    pink=(a>96)&(r>140)&(r-g>20)&(b>g)&(r-b>10);arr[:,:,3]=pink.astype('uint8')*255
    maskfile=HERE/'face19-pink-mask.webp';Image.fromarray(arr).save(maskfile,'WEBP',lossless=True)
    face_layer={'src':str(maskfile.relative_to(ROOT)),'w':face['w'],'h':face['h']}
    fstage=Image.new('RGBA',(512,512));fs=A['face'][2]*S*1.2/323
    q.layer(fstage,face_layer,fs,[face['w']/2,face['h']/2],[161+A['face'][0]*S,top+A['face'][1]*S],A['face'][3] if len(A['face'])>3 else 0)
    pstage=Image.new('RGBA',(512,512));q.layer(pstage,prop,ps,[prop['w']/2,prop['h']/2],target,angle)
    fm=np.array(fstage)[:,:,3]>100;pm=np.array(pstage)[:,:,3]>100
    distances=cv2.distanceTransform((~fm).astype('uint8'),cv2.DIST_L2,cv2.DIST_MASK_PRECISE)
    gap=float(distances[pm].min())
    return cv,round(gap,3)


def main():
    old=json.loads((HERE.parent/'hand-offsets.json').read_text());overrides={};audit=[]
    board=Image.new('RGB',(1440,960),'#fff9ed');d=ImageDraw.Draw(board)
    row=0
    for bid in ['body_24','body_30']:
        body=q.BY_ID[bid];overrides[bid]={}
        for pid in ['prop_04','prop_11']:
            prop=q.BY_ID[pid];angle,size=SETTINGS[(bid,pid)]
            offset,record=proposal(body,prop,old[bid][pid],angle,size);overrides[bid][pid]=offset
            for col,off in enumerate([old[bid][pid],offset]):
                cv,gap=render(body,prop,off)
                path=HERE/f'{bid}-{pid}-{("before" if col==0 else "after")}.png';cv.save(path)
                thumb=cv.crop((120,180,400,455)).resize((360,354),Image.Resampling.LANCZOS)
                # Four row comparison, with a detail column beside each full body.
                x=col*720;y=row*240
                full=cv.crop((110,140,420,455));full.thumbnail((320,225),Image.Resampling.LANCZOS)
                board.paste(full,(x+(320-full.width)//2,y));detail=cv.crop((175,300,270,420)).resize((175,221),Image.Resampling.LANCZOS)
                board.paste(detail,(x+330,y))
                d.text((x+515,y+50),f'{bid} / {pid}',fill='#513a30');d.text((x+515,y+78),'BEFORE' if col==0 else 'AFTER',fill='#513a30')
                d.text((x+515,y+106),f'cheek gap {gap:.1f}px',fill='#513a30')
                record['beforeGapStagePixels' if col==0 else 'afterGapStagePixels']=gap
            record.update(body=bid,prop=pid,before=old[bid][pid],after=offset);audit.append(record);row+=1
    board.save(HERE/'before-after.jpg',quality=97)
    (HERE.parent/'cheek-prop-overrides.json').write_text(json.dumps(overrides,ensure_ascii=False,indent=2)+'\n')
    (HERE/'audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps(audit,ensure_ascii=False,indent=2))


if __name__=='__main__':main()
