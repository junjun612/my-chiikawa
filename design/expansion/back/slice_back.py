"""Crop the generated 4x4 atlas into optimized back assets and tint masks."""
from pathlib import Path
import importlib.util
import json

import numpy as np
from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
OUT = ROOT / 'parts/back'
spec = importlib.util.spec_from_file_location('ear_crop_utils', HERE.parent/'ears/slice_ears.py')
utils = importlib.util.module_from_spec(spec)
spec.loader.exec_module(utils)

LABELS = ['양털 방울 꼬리', '하트 솜 꼬리', '물방울 꼬리', '솜사탕 말림 꼬리',
          '하트 끝 꼬리', '별 끝 꼬리', '포근 여우 꼬리', '짧은 줄무늬 꼬리',
          '작은 천사 날개', '동글 나비 날개', '구름 날개', '꽃잎 날개',
          '동그란 구름 후드', '벚꽃 후드', '별 쿠션', '미니 담요 망토']

# Three complete contours cross the nominal atlas grid. Keep the current
# design canvas and attachment geometry while recovering their full ink.
RESTORED_CANVASES = {6: (198, 187), 7: (198, 197), 15: (284, 196)}


def save(image, name):
    image.save(OUT / f'{name}.webp', 'WEBP', lossless=True, method=6)
    return f'parts/back/{name}.webp'


def tint_masks(image, cell):
    """Only cream fur follows body tint; all ink and decorative colors stay."""
    a=np.array(image).astype(float)
    r,g,b,alpha=[a[:,:,i] for i in range(4)]
    coat=(r>220)&(g>212)&(b>175)&(r-g<28)&(g-b<48)&(b-g<5)
    yy=np.indices(alpha.shape)[0]
    if cell==4:  # heart-shaped finial stays strawberry pink, including light highlights.
        coat &= yy>image.height*.54
    if cell==5:  # star-shaped finial stays butter yellow.
        coat &= yy>image.height*.59
    if cell==6:  # Cream fox fur changes with body; the white fur tip stays white.
        coat &= (r-g>4)|(g-b>8)
    fill=np.zeros_like(a,dtype=np.uint8);fill[:,:,:3]=255;fill[:,:,3]=alpha.astype(np.uint8)
    line=a.astype(np.uint8);line[:,:,3]=np.where(coat,0,alpha).astype(np.uint8)
    color=np.median(a[:,:,:3][coat&(alpha>240)],axis=0).astype(int)
    color='#'+''.join(f'{v:02x}' for v in color)
    return Image.fromarray(fill), Image.fromarray(line), color


def size(image, maxw, maxh):
    ratio=min(maxw/image.width,maxh/image.height)
    image=image.resize((round(image.width*ratio),round(image.height*ratio)),Image.Resampling.LANCZOS)
    canvas=Image.new('RGBA',(image.width+4,image.height+4))
    canvas.alpha_composite(image,(2,2))
    return canvas


def restored_size(image, canvas_size):
    image = image.copy()
    image.thumbnail((canvas_size[0]-4, canvas_size[1]-4), Image.Resampling.LANCZOS)
    canvas = Image.new('RGBA', canvas_size)
    canvas.alpha_composite(image, ((canvas.width-image.width)//2, (canvas.height-image.height)//2))
    return canvas


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    sheet=Image.open(HERE/'source-sheet.png').convert('RGBA')
    data=[];images=[]
    for cell,label in enumerate(LABELS):
        x,y=cell%4,cell//4;cw,ch=sheet.width/4,sheet.height/4
        bounds=tuple(round(v) for v in (x*cw,y*ch,(x+1)*cw,(y+1)*ch))
        if cell in RESTORED_CANVASES:
            bounds=(bounds[0]-40,bounds[1]-40,bounds[2]+40,bounds[3]+40)
        raw=sheet.crop(bounds)
        ident=f'back_{cell+18:02}'
        kind='tail' if cell<8 else 'wings' if cell<12 else 'around'
        part={'id':ident,'label':label,'kind':kind}
        if kind=='wings':
            half=raw.width//2
            halves=[utils.clean_crop(raw.crop((0,0,half,raw.height))),utils.clean_crop(raw.crop((half,0,raw.width,raw.height)))]
            factor=min(121/max(h.width for h in halves),159/max(h.height for h in halves))
            halves=[size(h,h.width*factor,h.height*factor) for h in halves]
            image=Image.new('RGBA',(sum(h.width for h in halves)+42,max(h.height for h in halves)))
            offset=0
            for side,h in zip(['L','R'],halves):
                name=f'{ident}_{side}';v={'src':save(h,name),'w':h.width,'h':h.height,
                   'root':[h.width-6 if side=='L' else 6,round(h.height*(.56 if cell==9 else .62),1)]}
                if cell in (8,10):
                    fill,line,color=tint_masks(h,cell)
                    v.update(fill=save(fill,name+'_fill'),line=save(line,name+'_line'),color=color)
                part[side]=v
                image.alpha_composite(h,(offset,image.height-h.height));offset+=h.width+42
        else:
            image=utils.clean_crop(raw)
            if cell in RESTORED_CANVASES:
                image=restored_size(image,RESTORED_CANVASES[cell])
            else:
                image=size(image,194 if kind=='tail' else 280,195 if kind=='tail' else 280)
            if kind=='tail':
                # Attachment stays behind the body. The little stem roots live at left/bottom.
                part['root']=[round(image.width*(.12 if cell not in (0,1,3) else .15),1),round(image.height*(.83 if cell not in (0,1,3) else .76),1)]
            else:
                fit=[1.23,1.25,1.26,1.26][cell-12]
                fy=[.45,.45,.49,.53][cell-12]
                part.update(fit=fit,fy=fy)
        part.update(src=save(image,ident),w=image.width,h=image.height)
        if kind=='tail' or (kind=='wings' and cell in (8,10)):
            fill,line,color=tint_masks(image,cell)
            part.update(fill=save(fill,ident+'_fill'),line=save(line,ident+'_line'),color=color)
        data.append(part);images.append(image)
    (HERE/'parts.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    board=Image.new('RGB',(1200,1000),'#e9f2ee');draw=ImageDraw.Draw(board)
    for i,(p,img) in enumerate(zip(data,images)):
        x,y=(i%4)*300,(i//4)*250
        draw.rounded_rectangle((x+6,y+6,x+294,y+244),radius=12,fill='#fffaf0')
        thumb=img.copy();thumb.thumbnail((264,205),Image.Resampling.LANCZOS)
        board.paste(thumb,(x+(300-thumb.width)//2,y+12+(205-thumb.height)//2),thumb)
        draw.text((x+112,y+225),p['id'],fill='#55473e')
    board.save(HERE/'review.jpg',quality=94)
    print(f'Saved {len(data)} back parts to {HERE / "parts.json"}')


if __name__=='__main__':
    main()
