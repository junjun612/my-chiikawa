"""Compose ear metadata at exact engine geometry, for multiple-body visual QA.

No artwork is drawn or replaced: the sprites and their saved masks are used as-is.
"""
from pathlib import Path
import json
import math
from PIL import Image,ImageDraw
import numpy as np

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
source=(ROOT/'parts.js').read_text()
PARTS=json.loads(source.split('window.PARTS = ',1)[1].split(';\n',1)[0])
BY_ID={p['id']:p for ps in PARTS.values() for p in ps}
def median(values):
    values=sorted(values)
    return values[len(values)//2]


REF_H=median(b['anchors']['H']*190/b['w'] for b in PARTS['body'])
FACE_REF=median(p['w'] for p in PARTS['face'])


def sprite(p,color='#ffffff'):
    if p.get('tintRegion')=='coat':
        im=Image.open(ROOT/p['src']).convert('RGBA');arr=np.array(im);r,g,b,a=[arr[:,:,c].astype(int) for c in range(4)]
        coat=(a>0)&(r>90)&(b<215)&(r-b>10)&(r>=g)&(g>=b)
        arr[:,:,:3][coat]=[int(color[i:i+2],16) for i in [1,3,5]]
        return Image.fromarray(arr)
    if p.get('fill'):
        fill=Image.open(ROOT/p['fill']).convert('RGBA');line=Image.open(ROOT/p['line']).convert('RGBA')
        im=Image.new('RGBA',fill.size,color);im.putalpha(fill.getchannel('A'));im.alpha_composite(line)
        return im
    return Image.open(ROOT/p['src']).convert('RGBA')


def layer(canvas,p,scale,root,target,deg=0,color='#ffffff'):
    im=sprite(p,color);im=im.resize((p['w'],p['h']),Image.Resampling.LANCZOS)
    co,si=math.cos(math.radians(deg)),math.sin(math.radians(deg))
    px,py=target;rx,ry=root
    inv=(co/scale,si/scale,rx-(co*px+si*py)/scale,-si/scale,co/scale,ry+(si*px-co*py)/scale)
    canvas.alpha_composite(im.transform((512,512),Image.Transform.AFFINE,inv,Image.Resampling.BICUBIC))


def compose(b,p,color='#ffffff'):
    A=b['anchors'];S=190/b['w'];left=161;top=440-b['h']*S
    P=lambda pt:(left+pt[0]*S,top+pt[1]*S)
    U=(190/313)*min(1.1,max(.72,math.sqrt((A['H']*S)/REF_H)))
    canvas=Image.new('RGBA',(512,512),'#edf6df')
    def ears(front=False):
        for side,anchor in zip(['L','R'],['earL','earR']):
            e=p[side]
            if (e.get('z',10)>20)!=front:continue
            px,py=P(A[anchor]);dx,dy=e.get('offset',[0,0])
            layer(canvas,e,U,[e['root'][0],e['root'][1]-e.get('sink',.36)*e['h']],[px+dx*U,py+dy*U],e.get('rotation',A[anchor][2]),color)
    ears();layer(canvas,b,S,[0,0],[left,top],color=color);ears(True)
    f=PARTS['face'][0];fs=A['face'][2]*S*1.2/FACE_REF
    layer(canvas,f,fs,[f['w']/2,f['h']/2],P(A['face']),color=color)
    return canvas


def main():
    fixed=json.loads((HERE/'attachment-fixes.json').read_text())
    bodies=[BY_ID[f'body_{n:02}'] for n in [1,3,15,19,20,31]]
    board=Image.new('RGB',(1800,len(fixed)*285),'#e5efea');draw=ImageDraw.Draw(board)
    for row,p in enumerate(fixed):
        for col,b in enumerate(bodies):
            cv=compose(b,p);thumb=cv.crop((90,190,422,455));thumb.thumbnail((300,240),Image.Resampling.LANCZOS)
            x,y=col*300,row*285;board.paste(thumb,(x+(300-thumb.width)//2,y+5))
            draw.text((x+90,y+254),p['id']+' / '+b['id'],fill='#58463d')
    board.save(HERE/'attachment-fixed-six-bodies.jpg',quality=95)
    for b in bodies:
        board=Image.new('RGB',(1440,1440),'#e5efea');draw=ImageDraw.Draw(board)
        override={p['id']:p for p in fixed}
        for i,p in enumerate(PARTS['ears']):
            p=override.get(p['id'],p);cv=compose(b,p)
            thumb=cv.crop((70,70,442,455));thumb.thumbnail((240,218),Image.Resampling.LANCZOS)
            x,y=(i%6)*240,(i//6)*240;board.paste(thumb,(x+(240-thumb.width)//2,y))
            draw.text((x+86,y+221),p['id'],fill='#58463d')
        board.save(HERE/f'all-ears-qa-{b["id"]}.jpg',quality=94)
    print('Saved fixed-ear six-body QA and six 36-ear full-audit sheets.')


if __name__=='__main__':main()
