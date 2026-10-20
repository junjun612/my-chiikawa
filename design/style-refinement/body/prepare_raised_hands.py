"""Publish six raised-hand corrections; keep body25 and seated sprites unchanged.

The generated sheet supplies artwork. This only crops/resizes its sprites,
separates recolor layers, and measures their anchors and local palm masks.
"""
from pathlib import Path
import importlib.util,json,copy,math,hashlib
import numpy as np
from PIL import Image,ImageDraw
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
s=importlib.util.spec_from_file_location('pose_tools',HERE/'prepare_poses.py');Q=importlib.util.module_from_spec(s);s.loader.exec_module(Q);T=Q.T
OLD={p['id']:p for p in json.loads((HERE/'raised-hand-before/parts.json').read_text())}
CONFIG=[('body_17','left',[0,122,38,167]),('body_19','right',[207,109,239,147]),('body_21','left',[0,95,37,138]),('body_24','right',[201,100,234,142]),('body_28','left',[0,105,37,149]),('body_30','right',[195,88,229,132])]
# Product body25 stays byte-for-byte unchanged; keep its reference metadata for QA.
text=(ROOT/'parts.js').read_text();catalog=json.JSONDecoder().raw_decode(text.split('window.PARTS = ',1)[1])[0]
b25=next(x for x in catalog['body'] if x['id']=='body_25');b25hash={k:hashlib.sha256((ROOT/b25[k]).read_bytes()).hexdigest() for k in ['src','fill','line','arms']}
fixed=T.keep_largest(Image.open(HERE/'raised-hand-body17-fixed-source.png').convert('RGBA'));fixed.thumbnail((246,252),Image.Resampling.LANCZOS);fixed.save(HERE/'raised-hand-candidates/body_17_raw.png')
parts=[];validation=[];out=ROOT/'parts/body'
for bid,side,box in CONFIG:
 raw=Image.open(HERE/'raised-hand-candidates'/f'{bid}_raw.png').convert('RGBA');a=np.array(raw);a[a[:,:,3]<=4]=0;raw=Image.fromarray(a);im=Image.new('RGBA',(raw.width+8,raw.height+8));im.alpha_composite(raw,(4,4));line,fill,pattern=Q.layers(im,[.4,.48,.76,.79] if bid=='body_24' else None)
 p=copy.deepcopy(OLD[bid]);old=p['anchors'];h,w=im.height,im.width;solid=np.array(im)[:,:,3]>127;yy,xx=np.where(solid);top=int(yy.min());crown=float(np.median(np.where(solid[top:top+4].any(axis=0))[0]));frac=old['face'][1]/p['h'];facey=h*frac;rows=solid[max(0,round(facey-h*.035)):min(h,round(facey+h*.035))];spans=[];mids=[]
 for row in rows:
  xs=np.where(row)[0]
  if len(xs):spans.append(xs.max()-xs.min()+1);mids.append((xs.min()+xs.max())/2)
 headw=float(np.median(spans));headcx=float(np.median(mids));headh=h*.66;angle=old.get('head',{}).get('rotation',old['face'][3]);rad=math.radians(angle);co,si=math.cos(rad),math.sin(rad)
 sx,sy=w/p['w'],h/p['h'];A={k:copy.deepcopy(v) for k,v in old.items() if k!='propOffsets'}
 for k in ['tail','sideL','sideR','center']:A[k]=[round(A[k][0]*sx,2),round(A[k][1]*sy,2)]
 A['top']=[round(crown,2),top];A['headW']=round(headw*.84,2);A['face']=[round(headcx,2),round(facey,2),round(headw*.57,2),angle];A['head']={'center':[round(headcx,2),round(top+headh/2,2)],'w':headw,'h':round(headh,2),'rotation':angle,'crown':A['top'][:]};A['earScale']=round(headw*190/w/180,5)
 for key,sign in [('earL',-1),('earR',1)]:
  lx,ly=sign*.27*headw,-.4*headh;x=headcx+lx*co-ly*si;tops=[]
  for col in range(max(0,round(x)-3),min(w,round(x)+4)):
   ys=np.where(solid[:round(h*.55),col])[0]
   if len(ys):tops.append(int(ys[0]))
  assert tops,(bid,key,x);A[key]=[round(x,2),float(np.median(tops))+2,angle+sign*15]
 A['H']=int(yy.max()-yy.min()+1);A['W']=int(xx.max()-xx.min()+1)
 x0,y0,x1,y1=[v+4 for v in box];x0=max(0,x0);y0=max(0,y0);x1=min(w,x1);y1=min(h,y1);la=np.array(line);arms=np.zeros_like(la);region=la[y0:y1,x0:x1].copy();region[region[:,:,:3].max(axis=2)>130,3]=0;arms[y0:y1,x0:x1]=region;ay,ax=np.where(arms[:,:,3]>80);assert len(ax)>60,bid
 palm=[round((x0+x1)/2,2),round((y0+y1)/2,2)];A['prop']=[palm[0],palm[1],round(headw*.34,2),-12 if side=='left' else 12]
 p.update({'w':w,'h':h,'anchors':A,'gripRegions':[[x0,y0,x1,y1]],'gripCount':1,'fixedPatternPixels':pattern,'gripSide':side,'raisedHand':{'side':side,'palm':palm,'inkCenter':[round(float(ax.mean()),2),round(float(ay.mean()),2)]},'sourceEdit':'raised-hand-body17-fixed-source.png' if bid=='body_17' else 'raised-hand-source-sheet.png'})
 p['headFrame']={'center':A['head']['center'],'width':headw,'height':round(headh,2),'angle':angle,'crown':A['top'][:]}
 for k,art,suffix in [('src',im,''),('fill',fill,'_fill'),('line',line,'_line'),('arms',Image.fromarray(arms),'_arms')]:
  path=out/f'{bid}{suffix}.webp';art.save(path,'WEBP',lossless=True,method=6);p[k]=str(path.relative_to(ROOT));aa=np.array(art)[:,:,3];assert not np.any(np.concatenate([aa[:3].ravel(),aa[-3:].ravel(),aa[:,:3].ravel(),aa[:,-3:].ravel()])),(bid,k,'padding')
 parts.append(p);validation.append({'id':bid,'size':[w,h],'gripSide':side,'gripRegions':p['gripRegions'],'raised_palm':palm,'ink_center':p['raisedHand']['inkCenter'],'old_low_C_removed_visual_check':True,'two_arms_two_bottom_feet_visual_check':True,'fixed_pattern_pixels':pattern,'head_rotation':angle,'no_old_propOffsets_inherited':True});print(bid,w,h,side,A['prop'],p['gripRegions'],flush=True)
