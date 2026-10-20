"""Validate runtime sprite files, alpha, raster bounds and recolor layer alignment."""
from pathlib import Path
import json, subprocess
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
js="const fs=require('fs'),vm=require('vm'),c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync('parts.js','utf8'),c);process.stdout.write(JSON.stringify(c.window.PARTS));"
parts=json.loads(subprocess.check_output(['node','-e',js],cwd=ROOT))
errors=[];checked=set(); total=0

def inspect(part):
    src=part.get('src')
    if not src:return
    files=[part[k] for k in ('src','fill','line','arms') if part.get(k)]
    shapes=[]
    for name in files:
        path=ROOT/name
        if not path.exists():errors.append(f'missing {name}');continue
        with Image.open(path) as im:
            im.load();shapes.append(im.size)
            if max(im.size)>384:errors.append(f'oversize {name}: {im.size}')
            if im.format!='WEBP':errors.append(f'format {name}: {im.format}')
            if 'A' not in im.getbands() or im.getchannel('A').getextrema()[0]!=0:errors.append(f'alpha {name}')
        checked.add(name)
    if len(set(shapes))>1:errors.append(f'mask alignment {src}: {shapes}')
    if part.get('w',0)<=0 or part.get('h',0)<=0:errors.append(f'geometry {src}')
    if shapes:
        raster=shapes[0]
        if abs((part['w']/part['h'])/(raster[0]/raster[1])-1)>.025:errors.append(f'aspect ratio {src}')
    for side in ('L','R'):
        if side in part:inspect(part[side])

for cat,values in parts.items():
    total+=len(values)
    for part in values:inspect(part)
style_file=ROOT/'design/style-refinement/catalog.json'
style=json.loads(style_file.read_text()) if style_file.exists() else {}
expected=style.get('counts',{'body':30,'ears':36,'deco':36,'face':36,'prop':36,'back':32})
counts={k:len(v) for k,v in parts.items()}
if counts!=expected:errors.append(f'counts {counts}')
for cat,ids in style.get('retired',{}).items():
    for part in parts.get(cat,[]):
        if part['id'] in ids:errors.append(f'retired part {part["id"]}')
print(json.dumps({'parts':total,'counts':counts,'images':len(checked),'errors':errors},ensure_ascii=False,indent=2))
raise SystemExit(bool(errors))
