"""Only correct colliding pairs among20 remaining new-pose handle combinations."""
from pathlib import Path
__file__=str(Path(__file__).resolve())
helpers=Path(__file__).with_name('legacy_handle_qa.py')
exec(compile(helpers.read_text().split('results={};records=[]')[0],str(helpers),'exec'))
T={'body_17':['prop_04','prop_05','prop_13'],'body_19':['prop_04','prop_05','prop_13'],'body_21':['prop_04','prop_05','prop_13'],'body_24':['prop_05','prop_13','prop_30'],'body_28':['prop_04','prop_05','prop_11','prop_13','prop_30'],'body_30':['prop_05','prop_13','prop_30']}
BI={b['id']:b for b in Q.PARTS['body']};results={};records=[]
for bid,pids in T.items():
 b=BI[bid];A=b['anchors'];S=190/b['w'];left=161;top=440-b['h']*S;g=b['gripRegions'][0];gx=(g[0]+g[2])/2;gy=(g[1]+g[3])/2;direction=1 if bid in ['body_17','body_21','body_28'] else -1
 masks=[warp(f,A['face'][2]*S*1.2/FACEREF,left+A['face'][0]*S,top+A['face'][1]*S,A['face'][3] if len(A['face'])>3 else 0) for f in F];fm=np.logical_or.reduce(masks);dist=cv2.distanceTransform((~fm).astype('uint8'),cv2.DIST_L2,5)
 ink=warp({'src':b['arms'],'w':b['w'],'h':b['h']},S,left+b['w']*S/2,top+b['h']*S/2,0);yy,xx=np.where(ink);hull=cv2.convexHull(np.stack([xx,yy],1).astype('int32'));inkdist=cv2.distanceTransform((~ink).astype('uint8'),cv2.DIST_L2,5);contacts=[]
 for dx in [0,2,4,6]:
  for dy in [0,2,4,6]:
   tx,ty=left+gx*S+direction*dx,top+gy*S+dy
   if math.hypot(dx,dy)<=6.1 and cv2.pointPolygonTest(hull,(float(tx),float(ty)),False)>=0 and inkdist[round(ty),round(tx)]<=4:contacts.append((direction*dx,dy))
 assert contacts,bid
 for pid in pids:
  p=P[pid];old=A.get('propOffsets',{}).get(pid,[0,0,0,1]);old=[*old]+[0]*(4-len(old));old[3]=old[3] or 1;base=A['prop'];sz=base[2]*old[3];k=min(sz/p['w'],sz*1.25/p['h']);oa=(base[3] if len(base)>3 else 0)+old[2];ocx=base[0]+old[0];ocy=base[1]+old[1];pm=warp(p,k*S,left+ocx*S,top+ocy*S,oa);collision=int((pm&fm).sum());before_max=max(int((pm&m).sum()) for m in masks);before_gap=float(dist[pm].min());record={'body':bid,'prop':pid,'before_offset':old,'before_face_union_overlap_pixels':collision,'before_face_max_overlap_pixels':before_max,'before_face_gap_stage_px':round(before_gap,3)}
  if collision==0:
   record.update({'changed':False,'after_offset':old,'after_face_opaque_overlap_pixels':0,'after_face_gap_stage_px':round(before_gap,3)});records.append(record);print(bid,pid,'keep',flush=True);continue
  uv=grips[pid];valid=[]
  for sizefactor in [1,.95,.9,.85,.8,.75,.7]:
   sz=base[2]*sizefactor;k=min(sz/p['w'],sz*1.25/p['h']);lx=(uv[0]-.5)*p['w']*k;ly=(uv[1]-.5)*p['h']*k
   for angle in sorted(set([oa]+[direction*v for v in range(15,171,5)])):
    rad=math.radians(angle);co,si=math.cos(rad),math.sin(rad);rx=lx*co-ly*si;ry=lx*si+ly*co
    for dx,dy in contacts:
     cx,cy=gx+dx/S-rx,gy+dy/S-ry;mask=warp(p,k*S,left+cx*S,top+cy*S,angle);yy,xx=np.where(mask);gap=float(dist[mask].min());intersect=int((mask&fm).sum());ink_overlap=int((mask&ink).sum());clipped=bool(xx.min()<3 or xx.max()>508 or yy.min()<3 or yy.max()>508)
     if intersect or gap<1.2 or ink_overlap<3 or clipped:continue
     score=abs(angle-oa)*.035+abs(sizefactor-old[3])*8+math.hypot(dx,dy)*.20+math.hypot(cx-ocx,cy-ocy)*S*.025+abs(gap-2)*.01
     off=[round(cx-base[0],3),round(cy-base[1],3),round(angle-(base[3] if len(base)>3 else 0),3),sizefactor]
     info={'after_offset':off,'after_total_rotation':angle,'after_scale':sizefactor,'after_face_opaque_overlap_pixels':0,'after_face_gap_stage_px':round(gap,3),'right_or_left_hand_ink_overlap_pixels':ink_overlap,'contact_shift_stage':[dx,dy],'grip_center_source':[round(gx+dx/S,3),round(gy+dy/S,3)],'normalized_grip':uv,'grip_error_stage_px':round(math.hypot(cx+rx-gx-dx/S,cy+ry-gy-dy/S)*S,6),'stage_bounds':[int(xx.min()),int(yy.min()),int(xx.max()),int(yy.max())]}
     valid.append((score,info))
  assert valid,(bid,pid)
  _,best=min(valid,key=lambda z:z[0]);record.update(best);record['changed']=True;records.append(record);results.setdefault(bid,{})[pid]=best['after_offset'];print(bid,pid,'changed',best['after_offset'],best['after_face_gap_stage_px'],flush=True)
(HERE/'remaining-handle-overrides.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
report={'target_pairs':20,'changed_pairs':sum(r['changed'] for r in records),'kept_pairs':sum(not r['changed'] for r in records),'face_count':36,'face_combinations_checked':720,'maximum_after_face_opaque_overlap_pixels':max(r['after_face_opaque_overlap_pixels'] for r in records),'source_images_changed':False,'shared_metadata_changed':False,'records':records};(HERE/'remaining-handle-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
for fid,tag in [('face_04','large-face'),('face_19','small-face')]:
 face=next(f for f in F if f['id']==fid);ear=Q.PARTS['ears'][1]
 for page in [0,1]:
  canvas=Image.new('RGB',(1200,1120),'#fff8ea');draw=ImageDraw.Draw(canvas)
  for i,r in enumerate(records[page*10:(page+1)*10]):
   b=BI[r['body']];p=P[r['prop']];row,col=divmod(i,5)
   for variant in [0,1]:
    off=r['after_offset'] if variant else r['before_offset'];c=copy.deepcopy(b);base=c['anchors']['prop'];c['anchors']['prop']=[base[0]+off[0],base[1]+off[1],base[2]*off[3],(base[3] if len(base)>3 else 0)+off[2]];im=Q.render(c,ear,face,p,'#e2f5e9').resize((240,219),Image.Resampling.LANCZOS);rr=row*2+variant;canvas.paste(im,(col*240,rr*280+20),im);draw.text((col*240+8,rr*280+253),r['body']+' '+r['prop']+(' after' if variant else ' before'),fill='#543b2d')
  canvas.save(HERE/f'remaining-handle-{tag}-{page+1}.jpg',quality=96)
print(json.dumps({k:v for k,v in report.items() if k!='records'}))
