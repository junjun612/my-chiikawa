"""Extract only the four selected sprites from the generated 4x4 atlas.

Original source files are preserved in before/. No global JS files are modified.
"""
from collections import deque
from pathlib import Path
import importlib.util,json
import numpy as np
from PIL import Image,ImageDraw,ImageFilter

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
spec=importlib.util.spec_from_file_location('ear_slice',ROOT/'design/expansion/ears/slice_ears.py')
ears=importlib.util.module_from_spec(spec);spec.loader.exec_module(ears)


def crop_face(cell):
    arr=np.array(cell);alpha=arr[:,:,3];mask=alpha>16;seen=np.zeros_like(mask,dtype=bool);keep=np.zeros_like(alpha)
    h,w=mask.shape
    for y,x in zip(*np.nonzero(mask)):
        if seen[y,x]:continue
        seen[y,x]=True;queue=deque([(y,x)]);points=[]
        while queue:
            cy,cx=queue.popleft();points.append((cy,cx))
            for dy in [-1,0,1]:
                for dx in [-1,0,1]:
                    ny,nx=cy+dy,cx+dx
                    if 0<=ny<h and 0<=nx<w and mask[ny,nx] and not seen[ny,nx]:
                        seen[ny,nx]=True;queue.append((ny,nx))
        if len(points)>=8:
            for cy,cx in points:keep[cy,cx]=255
    keep=np.array(Image.fromarray(keep).filter(ImageFilter.MaxFilter(3)))>0
    arr[:,:,3]=np.where(keep&(alpha>8),alpha,0)
    cell=Image.fromarray(arr);cell=cell.crop(cell.getbbox())
    im=Image.new('RGBA',(cell.width+4,cell.height+4));im.alpha_composite(cell,(2,2))
    return im


def cell_at(sheet,n):
    x,y=(n-1)%4,(n-1)//4;w,h=sheet.width/4,sheet.height/4
    return sheet.crop(tuple(round(v) for v in (x*w,y*h,(x+1)*w,(y+1)*h)))


def save(image,cat,name):
    image.save(ROOT/f'parts/{cat}/{name}.webp','WEBP',lossless=True,method=6)
    return f'parts/{cat}/{name}.webp'


def main():
    sheet=Image.open(HERE/'source-sheet.png').convert('RGBA')
    originals={p['id']:p for p in json.loads((HERE/'before-parts.json').read_text())}
    pair=cell_at(sheet,2);split=pair.width//2
    halves=[ears.clean_crop(pair.crop((0,0,split,pair.height))),ears.clean_crop(pair.crop((split,0,pair.width,pair.height)))]
    scale=min(104/max(h.width for h in halves),102/max(h.height for h in halves))
    halves=[h.resize((round(h.width*scale),round(h.height*scale)),Image.Resampling.LANCZOS) for h in halves]
    pads=[]
    for h in halves:
        im=Image.new('RGBA',(h.width+4,h.height+4));im.alpha_composite(h,(2,2));pads.append(im)
    halves=pads;color=ears.hex_color(halves[0]);p={'id':'ears_13','label':'아기 햄스터','color':color}
    combined=Image.new('RGBA',(sum(h.width for h in halves)+38,max(h.height for h in halves)));x=0
    for side,h in zip(['L','R'],halves):
        name=f'ears_13_{side}';fill,line=ears.masks(h)
        p[side]={'src':save(h,'ears',name),'w':h.width,'h':h.height,'root':[h.width/2,h.height-4],
                 'color':color,'fill':save(fill,'ears',name+'_fill'),'line':save(line,'ears',name+'_line')}
        combined.alpha_composite(h,(x,combined.height-h.height));x+=h.width+38
    fill,line=ears.masks(combined)
    p.update(src=save(combined,'ears','ears_13'),w=combined.width,h=combined.height,
             fill=save(fill,'ears','ears_13_fill'),line=save(line,'ears','ears_13_line'))
    # Scale metadata only: the fennec artwork itself is preserved.
    fennec=json.loads(json.dumps(originals['ears_14']));factor=.72
    for obj in [fennec,fennec['L'],fennec['R']]:
        for key in ['w','h']:obj[key]=round(obj[key]*factor,3)
        if 'root' in obj:obj['root']=[round(v*factor,3) for v in obj['root']]
    (HERE/'ears-replacements.json').write_text(json.dumps([p,fennec],ensure_ascii=False,indent=2)+'\n')
    faces=[];preview=[]
    for ident,n,label in [('face_20',5,'두근'),('face_27',6,'설렘'),('face_35',10,'살짝 윙크')]:
        im=crop_face(cell_at(sheet,n));k=323/im.width
        meta={'id':ident,'label':label,'src':save(im,'face',ident),'w':323,'h':round(im.height*k,3)}
        a=np.array(im).astype(int);r,g,b,alpha=[a[:,:,c] for c in range(4)];pink=(r>180)&(r-g>25)&(b>g)&(alpha>128)
        yy,xx=np.indices(alpha.shape);cheeks=[]
        for region in [pink&(xx<im.width/2),pink&(xx>=im.width/2)]:
            ys,xs=np.where(region);cheeks.append([round(xs.mean()*k,2),round(ys.mean()*k,2),round((xs.max()-xs.min()+1)*k/2,2)])
        meta['cheeks']=cheeks;faces.append(meta);preview.append((ident,im))
    (HERE/'face-replacements.json').write_text(json.dumps(faces,ensure_ascii=False,indent=2)+'\n')
    board=Image.new('RGB',(1000,400),'#fff9ed');draw=ImageDraw.Draw(board)
    for i,(ident,im) in enumerate([('ears_13',combined)]+preview):
        thumb=im.copy();thumb.thumbnail((220,210),Image.Resampling.LANCZOS)
        board.paste(thumb,(i*250+(250-thumb.width)//2,100+(160-thumb.height)//2),thumb)
        draw.text((i*250+95,280),ident,fill='#57382d')
    board.save(HERE/'selected-four.jpg',quality=95)
    print('Replaced ears_13 and face_20/27/35; wrote 2 ear definitions and 3 face definitions.')


if __name__=='__main__':main()
