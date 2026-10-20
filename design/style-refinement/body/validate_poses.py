"""Raster/mask regression checks plus complete body/prop contact sheets."""
from pathlib import Path
import hashlib,importlib.util,json,shutil
import cv2,numpy as np
from PIL import Image,ImageDraw
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
s=importlib.util.spec_from_file_location('qa',ROOT/'design/expansion/review/review.py');Q=importlib.util.module_from_spec(s);s.loader.exec_module(Q)
parts=json.loads((HERE/'replacements.json').read_text());ids={p['id'] for p in parts}
old=json.loads((HERE/'before-hashes.json').read_text());unchanged=[]
for rel,digest in old.items():
    if not any(Path(rel).name.startswith(i+'.') or Path(rel).name.startswith(i+'_') for i in ids):
        assert hashlib.sha256((ROOT/rel).read_bytes()).hexdigest()==digest,rel
        unchanged.append(rel)
rows=[];total_bytes=0
for p in parts:
    arrays={k:np.array(Image.open(ROOT/p[k]).convert('RGBA')) for k in ['src','fill','line','arms']}
    assert all(a.shape==(p['h'],p['w'],4) for a in arrays.values()),p['id']
    assert max(p['h'],p['w'])<=384
    alpha=arrays['src'][:,:,3];assert not np.any(np.concatenate([alpha[:3].ravel(),alpha[-3:].ravel(),alpha[:,:3].ravel(),alpha[:,-3:].ravel()])),p['id']
    roi=np.zeros(alpha.shape,'uint8')
    for x0,y0,x1,y1 in p['gripRegions']:roi[y0:y1,x0:x1]=1
    assert not np.any((arrays['arms'][:,:,3]>0)&(roi==0)),p['id']
    assert len(p['gripRegions'])==p['gripCount']
    if p['fixedPatternPixels']:
        src=arrays['src'];warm=((src[:,:,0].astype(int)-src[:,:,2]>24)&(src[:,:,1].astype(int)-src[:,:,2]>10)&(src[:,:,0]>140)&(src[:,:,1]>120)&(src[:,:,3]>50))
        fixed=warm&(arrays['fill'][:,:,3]==0)
        assert fixed.sum()==p['fixedPatternPixels'],(p['id'],fixed.sum())
        assert np.array_equal(arrays['line'][fixed],src[fixed]),p['id']
    byte_count=sum((ROOT/p[k]).stat().st_size for k in arrays);total_bytes+=byte_count
    rows.append({'id':p['id'],'size':[p['w'],p['h']],'grip_count':p['gripCount'],'prop':p['anchors']['prop'],'fixed_pattern_pixels':p['fixedPatternPixels'],'asset_bytes':byte_count})
    entries=[(p['id']+' '+pr['id'],Q.render(p,Q.PARTS['ears'][1],Q.PARTS['face'][0],pr,'#e2f5e9')) for pr in Q.PARTS['prop']]
    name=p['id']+'-pose-all-props.jpg';Q.sheet(name,entries,6);shutil.copy(Q.HERE/name,HERE/name)
representatives=['prop_02','prop_04','prop_15','prop_31','prop_35']
props=[pr for i in representatives for pr in Q.PARTS['prop'] if pr['id']==i]
entries=[(p['id']+' '+pr['id'],Q.render(p,Q.PARTS['ears'][1],Q.PARTS['face'][0],pr,'#e2f5e9')) for p in parts for pr in props]
Q.sheet('pose-grip-review-final.jpg',entries,5);shutil.copy(Q.HERE/'pose-grip-review-final.jpg',HERE/'pose-grip-review-final.jpg')
for j in range(3):Q.sheet('pose-final-review-'+str(j+1)+'.jpg',entries[j*15:(j+1)*15],5);shutil.copy(Q.HERE/('pose-final-review-'+str(j+1)+'.jpg'),HERE/('pose-final-review-'+str(j+1)+'.jpg'))
entries=[(p['id'],Q.render(p,Q.PARTS['ears'][1],Q.PARTS['face'][0],props[i%len(props)],['#e2f5e9','#fff4c7','#dff1fa'][i%3])) for i,p in enumerate(parts)]
Q.sheet('final-nine-compositions.jpg',entries,3);shutil.copy(Q.HERE/'final-nine-compositions.jpg',HERE/'final-nine-compositions.jpg')
canvas=Image.new('RGB',(1080,1050),'#bcd7bf');d=ImageDraw.Draw(canvas)
for i,p in enumerate(parts):
    im=Image.open(ROOT/p['src']).convert('RGBA');im.thumbnail((290,285));x=(i%3)*360+(360-im.width)//2;y=(i//3)*350+8;canvas.paste(im,(x,y),im);d.text(((i%3)*360+14,(i//3)*350+315),p['id']+' grip'+str(p['gripCount']),fill='#49382c')
canvas.save(HERE/'pose-selection-nine.jpg',quality=95)
report={'selected':9,'retained_catalog_bodies':16,'removed_from_catalog':5,'final_catalog_bodies':25,'one_hand_count':7,'two_hand_count':2,'patterns':2,'asset_files':36,'asset_bytes':total_bytes,'preserved_body13':True,'all_21_unselected_body_file_sets_unchanged':len(unchanged)==84,'raster_and_mask_alignment':True,'3px_transparent_padding':True,'arms_ROI_only':True,'fixed_patterns_survive_recoloring':True,'prop_composites':len(parts)*len(Q.PARTS['prop']),'anatomy_visual_check':'Each body has exactly two readable arms and two closed bottom feet; body25 holds with screen-left outstretched palm and rests its lower screen-right paw.','head_attachment_review':'Independent 9 head frames,3 bodies x36ears,9 bodies x6 head combinations; merged overrides.','bodies':rows}
(HERE/'pose-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k!='bodies'},ensure_ascii=False,indent=2))