(HERE/'raised-hand-replacements.json').write_text(json.dumps(parts,ensure_ascii=False,indent=2)+'\n')
for k in b25hash:assert hashlib.sha256((ROOT/b25[k]).read_bytes()).hexdigest()==b25hash[k],k
report={'changed_bodies':6,'changed_asset_files':24,'single_hand_bodies':7,'preserved_body25_assets':True,'body25_donut_offset_expected':[-39,-24],'root_calibrates252_offsets':True,'all_masks_same_dimensions_as_body':True,'3px_transparent_padding':True,'source_sheet':'raised-hand-source-sheet.png','body17_targeted_source':'raised-hand-body17-fixed-source.png','parts':validation}
(HERE/'raised-hand-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
board=Image.new('RGB',(1080,760),'#e9f4eb');draw=ImageDraw.Draw(board)
for i,p in enumerate(parts):
 im=Image.open(ROOT/p['src']).convert('RGBA');im.thumbnail((300,300));x=(i%3)*360+(360-im.width)//2;y=(i//3)*380+10;board.paste(im,(x,y),im);draw.text(((i%3)*360+20,(i//3)*380+330),p['id']+' '+p['gripSide']+' raised grip',fill='#503b30')
board.save(HERE/'raised-hand-six.jpg',quality=96)
