"""Visually inspect saved back sprites at the actual engine attachment geometry."""
from pathlib import Path
import json
from PIL import Image, ImageDraw

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
source=(ROOT/'parts.js').read_text()
allp=json.loads(source.split('window.PARTS = ',1)[1].split(';\n',1)[0])
b=allp['body'][0];face=allp['face'][0];ear=allp['ears'][0]
A=b['anchors'];S=190/b['w'];U=190/313;left=256-95;top=440-b['h']*S
P=lambda pt:(left+pt[0]*S,top+pt[1]*S)


def sprite(p):
    if p.get('fill'):
        fill=Image.open(ROOT/p['fill']).convert('RGBA');line=Image.open(ROOT/p['line']).convert('RGBA')
        image=Image.new('RGBA',fill.size,'#e2f5e9');image.putalpha(fill.getchannel('A'));image.alpha_composite(line)
        return image
    return Image.open(ROOT/p['src']).convert('RGBA')


def paste(canvas,p,scale,root,target):
    im=sprite(p).resize((round(p['w']*scale),round(p['h']*scale)),Image.Resampling.LANCZOS)
    canvas.alpha_composite(im,(round(target[0]-root[0]*scale),round(target[1]-root[1]*scale)))


def main():
    parts=json.loads((HERE/'parts.json').read_text());board=Image.new('RGB',(1400,1200),'#e8f2ee');draw=ImageDraw.Draw(board)
    for i,p in enumerate(parts):
        cv=Image.new('RGBA',(512,512),'#fff7e9')
        if p['kind']=='tail':paste(cv,p,U*.8,p['root'],P(A['tail']))
        elif p['kind']=='wings':
            for side,anchor in zip(['L','R'],['sideL','sideR']):paste(cv,p[side],U,p[side]['root'],P(A[anchor]))
        else:
            scale=p['fit']*A['W']*S/p['w'];target=P([A['center'][0],A['top'][1]+p.get('fy',.45)*A['H']])
            paste(cv,p,scale,[p['w']/2,p['h']/2],target)
        paste(cv,b,S,[0,0],[left,top])
        fs=(A['face'][2]*S*1.2)/sorted(p['w'] for p in allp['face'])[len(allp['face'])//2]
        paste(cv,face,fs,[face['w']/2,face['h']/2],P(A['face']))
        image=cv.crop((90,190,455,455));image.thumbnail((350,254),Image.Resampling.LANCZOS)
        x,y=(i%4)*350,(i//4)*300;board.paste(image,(x,y+10));draw.text((x+145,y+280),p['id'],fill='#55473e')
    board.save(HERE/'composition-review.jpg',quality=94)
    print(HERE/'composition-review.jpg')


if __name__=='__main__':main()
