"""Read engine-computed layouts and build a geometry-only contact sheet.

Run after qa-layouts.json is exported from engine.js. This QA preview uses
the actual source art, omits browser lighting/blush, and checks attachments.
"""
import json
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
samples = json.loads((HERE / 'qa-layouts.json').read_text())
sheet = Image.new('RGB', (6*352, 3*370), '#fff9ee')
draw = ImageDraw.Draw(sheet)
for index, sample in enumerate(samples):
    stage = Image.new('RGBA', (512, 512), '#f7f0e5')
    for layer in sample['layers']:
        if layer.get('type') == 'blush':
            continue
        art = Image.open(ROOT / layer['img']['src']).convert('RGBA')
        art = art.resize((max(1, round(layer['w'])), max(1, round(layer['h']))), Image.Resampling.LANCZOS)
        local = Image.new('RGBA', (512, 512))
        local.alpha_composite(art, (round(layer['x']), round(layer['y'])))
        if layer['rot']:
            local = local.rotate(-layer['rot'], Image.Resampling.BICUBIC,
                center=(layer['x']+layer['ox'], layer['y']+layer['oy']))
        stage.alpha_composite(local)
    tile = stage.crop((80, 130, 432, 470))
    x, y = (index%6)*352, (index//6)*370
    sheet.paste(tile, (x,y))
    label = f"{sample['id']} / {sample['look']['parts']['body']}"
    draw.text((x+95,y+348), label, fill='#594337')
sheet.save(HERE / 'attachment-qa.jpg', quality=94)
print(HERE / 'attachment-qa.jpg')
