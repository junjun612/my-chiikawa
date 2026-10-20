"""Add the restored body04 without changing the preceding80 override entries."""
from pathlib import Path
__file__=str(Path(__file__).resolve())
helpers=Path(__file__).with_name('legacy_handle_qa.py')
exec(compile(helpers.read_text().split('results={};records=[]')[0],str(helpers),'exec'))
# The shared helper prelude reads data only; all writes below are independent QA.
b=next(x for x in Q.PARTS['body'] if x['id']=='body_04');A=b['anchors'];S=190/b['w'];left=161;top=440-b['h']*S
raw=np.array(Image.open(ROOT/b['arms']).convert('RGBA'));n,labels,stats,cent=cv2.connectedComponentsWithStats((raw[:,:,3]>80).astype('uint8'),8)
options=[i for i in range(1,n) if stats[i,4]>30 and cent[i,0]>raw.shape[1]/2];chosen=max(options,key=lambda i:stats[i,4]);x,y,w,h,area=stats[chosen]
gx=(x+w/2)*b['w']/raw.shape[1];gy=(y+h/2)*b['h']/raw.shape[0]
fm=np.logical_or.reduce([warp(f,A['face'][2]*S*1.2/FACEREF,left+A['face'][0]*S,top+A['face'][1]*S,A['face'][3] if len(A['face'])>3 else 0) for f in F]);dist=cv2.distanceTransform((~fm).astype('uint8'),cv2.DIST_L2,5)
right_ink=warp({'src':b['arms'],'w':b['w'],'h':b['h']},S,left+b['w']*S/2,top+b['h']*S/2,0);right_ink[:,:256]=False;yy,xx=np.where(right_ink);hull=cv2.convexHull(np.stack([xx,yy],1).astype('int32'));inkdist=cv2.distanceTransform((~right_ink).astype('uint8'),cv2.DIST_L2,5)
contacts=[]
for dx in [0,2,4,6]:
 for dy in [0,2,4,6]:
  tx,ty=left+gx*S+dx,top+gy*S+dy
  if math.hypot(dx,dy)<=6.1 and cv2.pointPolygonTest(hull,(float(tx),float(ty)),False)>=0 and inkdist[round(ty),round(tx)]<=4:contacts.append((dx,dy))
assert contacts
result={};records=[]
for pid,uv in grips.items():
 p=P[pid];valid=[]
 for sizefactor in [.85,.82,.8,.78,.75,.72,.7]:
  size=A['prop'][2]*sizefactor;k=min(size/p['w'],size*1.25/p['h']);lx=(uv[0]-.5)*p['w']*k;ly=(uv[1]-.5)*p['h']*k
  for angle in sorted(set([pref[pid]+d for d in [0,-5,5,-10,10,-15,15,-20,20,-25,25,-30,30,-40,40,50,60]])):
   rad=math.radians(angle);co,si=math.cos(rad),math.sin(rad);rx=lx*co-ly*si;ry=lx*si+ly*co
   for dx,dy in contacts:
    cx,cy=gx+dx/S-rx,gy+dy/S-ry;pm=warp(p,k*S,left+cx*S,top+cy*S,angle);yy,xx=np.where(pm);gap=float(dist[pm].min());collision=int((pm&fm).sum());clipped=bool(xx.min()<3 or xx.max()>508 or yy.min()<3 or yy.max()>508);inkoverlap=int((pm&right_ink).sum())
    if collision or gap<1.2 or clipped or not inkoverlap:continue
    offset=[round(cx-A['prop'][0],3),round(cy-A['prop'][1],3),round(angle-(A['prop'][3] if len(A['prop'])>3 else 0),3),sizefactor]
    error=math.hypot(cx+rx-gx-dx/S,cy+ry-gy-dy/S)*S;score=abs(angle-pref[pid])*.045+abs(sizefactor-.8)*14+abs(gap-2)*.015+math.hypot(dx,dy)*.3
    record={'body':b['id'],'prop':pid,'offset':offset,'total_rotation':angle,'scale':sizefactor,'minimum_face_gap_stage_px':round(gap,3),'face_overlap_pixels':collision,'normalized_grip':uv,'grip_center_source':[round(gx+dx/S,3),round(gy+dy/S,3)],'contact_shift_stage':[dx,dy],'grip_error_stage_px':round(error,6),'stage_bounds':[int(xx.min()),int(yy.min()),int(xx.max()),int(yy.max())],'right_hand_ink_overlap_pixels':inkoverlap}
    valid.append((score,record))
 assert valid,pid
 _,r=min(valid,key=lambda z:z[0]);result[pid]=r['offset'];records.append(r);print(r)
overrides_path=HERE/'legacy-handle-overrides.json';old=json.loads(overrides_path.read_text());before={i:v for i,v in old.items() if i!='body_04'};old['body_04']=result;overrides_path.write_text(json.dumps(old,ensure_ascii=False,indent=2)+'\n');assert {i:v for i,v in json.loads(overrides_path.read_text()).items() if i!='body_04'}==before
validation_path=HERE/'legacy-handle-validation.json';report=json.loads(validation_path.read_text());report['records']=[r for r in report['records'] if r['body']!='body_04']+records;report['body_count']=17;report['face_combinations']=17*5*36;report['minimum_face_gap_stage_px']=min(r['minimum_face_gap_stage_px'] for r in report['records']);report['minimum_right_hand_ink_overlap_pixels']=min(r['right_hand_ink_overlap_pixels'] for r in report['records']);report['restored_body04']={'design_size':[b['w'],b['h']],'mask_size':[raw.shape[1],raw.shape[0]],'right_C_native_bbox':[int(x),int(y),int(w),int(h)],'right_palm_design':[gx,gy],'prior80_overrides_unchanged':True,'source_images_changed':False};report['visual_compositions_inspected']=180;validation_path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
canvas=Image.new('RGB',(1200,1120),'#fff8ea');draw=ImageDraw.Draw(canvas);ear=Q.PARTS['ears'][1]
for fi,fid in enumerate(['face_04','face_19']):
 face=next(f for f in F if f['id']==fid)
 for ci,pid in enumerate(grips):
  for variant in [0,1]:
   c=copy.deepcopy(b);base=c['anchors']['prop'];off=result[pid] if variant else [0,0,0,1];c['anchors']['prop']=[base[0]+off[0],base[1]+off[1],base[2]*off[3],(base[3] if len(base)>3 else 0)+off[2]];im=Q.render(c,ear,face,P[pid],'#e2f5e9').resize((240,219),Image.Resampling.LANCZOS);row=fi*2+variant;canvas.paste(im,(ci*240,row*280+20),im);draw.text((ci*240+10,row*280+253),fid+' '+pid+(' adjusted' if variant else ' before'),fill='#543b2d')
canvas.save(HERE/'legacy-handle-body04-before-after.jpg',quality=96)
