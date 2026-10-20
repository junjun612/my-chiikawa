"""Prepare pose candidates; --publish copies the reviewed nine to stable IDs.

Only actual grip C-strokes enter arms. Waving paws and body/fur outlines stay
in the source sprite. Fixed pale markings are removed from the recolorable
coat mask and retained, in original color, in the line/marking layer.
"""
from pathlib import Path
import argparse
import importlib.util
import json
import math
import cv2
import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
sp = importlib.util.spec_from_file_location('body_tools', ROOT / 'design/expansion/body/process.py')
T = importlib.util.module_from_spec(sp);sp.loader.exec_module(T)
SOURCE = Image.open(HERE / 'pose-anatomy-fixed-sheet.png').convert('RGBA')
HEAD_OVERRIDES = {p['id']:p['anchors'] for p in json.loads(
    (HERE.parent / 'head-attachments/head-overrides.json').read_text())}
# Boxes are measured on the alpha-cropped source, before the 4px padding.
CHOICES = [
    ('body_17', '솜털 인사', 5, [[131,179,160,211]], .37, 6, None),
    ('body_19', '살랑 인사', 0, [[60,176,90,210]], .36, -7, None),
    ('body_20', '동글 앉기', 2, [[68,132,96,164],[138,131,165,164]], .42, 0, None),
    ('body_21', '반짝 인사', 1, [[139,166,168,198]], .37, 6, None),
    ('body_23', '통통 햄스터', 8, [[77,142,107,175],[139,142,167,175]], .41, 0, None),
    ('body_24', '가슴 점 친구', 11, [[55,163,85,197]], .37, -4, [.40,.48,.76,.79]),
    ('body_25', '이마 점 햄스터', 9, [[150,168,180,203]], .37, 6, [.34,.01,.76,.24]),
    ('body_28', '잔털 수달', 13, [[135,168,164,200]], .38, 6, None),
    ('body_30', '동동 모찌', 15, [[71,163,100,197]], .39, -8, None),
]
ORIGINAL_DIMENSIONS = {'body_17':(244,257),'body_19':(240,259),'body_20':(231,215),
                       'body_21':(232,247),'body_23':(250,226),'body_24':(230,251),
                       'body_25':(246,252),'body_28':(232,255),'body_30':(229,239)}


def resolve_grips(sprite, part_id, expected_boxes):
    """Track the unchanged C-strokes after the anatomical outline cleanup."""
    a=np.array(sprite);h,w=a.shape[:2]
    mask=((a[:,:,:3].max(axis=2)<150)&(a[:,:,3]>80)).astype('uint8')
    n,labels,stats,centers=cv2.connectedComponentsWithStats(mask,8)
    candidates=[i for i in range(1,n) if stats[i,4]>70 and .055*w<stats[i,2]<.25*w
                and .07*h<stats[i,3]<.25*h and .4*h<centers[i,1]<.91*h]
    old_w,old_h=ORIGINAL_DIMENSIONS[part_id];used=set();result=[]
    for x0,y0,x1,y1 in expected_boxes:
        target=np.array([((x0+x1)/2)/old_w,((y0+y1)/2)/old_h])
        options=[i for i in candidates if i not in used];assert options,(part_id,candidates)
        chosen=min(options,key=lambda i:np.linalg.norm(centers[i]/[w,h]-target))
        assert np.linalg.norm(centers[chosen]/[w,h]-target)<.13,(part_id,centers[chosen],target)
        used.add(chosen);x,y,bw,bh=stats[chosen,:4];result.append([int(x),int(y),int(x+bw),int(y+bh)])
    return result


