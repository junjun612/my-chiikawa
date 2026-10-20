"""Slice the approved 4x4 built-in ImageGen sheets into runtime face/prop assets."""
from pathlib import Path
import json
import cv2
import numpy as np
from PIL import Image

ROOT=Path(__file__).resolve().parents[2]
DESIGN=ROOT/'design/expansion'
JOBS=json.loads((DESIGN/'root-prompts.json').read_text())


def crop_cell(sheet,index):
    w,h=sheet.size; col,row=index%4,index//4
    rect=(round(col*w/4),round(row*h/4),round((col+1)*w/4),round((row+1)*h/4))
    cell=sheet.crop(rect).convert('RGBA')
    # Ignore almost invisible generation dust when finding the cutout bounds.
    alpha=cell.getchannel('A').point(lambda a:255 if a>24 else 0)
    box=alpha.getbbox()
    if not box: raise ValueError(f'empty cell {index}')
    if box[0]<2 or box[1]<2 or box[2]>cell.width-2 or box[3]>cell.height-2:
      # An illustration can cross a nominal grid line. Recover its complete
      # connected pieces while excluding fragments from the neighboring cell.
      extended=(max(0,rect[0]-24),max(0,rect[1]-24),min(w,rect[2]+24),min(h,rect[3]+24))
      cell=sheet.crop(extended).convert('RGBA');pixels=np.array(cell)
      count,labels,stats,centers=cv2.connectedComponentsWithStats((pixels[:,:,3]>24).astype('uint8'),8)
      keep=np.zeros(labels.shape,dtype='uint8')
      for component in range(1,count):
        cx,cy=centers[component]+np.array(extended[:2])
        if stats[component,cv2.CC_STAT_AREA]>8 and rect[0]<=cx<rect[2] and rect[1]<=cy<rect[3]:
          keep[labels==component]=1
      keep=cv2.dilate(keep,np.ones((3,3),'uint8'))
      pixels[:,:,3]*=keep
      cell=Image.fromarray(pixels)
      box=cell.getchannel('A').getbbox()
    box=(max(0,box[0]-2),max(0,box[1]-2),min(cell.width,box[2]+2),min(cell.height,box[3]+2))
    return cell.crop(box)


def cheeks(image,logical_w):
    points=[[],[]]
    for y in range(image.height):
      for x in range(image.width):
        r,g,b,a=image.getpixel((x,y))
        if a>100 and r>195 and 60<g<205 and 90<b<235 and r-g>35 and b-g>4:
          if x<image.width*.37: points[0].append((x,y))
          elif x>image.width*.63: points[1].append((x,y))
    out=[]; scale=logical_w/image.width
    for p in points:
      if not p: continue
      xs=[v[0] for v in p];ys=[v[1] for v in p]
      out.append([round(sum(xs)/len(xs)*scale,2),round(sum(ys)/len(ys)*scale,2),round((max(xs)-min(xs)+1)*.42*scale,2)])
    return out


def save(cat,number,label,image):
    image.thumbnail((320,320),Image.Resampling.LANCZOS)
    path=f'parts/{cat}/{cat}_{number:02d}.webp'
    image.save(ROOT/path,'WEBP',lossless=True,method=6)
    w=323 if cat=='face' else image.width
    part={'id':f'{cat}_{number:02d}','label':label,'src':path,'w':w,'h':round(image.height*w/image.width,3)}
    if cat=='face': part['cheeks']=cheeks(image,w)
    return part


def main():
    mixed=Image.open(DESIGN/'mixed/source-sheet.png').convert('RGBA')
    for cat,key in [('face','faces'),('prop','props')]:
      sheet=Image.open(DESIGN/cat/'source-sheet.png').convert('RGBA')
      labels=next(j['labels'] for j in JOBS if j['key']==key)
      parts=[save(cat,19+i,labels[i],crop_cell(sheet,i)) for i in range(16)]
      extra=next(j['labels'] for j in JOBS if j['key']=='extras')
      indexes=[0,1] if cat=='face' else [2,3]
      for number,index in enumerate(indexes,35): parts.append(save(cat,number,extra[index],crop_cell(mixed,index)))
      (DESIGN/cat/'parts.json').write_text(json.dumps(parts,ensure_ascii=False,indent=2)+'\n')
      canvas=Image.new('RGB',(1000,600),'#fff8ea')
      for i,p in enumerate(parts):
        im=Image.open(ROOT/p['src']).convert('RGBA');im.thumbnail((145,145),Image.Resampling.LANCZOS)
        x=(i%6)*166+(166-im.width)//2;y=(i//6)*200+(165-im.height)//2
        canvas.paste(im,(x,y),im)
      canvas.save(DESIGN/cat/'contact-sheet.jpg',quality=90)
      print(cat,len(parts))


if __name__=='__main__':main()
