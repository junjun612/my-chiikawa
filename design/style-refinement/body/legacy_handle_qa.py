"""Read-only composition tuning; writes independent legacy prop overrides and QA."""
from pathlib import Path
import importlib.util,json,math,copy
import cv2,numpy as np
from PIL import Image,ImageDraw
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
s=importlib.util.spec_from_file_location('q',ROOT/'design/expansion/review/review.py');Q=importlib.util.module_from_spec(s);s.loader.exec_module(Q)
B=json.loads((HERE/'legacy-hand-replacements.json').read_text());data=json.loads((HERE/'legacy-hand-centers.json').read_text());centers={x['body']:x['rightPalm'] for x in data['centers']};grips=data['grips'];P={p['id']:p for p in Q.PARTS['prop']};F=Q.PARTS['face'];FACEREF=Q.MED_FACE
pref={'prop_04':80,'prop_05':115,'prop_11':90,'prop_13':55,'prop_30':135}
alpha_cache={}
def alpha(p):
 if p['src'] not in alpha_cache:alpha_cache[p['src']]=np.array(Image.open(ROOT/p['src']).convert('RGBA'))[:,:,3]
 return alpha_cache[p['src']]
def warp(p,scale,cx,cy,deg):
 a=alpha(p);rad=math.radians(deg);co,si=math.cos(rad),math.sin(rad);sx=scale*p['w']/a.shape[1];sy=scale*p['h']/a.shape[0];rx=a.shape[1]/2;ry=a.shape[0]/2
 M=np.array([[co*sx,-si*sy,cx-co*sx*rx+si*sy*ry],[si*sx,co*sy,cy-si*sx*rx-co*sy*ry]],'float32')
 return cv2.warpAffine(a,M,(512,512),flags=cv2.INTER_CUBIC)>80
results={};records=[];art=[]
for b in B:
 A=b['anchors'];S=190/b['w'];left=161;top=440-b['h']*S;gx,gy=centers[b['id']];fm=np.logical_or.reduce([warp(f,A['face'][2]*S*1.2/FACEREF,left+A['face'][0]*S,top+A['face'][1]*S,A['face'][3] if len(A['face'])>3 else 0) for f in F]);dist=cv2.distanceTransform((~fm).astype('uint8'),cv2.DIST_L2,5)
 right_ink=warp({'src':b['arms'],'w':b['w'],'h':b['h']},S,left+b['w']*S/2,top+b['h']*S/2,0);right_ink[:,:round(left+b['w']*S/2)]=False
 yy,xx=np.where(right_ink);hull=cv2.convexHull(np.stack([xx,yy],1).astype('int32'));inkdist=cv2.distanceTransform((~right_ink).astype('uint8'),cv2.DIST_L2,5)
 contacts=[]
 for dx in [0,2,4,6]:
  for dy in [0,2,4,6]:
   tx,ty=left+gx*S+dx,top+gy*S+dy
   if math.hypot(dx,dy)<=6.1 and cv2.pointPolygonTest(hull,(float(tx),float(ty)),False)>=0 and inkdist[round(ty),round(tx)]<=4:contacts.append((dx,dy))
 if not contacts:contacts=[(0,0)]
 result={}
 for pid,uv in grips.items():
  p=P[pid];valid=[];fallback=[]
  for sizefactor in [.85,.82,.8,.78,.75,.72,.7]:
   size=A['prop'][2]*sizefactor;k=min(size/p['w'],size*1.25/p['h']);lx=(uv[0]-.5)*p['w']*k;ly=(uv[1]-.5)*p['h']*k
   for angle in sorted(set([pref[pid]+d for d in [0,-5,5,-10,10,-15,15,-20,20,-25,25,-30,30,-40,40,50,60]])):
    rad=math.radians(angle);co,si=math.cos(rad),math.sin(rad);rx=lx*co-ly*si;ry=lx*si+ly*co
    for dx,dy in contacts:
     cx,cy=gx+dx/S-rx,gy+dy/S-ry
     pm=warp(p,k*S,left+cx*S,top+cy*S,angle);yy,xx=np.where(pm);gap=float(dist[pm].min());collision=int((pm&fm).sum());clipped=bool(xx.min()<3 or xx.max()>508 or yy.min()<3 or yy.max()>508)
     offset=[round(cx-A['prop'][0],3),round(cy-A['prop'][1],3),round(angle-(A['prop'][3] if len(A['prop'])>3 else 0),3),sizefactor]
     error=math.hypot(cx+rx-gx-dx/S,cy+ry-gy-dy/S)*S;score=abs(angle-pref[pid])*.045+abs(sizefactor-.8)*14+abs(gap-2)*.015+math.hypot(dx,dy)*.3
     record={'body':b['id'],'prop':pid,'offset':offset,'total_rotation':angle,'scale':sizefactor,'minimum_face_gap_stage_px':round(gap,3),'face_overlap_pixels':collision,'normalized_grip':uv,'grip_center_source':[round(gx+dx/S,3),round(gy+dy/S,3)],'contact_shift_stage':[dx,dy],'grip_error_stage_px':round(error,6),'stage_bounds':[int(xx.min()),int(yy.min()),int(xx.max()),int(yy.max())]}
     fallback.append((collision+max(0,2-gap)*20+clipped*1000+score,record))
     if collision==0 and gap>=1.2 and not clipped:valid.append((score,record))
  assert valid,(b['id'],pid,min(fallback,key=lambda x:x[0]))
  _,r=min(valid,key=lambda x:x[0]);result[pid]=r['offset'];records.append(r)
 results[b['id']]=result
 print(b['id'],[(x['prop'],x['total_rotation'],x['scale'],x['minimum_face_gap_stage_px']) for x in records[-5:]],flush=True)
(HERE/'legacy-handle-overrides.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
report={'body_count':len(B),'prop_count':len(grips),'face_count':len(F),'face_combinations':len(B)*len(grips)*len(F),'maximum_face_opaque_overlap_pixels':max(x['face_overlap_pixels'] for x in records),'minimum_face_gap_stage_px':min(x['minimum_face_gap_stage_px'] for x in records),'maximum_grip_error_stage_px':max(x['grip_error_stage_px'] for x in records),'minimum_scale':min(x['scale'] for x in records),'source_images_changed':False,'records':records}
(HERE/'legacy-handle-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
for faceid,tag in [('face_04','large-face'),('face_19','small-face')]:
 face=next(x for x in F if x['id']==faceid);ear=Q.PARTS['ears'][1]
 for group in range(4):
  canvas=Image.new('RGB',(1200,1120),'#fff8ea');draw=ImageDraw.Draw(canvas)
  for r,b in enumerate(B[group*4:(group+1)*4]):
   for col,pid in enumerate(grips):
    c=copy.deepcopy(b);base=c['anchors']['prop'];off=results[b['id']][pid];c['anchors']['prop']=[base[0]+off[0],base[1]+off[1],base[2]*off[3],(base[3] if len(base)>3 else 0)+off[2]]
    im=Q.render(c,ear,face,P[pid],'#e2f5e9');im=im.resize((240,219),Image.Resampling.LANCZOS);canvas.paste(im,(col*240,r*280+20),im);draw.text((col*240+10,r*280+253),b['id']+' '+pid,fill='#543b2d')
  canvas.save(HERE/f'legacy-handle-{tag}-{group+1}.jpg',quality=96)
print(json.dumps({k:v for k,v in report.items() if k!='records'},ensure_ascii=False))