def layers(image, pattern_region):
    a = np.array(image);alpha = a[:, :, 3].astype(float);rgb = a[:, :, :3]
    value = rgb.max(axis=2).astype(float)
    ink_rgb = np.median(rgb[(value < 100) & (alpha > 160)], axis=0)
    base = float(np.median(value[(value > 240) & (alpha > 160)]))
    strength = np.clip((base - value) / (base - ink_rgb.max()), 0, 1)
    strength[value > 235] = 0
    line = np.zeros_like(a);line[:, :, :3] = np.round(ink_rgb).astype('uint8')
    line[:, :, 3] = np.round(alpha * strength).astype('uint8')
    fill = np.full_like(a, 255);fill[:, :, 3] = a[:, :, 3]
    fixed = np.zeros(alpha.shape, 'uint8')
    if pattern_region:
        h,w = alpha.shape;yy,xx = np.indices((h,w));x0,y0,x1,y1 = pattern_region
        region = (xx >= x0*w) & (xx < x1*w) & (yy >= y0*h) & (yy < y1*h)
        warm = ((rgb[:, :, 0].astype(int)-rgb[:, :, 2] > 24) &
                (rgb[:, :, 1].astype(int)-rgb[:, :, 2] > 10) &
                (rgb[:, :, 0] > 140) & (rgb[:, :, 1] > 120) & (alpha > 50) & region)
        n, labels, stats, _ = cv2.connectedComponentsWithStats(warm.astype('uint8'),8)
        for i in range(1,n):
            if stats[i,cv2.CC_STAT_AREA] > 40: fixed[labels == i] = 1
        assert fixed.sum() > 100, 'Expected fixed pale patch not detected'
        line[fixed != 0] = a[fixed != 0]
        fill[fixed != 0,3] = 0
    return Image.fromarray(line), Image.fromarray(fill), int(fixed.sum())


