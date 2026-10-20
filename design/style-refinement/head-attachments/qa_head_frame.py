"""Proposal and visual QA for the nine pose-specific head attachment frames.

This writes review artifacts and an anchor-only proposal, never global catalog files.
"""
from pathlib import Path
import importlib.util,json,math,copy
import numpy as np
from PIL import Image,ImageDraw

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
spec=importlib.util.spec_from_file_location('ear_qa',ROOT/'design/expansion/ears/attachment_qa.py')
q=importlib.util.module_from_spec(spec);spec.loader.exec_module(q)
REF_HEAD_STAGE_WIDTH=180


def propose(body):
    b=copy.deepcopy(body);A=b['anchors'];angle=A['face'][3];rad=math.radians(angle)
    co,si=math.cos(rad),math.sin(rad);headw=A['headW']/.84
    headh=b['h']*(.73 if b['id'] in ['body_20','body_23'] else .66)
    cx=A['face'][0];cy=A['top'][1]+headh/2
    head={'center':[round(cx,2),round(cy,2)],'w':round(headw,2),'h':round(headh,2),
          'rotation':angle,'crown':A['top'][:]}
    A['head']=head;A['earScale']=round(headw*190/b['w']/REF_HEAD_STAGE_WIDTH,5)
    solid=np.array(Image.open(ROOT/b['src']).convert('RGBA'))[:,:,3]>127
    # Nominal positions follow the tilted head; actual y comes from the scalp.
    for side,sign in [('L',-1),('R',1)]:
        lx,ly=sign*.27*headw,-.40*headh
        x=cx+lx*co-ly*si
        ytops=[]
        for xx in range(max(0,round(x)-3),min(b['w'],round(x)+4)):
            yy=np.where(solid[:round(b['h']*.55),xx])[0]
            if len(yy):ytops.append(int(yy[0]))
        y=float(np.median(ytops))+2
        A['ear'+side]=[round(x,2),round(y,2),angle+sign*15]
    # Face centers were measured on each actual head and already verified with all
    # expressions. Preserve those positions while using the same measured width.
    A['face'][2]=round(headw*.57,2);A['face'][3]=angle
    return b


def render(body,ear,face=None,deco=None):
    A=body['anchors'];S=190/body['w'];left=161;top=440-body['h']*S
    P=lambda p:(left+p[0]*S,top+p[1]*S)
    U=190/313*A['earScale'];theta=A['head']['rotation'];rad=math.radians(theta)
    co,si=math.cos(rad),math.sin(rad);cv=Image.new('RGBA',(512,512),'#eef5e9');color='#fffaf0'
    for side,key in [('L','earL'),('R','earR')]:
        e=ear[side];dx,dy=e.get('offset',[0,0]);px,py=P(A[key])
        target=[px+(dx*co-dy*si)*U,py+(dx*si+dy*co)*U]
        rot=e['rotation']+theta if 'rotation' in e else A[key][2]
        q.layer(cv,e,U,[e['root'][0],e['root'][1]-e.get('sink',.36)*e['h']],target,rot,color)
    q.layer(cv,body,S,[0,0],[left,top],color=color)
    if deco:
        tx,ty=P(A['top']);DU=U*.7;H=A['head']['h']*S;kind=deco['kind']
        if kind=='hat':
            scale=deco['fit']*A['headW']*S*.7/deco['w']
            q.layer(cv,deco,scale,[deco['w']/2,deco['h']],[tx,ty+deco['bot']*H*.7],theta)
        elif kind=='halo':q.layer(cv,deco,DU,[deco['w']/2,deco['h']],[tx,ty-.04*H],theta)
        elif kind=='side':
            ex,ey=P(A['earR']);q.layer(cv,deco,DU*.85,[deco['w']/2,deco['h']*.65],[tx+(ex-tx)*.75,ey+.02*H],22+theta)
        else:q.layer(cv,deco,DU,[deco['w']/2,deco['h']*(1-deco.get('sink',.25))],[tx,ty],theta)
    face=face or q.BY_ID['face_01'];fs=A['face'][2]*S*1.2/q.FACE_REF
    q.layer(cv,face,fs,[face['w']/2,face['h']/2],P(A['face']),A['face'][3])
    return cv


def main():
    bodies=[propose(b) for b in json.loads((ROOT/'design/style-refinement/body/pose-candidates.json').read_text())]
    fields=['head','earScale','earL','earR','face','top','headW']
    overrides=[{'id':b['id'],'anchors':{k:b['anchors'][k] for k in fields}} for b in bodies]
    (HERE/'head-overrides.json').write_text(json.dumps(overrides,ensure_ascii=False,indent=2)+'\n')
    for b in bodies:
        if b['id'] not in ['body_17','body_20','body_24']:continue
        board=Image.new('RGB',(1440,1440),'#fff9ed');draw=ImageDraw.Draw(board)
        for i,ear in enumerate(q.PARTS['ears']):
            cv=render(b,ear);thumb=cv.crop((65,50,445,455));thumb.thumbnail((240,218),Image.Resampling.LANCZOS)
            x,y=(i%6)*240,(i//6)*240;board.paste(thumb,(x+(240-thumb.width)//2,y));draw.text((x+87,y+221),ear['id'],fill='#583d31')
        board.save(HERE/f'all-ears-{b["id"]}.jpg',quality=95)
    combinations=[('ears_02','face_01',None),('ears_03','face_18','deco_28'),('ears_22','face_19',None),
                  ('ears_30','face_27','deco_17'),('ears_14','face_35','deco_11'),('ears_13','face_20','deco_01')]
    board=Image.new('RGB',(1560,2340),'#fff9ed');draw=ImageDraw.Draw(board)
    for row,b in enumerate(bodies):
        for col,(eid,fid,did) in enumerate(combinations):
            cv=render(b,q.BY_ID[eid],q.BY_ID[fid],q.BY_ID.get(did))
            thumb=cv.crop((55,45,455,455));thumb.thumbnail((260,237),Image.Resampling.LANCZOS)
            x,y=col*260,row*260;board.paste(thumb,(x+(260-thumb.width)//2,y));draw.text((x+39,y+241),b['id']+' / '+eid,fill='#583d31')
    board.save(HERE/'nine-head-combinations.jpg',quality=95)
    for n in range(3):board.crop((0,n*780,1560,(n+1)*780)).save(HERE/f'nine-head-combinations-{n+1}.jpg',quality=95)
    print('Wrote 9 anchor-only overrides, 3 complete 36-ear sheets and 54 head combination views.')


if __name__=='__main__':main()
