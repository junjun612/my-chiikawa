"""Restore original atlas ink cut by three mathematical cell boundaries.

No new art is drawn. An expanded source crop plus the existing connected-
component extraction restores the complete original contour. Each repaired
part retains its previous canvas dimensions and attachment metadata.
"""
import importlib.util
import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
spec = importlib.util.spec_from_file_location('back_slice_utils', HERE/'slice_back.py')
utils = importlib.util.module_from_spec(spec)
spec.loader.exec_module(utils)

sheet = Image.open(HERE/'source-sheet.png').convert('RGBA')
parts = json.loads((HERE/'parts.json').read_text())
audit = []
before = HERE/'boundary-before'
before.mkdir(exist_ok=True)

for ident in ['back_24', 'back_25', 'back_33']:
    part = next(p for p in parts if p['id'] == ident)
    cell = int(ident.split('_')[1])-18
    cx, cy = cell%4, cell//4
    x0,y0,x1,y1 = [round(v) for v in (cx*sheet.width/4, cy*sheet.height/4,
                                      (cx+1)*sheet.width/4, (cy+1)*sheet.height/4)]
    raw = sheet.crop((x0-40, y0-40, x1+40, y1+40))
    cleaned = utils.utils.clean_crop(raw)
    # Contain the complete original art in the same previous design canvas.
    content = cleaned.copy()
    content.thumbnail((part['w']-4,part['h']-4), Image.Resampling.LANCZOS)
    image = Image.new('RGBA', (part['w'],part['h']))
    image.alpha_composite(content, ((part['w']-content.width)//2,(part['h']-content.height)//2))
    for field in ['src','fill','line']:
        if field in part:
            path = ROOT/part[field]
            if not (before/path.name).exists():
                shutil.copy2(path,before/path.name)
    utils.save(image,ident)
    if part.get('fill'):
        fill,line,_ = utils.tint_masks(image,cell)
        utils.save(fill,ident+'_fill')
        utils.save(line,ident+'_line')
    audit.append({'id':ident,'cell':cell,'expanded_source_box':[x0-40,y0-40,x1+40,y1+40],
                  'complete_source_size':list(cleaned.size),'output_size':list(image.size),
                  'content_size':list(content.size),'metadata_changed':False})

(HERE/'boundary-repair.json').write_text(json.dumps(audit,indent=2)+'\n')
board=Image.new('RGB',(750,3*260),'#f3f4ed')
draw=ImageDraw.Draw(board)
for row,p in enumerate(audit):
    draw.text((15,row*260+120),p['id'],fill='#55473e')
    for col,folder in enumerate([before,ROOT/'parts/back']):
        image=Image.open(folder/(p['id']+'.webp')).convert('RGBA')
        image.thumbnail((285,225),Image.Resampling.LANCZOS)
        x=130+col*305+(285-image.width)//2
        y=row*260+12+(225-image.height)//2
        board.paste(image,(x,y),image)
        draw.text((220+col*305,row*260+241),'before' if col==0 else 'restored',fill='#55473e')
board.save(HERE/'boundary-repair-review.jpg',quality=94)
print(json.dumps(audit))