def prepare(part_id, label, cell, boxes, face_fraction, angle, pattern):
    if part_id == 'body_25':
        # User-approved hand switch: preserve the tilted hamster, grip with the
        # outstretched screen-left palm, rest the lower screen-right paw.
        sprite = Image.open(HERE / 'body25-hand-switch-cropped.png').convert('RGBA')
        boxes = [[0,98,31,133]]
    else:
        sprite = T.keep_largest(T.crop_cell(SOURCE,cell))
    p = np.array(sprite);p[p[:, :, 3] <= 4] = 0;sprite = Image.fromarray(p)
    if part_id != 'body_25':boxes=resolve_grips(sprite,part_id,boxes)
    image = Image.new('RGBA',(sprite.width+8,sprite.height+8));image.alpha_composite(sprite,(4,4))
    line,fill,fixed_count = layers(image,pattern)
    a = np.array(image);ink = np.array(line);h,w = a.shape[:2]
    arms = np.zeros_like(a);grips=[];regions=[]
    for raw in boxes:
        x0,y0,x1,y1 = [v+4 for v in raw]
        # Hand ROIs are small and measured: exclude every unrelated contour,
        # detached fur tick, resting paw and waving paw from the occlusion mask.
        x0=max(0,x0-2);y0=max(0,y0-2);x1=min(w,x1+2);y1=min(h,y1+2)
        area=ink[y0:y1,x0:x1].copy()
        value=area[:,:,:3].max(axis=2)
        area[value>130,3]=0
        arms[y0:y1,x0:x1]=area
        yy,xx=np.where(area[:,:,3]>80);assert len(xx)>40,(part_id,raw)
        cx=float(xx.mean()+x0);cy=float(yy.mean()+y0)
        opening=-1 if cx>(x0+x1)/2 else 1
        grips.append((cx,cy,opening));regions.append([x0,y0,x1,y1])
    solid=a[:,:,3]>127
    face_y=h*face_fraction;rows=range(max(0,round(face_y-h*.035)),min(h,round(face_y+h*.035)))
    mids=[];spans=[]
    for yy in rows:
        xs=np.where(solid[yy])[0]
        if len(xs):mids.append((xs.min()+xs.max())/2);spans.append(xs.max()-xs.min()+1)
    head_cx=float(np.median(mids));head_w=float(np.median(spans))
    ys,xs=np.where(solid);top_y=int(ys.min());crown_x=float(np.median(np.where(solid[top_y:top_y+4].any(axis=0))[0]))
    # Fit only the upper head arc, excluding torso, grip and waving paw. These
    # metrics describe the actual head; headW below remains the smaller hat fit.
    contours,_=cv2.findContours(solid.astype('uint8'),cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
    contour=max(contours,key=cv2.contourArea);upper=contour[contour[:,0,1]<h*.43]
    hc=(head_cx,float(top_y+h*.34));hw=head_w;hh=h*.68
    if len(upper)>12:
        (ex,ey),(ew,eh),_=cv2.fitEllipse(upper)
        fw,fh=max(ew,eh),min(ew,eh)
        if .65*w<fw<1.15*w and .45*h<fh<.90*h and .18*h<ey<.48*h:
            hc=(float(ex),float(ey));hw=float(fw);hh=float(fh)
    def surface(x):
        xi=round(x);y=np.where(solid[:,max(0,xi-2):min(w,xi+3)].any(axis=1))[0]
        return float(y[0]+2)
    ear_l=head_cx-head_w*.275;ear_r=head_cx+head_w*.275
    lower=[]
    for yy in range(round(h*.75),round(h*.85)):
        xx=np.where(solid[yy])[0]
        if len(xx):lower.append(((xx.min()+xx.max())/2,xx.max()-xx.min()+1))
    torso_cx,torso_w=np.median(lower,axis=0)
    if len(grips)==1:
        cx,cy,opening=grips[0]
        prop=[round(cx+opening*head_w*.045,2),round(cy,2),round(head_w*.34,2),float(angle+opening*12)]
    else:
        l,r=sorted(grips,key=lambda p:p[0]);cx=(l[0]+r[0])/2;cy=(l[1]+r[1])/2
        prop=[round(cx,2),round(cy,2),round(math.hypot(r[0]-l[0],r[1]-l[1])*1.10,2),round(math.degrees(math.atan2(r[1]-l[1],r[0]-l[0])),2)]
    anchors={'top':[round(crown_x,2),float(top_y)],'headW':round(head_w*.84,2),
             'earL':[round(ear_l,2),surface(ear_l),float(-15+angle)],
             'earR':[round(ear_r,2),surface(ear_r),float(15+angle)],
             'face':[round(head_cx,2),round(face_y,2),round(head_w*.57,2),float(angle)],'prop':prop,
             'tail':[round(torso_cx+torso_w*.33,2),round(h*.84,2)],
             'sideL':[round(torso_cx-torso_w*.30,2),round(h*.67,2)],
             'sideR':[round(torso_cx+torso_w*.30,2),round(h*.67,2)],
             'center':[round(torso_cx,2),round(h*.5,2)],'H':float(ys.max()-ys.min()+1),'W':float(xs.max()-xs.min()+1)}
    override=json.loads(json.dumps(HEAD_OVERRIDES[part_id]))
    if part_id == 'body_25':
        sx,sy=w/255,h/251
        for name in ['top','earL','earR','face']:
            override[name][0]*=sx;override[name][1]*=sy
            if name=='face':override[name][2]*=sx
        override['headW']*=sx
        override['head']['center']=[override['head']['center'][0]*sx,override['head']['center'][1]*sy]
        override['head']['crown']=[override['head']['crown'][0]*sx,override['head']['crown'][1]*sy]
        override['head']['w']*=sx;override['head']['h']*=sy
        # Foreground mask covers only the small outstretched palm, never the
        # relaxed opposite paw. The held item now sits at that raised hand.
        anchors['prop']=[37.0,117.0,round(override['head']['w']*.34,2),-12.0]
        for side in ['earL','earR']:
            override[side][1]=surface(override[side][0])
        override['top']=[round(crown_x,2),float(top_y)]
        override['head']['crown']=override['top']
    anchors.update(override)
    offsets = json.loads((HERE / 'hand-offsets.json').read_text()).get(part_id)
    if offsets:
        anchors['propOffsets'] = offsets
    head=anchors['head']
    part={'id':part_id,'label':label,'w':w,'h':h,'color':'#fffaf0','anchors':anchors,
          'sourceCell':cell+1,'gripRegions':regions,'gripCount':len(grips),'fixedPatternPixels':fixed_count,
          'headFrame':{'center':head['center'],'width':head['w'],'height':head['h'],
                       'angle':head['rotation'],'crown':head['crown']}}
    if part_id == 'body_25':part['sourceEdit']='body25-hand-switch-source.png'
    return part,{'src':image,'line':line,'fill':fill,'arms':Image.fromarray(arms)}


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--publish',action='store_true');args=parser.parse_args()
    out=ROOT/'parts/body' if args.publish else HERE/'pose-candidates';out.mkdir(exist_ok=True)
    parts=[]
    for row in CHOICES:
        part,images=prepare(*row)
        for key,suffix in [('src',''),('line','_line'),('fill','_fill'),('arms','_arms')]:
            target=out/(part['id']+suffix+'.webp');images[key].save(target,'WEBP',lossless=True,method=6)
            part[key]=str(target.relative_to(ROOT))
        parts.append(part)
        print(part['id'],'cell',part['sourceCell'],'grip',part['gripCount'],'prop',part['anchors']['prop'],'pattern',part['fixedPatternPixels'])
    filename='replacements.json' if args.publish else 'pose-candidates.json'
    (HERE/filename).write_text(json.dumps(parts,ensure_ascii=False,indent=2)+'\n')


if __name__=='__main__':main()
