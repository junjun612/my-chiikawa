"""Select four small replacements from the user-approved 4x4 sheet.

Extract complete connected components (including both wing halves), not fixed
cell halves. This keeps outlines intact when the drawing crosses a cell center.
"""
import json
import shutil
from pathlib import Path
from collections import deque
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
sheet=Image.open(HERE/'sheet.png').convert('RGBA')
BEFORE=HERE/'before'
BEFORE.mkdir(exist_ok=True)

def components(image,count):
    arr=np.array(image)
    alpha=arr[:,:,3]>24
    seen=np.zeros_like(alpha,dtype=bool)
    height,width=alpha.shape
    groups=[]
    for y,x in zip(*np.nonzero(alpha)):
        if seen[y,x]:continue
        queue=deque([(int(y),int(x))]);seen[y,x]=True;points=[]
        while queue:
            cy,cx=queue.popleft();points.append((cy,cx))
            for dy in (-1,0,1):
                for dx in (-1,0,1):
                    ny,nx=cy+dy,cx+dx
                    if 0<=ny<height and 0<=nx<width and alpha[ny,nx] and not seen[ny,nx]:
                        seen[ny,nx]=True;queue.append((ny,nx))
        groups.append(points)
    selected=sorted(groups,key=len,reverse=True)[:count]
    result=[]
    for points in selected:
        mask=np.zeros_like(alpha,dtype=np.uint8)
        yy,xx=np.array(points).T;mask[yy,xx]=255
        keep=np.array(Image.fromarray(mask).filter(ImageFilter.MaxFilter(5)))>0
        copy=arr.copy();copy[:,:,3]=np.where(keep&(arr[:,:,3]>8),arr[:,:,3],0)
        image=Image.fromarray(copy);box=image.getbbox()
        result.append((box[0],image.crop(box)))
    return [im for _,im in sorted(result,key=lambda item:item[0])]

def cell(index,count=1):
    x,y=index%4,index//4;cw,ch=sheet.width/4,sheet.height/4
    bounds=tuple(round(v) for v in (x*cw-24,y*ch-24,(x+1)*cw+24,(y+1)*ch+24))
    return components(sheet.crop(bounds),count)

def size(image,maxw,maxh):
    image=image.copy();image.thumbnail((maxw,maxh),Image.Resampling.LANCZOS)
    padded=Image.new('RGBA',(image.width+4,image.height+4));padded.alpha_composite(image,(2,2))
    return padded

def save(image,cat,name):
    path=ROOT/'parts'/cat/(name+'.webp')
    if path.exists() and not (BEFORE/path.name).exists():shutil.copy2(path,BEFORE/path.name)
    image.save(path,'WEBP',lossless=True,method=6)
    return 'parts/'+cat+'/'+name+'.webp'

def masks(image):
    a=np.array(image);r,g,b,alpha=[a[:,:,i].astype(float) for i in range(4)]
    coat=(r>226)&(g>217)&(b>187)&(r-g<28)&(g-b<47)
    fill=np.zeros_like(a);fill[:,:,:3]=255;fill[:,:,3]=a[:,:,3]
    line=a.copy();line[:,:,3]=np.where(coat,0,alpha).astype(np.uint8)
    rgb=np.median(a[:,:,:3][coat&(alpha>240)],axis=0).astype(int)
    return Image.fromarray(fill),Image.fromarray(line),'#'+''.join(f'{v:02x}'for v in rgb)

def masked_fields(image,cat,name):
    fill,line,color=masks(image)
    return {'fill':save(fill,cat,name+'_fill'),'line':save(line,cat,name+'_line'),'color':color}

deco=[];back=[]
bow=size(cell(0)[0],140,96)
deco.append({'id':'deco_08','label':'우유빛 매듭 리본','kind':'side',
             'src':save(bow,'deco','deco_08'),'w':bow.width,'h':bow.height})

tail=size(cell(4)[0],140,150)
back.append({'id':'back_05','label':'작은 하트 꼬리','kind':'tail',
             'src':save(tail,'back','back_05'),'w':tail.width,'h':tail.height,
             'root':[round(tail.width*.12,1),round(tail.height*.83,1)],
             **masked_fields(tail,'back','back_05')})

for ident,index,label,limits,sync in [('back_07',8,'동글 보라 날개',(84,76),False),
                                     ('back_14',12,'우유빛 작은 날개',(76,90),True)]:
    halves=[size(im,*limits) for im in cell(index,2)]
    if sync:
        # A short transparent inner attachment margin places both tiny lobes
        # outside the body's edge while keeping the roots inside each canvas.
        padded=[]
        for side,im in zip(['L','R'],halves):
            canvas=Image.new('RGBA',(im.width+20,im.height))
            canvas.alpha_composite(im,(0 if side=='L' else 20,0))
            padded.append(canvas)
        halves=padded
    combined=Image.new('RGBA',(sum(im.width for im in halves)+32,max(im.height for im in halves)))
    part={'id':ident,'label':label,'kind':'wings'}
    offset=0
    for side,im in zip(['L','R'],halves):
        name=ident+'_'+side
        half={'src':save(im,'back',name),'w':im.width,'h':im.height,
              'root':[im.width-6 if side=='L' else 6,round(im.height*.62,1)]}
        if sync:half.update(masked_fields(im,'back',name))
        part[side]=half
        combined.alpha_composite(im,(offset,combined.height-im.height));offset+=im.width+32
    part.update(src=save(combined,'back',ident),w=combined.width,h=combined.height)
    if sync:part.update(masked_fields(combined,'back',ident))
    back.append(part)

(HERE/'deco-replacements.json').write_text(json.dumps(deco,ensure_ascii=False,indent=2)+'\n')
(HERE/'back-replacements.json').write_text(json.dumps(back,ensure_ascii=False,indent=2)+'\n')
(HERE/'retired.json').write_text(json.dumps(['back_11','back_12','back_31','back_32'],indent=2)+'\n')
board=Image.new('RGB',(880,250),'#fff9ee');draw=ImageDraw.Draw(board)
for i,p in enumerate(deco+back):
    im=Image.open(ROOT/p['src']).convert('RGBA');im.thumbnail((200,200),Image.Resampling.LANCZOS)
    board.paste(im,(i*220+(220-im.width)//2,(210-im.height)//2),im)
    draw.text((i*220+85,225),p['id'],fill='#594337')
board.save(HERE/'replacements.jpg',quality=94)
print(json.dumps({'deco':deco,'back':back},ensure_ascii=False))
