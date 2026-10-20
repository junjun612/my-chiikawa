"""Append restored body04, preserve the other25 bodies, and apply one visual QA fix."""
import importlib.util,json
from pathlib import Path
import numpy as np
from PIL import Image,ImageDraw

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('fit',HERE/'prepare_overrides.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
ROOT=m.ROOT
body04=json.loads((HERE.parent/'restored-body04.json').read_text())
baseline=json.loads((HERE/'baseline-parts.json').read_text())
if not any(b['id']=='body_04' for b in baseline['body']):
    baseline['body'].append(body04);baseline['body'].sort(key=lambda b:b['id'])
    (HERE/'baseline-parts.json').write_text(json.dumps(baseline,ensure_ascii=False,indent=2)+'\n')
m.q.PARTS=baseline;m.q.BY_ID={p['id']:p for cat in baseline.values() for p in cat}
overrides=json.loads((HERE.parent/'mouth-prop-overrides.json').read_text())
audit=json.loads((HERE/'audit.json').read_text());report=audit['report']


def prepare(bid,only=None):
    b=m.q.BY_ID[bid];face_masks,safe,final=m.facial_masks(b);hs,ink,hp=m.hands(b)
    for p in m.PROPS:
        if only and p['id'] not in only:continue
        fit=m.Fit(b,p,safe,final,hs,ink);off,r=fit.solve()
        mask=m.exact_prop_mask(b,p,fit.oldcenter,fit.oldangle,fit.oldscale)
        hits=[int(np.count_nonzero(mask&f)) for f in face_masks];worst=int(np.argmax(hits))
        record={'body':bid,'prop':p['id'],'beforeOffset':fit.old,'afterOffset':off or fit.old,
          'worstBeforeFace':m.q.PARTS['face'][worst]['id'],
          'beforeFaceIntersections':{m.q.PARTS['face'][i]['id']:n for i,n in enumerate(hits) if n},**r}
        index=next((i for i,x in enumerate(report) if x['body']==bid and x['prop']==p['id']),None)
        if index is None:report.append(record)
        else:report[index]=record
        if off:overrides.setdefault(bid,{})[p['id']]=off
    records=[r for r in report if r['body']==bid]
    board=Image.new('RGB',(1440,1440),'#fff9ed');draw=ImageDraw.Draw(board)
    for i,r in enumerate(records):
        cv=m.render(b,m.q.BY_ID[r['prop']],m.q.BY_ID[r['worstBeforeFace']],r['afterOffset'],hp)
        im=cv.crop((85,170,440,455));im.thumbnail((240,215),Image.Resampling.LANCZOS);x,y=i%6*240,i//6*240
        board.paste(im,(x+(240-im.width)//2,y));draw.text((x+25,y+218),f'{r["prop"]} / {r["worstBeforeFace"]} / {r["mode"][:7]}',fill='#523b30')
    board.save(HERE/f'after-{bid}.jpg',quality=94)
    print(bid,'changed',sum(r['mode']!='unchanged' for r in records),'unresolved',sum(r['mode']=='unresolved' for r in records))


prepare('body_04')
prepare('body_06',{'prop_17'})
report.sort(key=lambda r:(r['body'],r['prop']))
audit.update(pairs=len(report),faceChecks=len(report)*36,changedPairs=sum(len(v) for v in overrides.values()),
    unresolved=[(r['body'],r['prop']) for r in report if r['mode']=='unresolved'],report=report)
(HERE.parent/'mouth-prop-overrides.json').write_text(json.dumps(overrides,ensure_ascii=False,indent=2)+'\n')
(HERE/'audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
print('Final',audit['pairs'],'pairs',audit['faceChecks'],'faces',audit['changedPairs'],'changes')
