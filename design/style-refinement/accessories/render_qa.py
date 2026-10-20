"""Render real engine layouts and color masks for small-accessory QA.

Run `node design/style-refinement/accessories/export_qa.js` first from repo root.
Browser lighting and blush glow are omitted; source masks and tints are applied.
"""
from PIL import Image,ImageDraw
from pathlib import Path
import json

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
samples=json.loads((HERE/'qa-layouts.json').read_text())
board=Image.new('RGB',(1680,1200),'#fff9ee')
draw=ImageDraw.Draw(board)
for i,s in enumerate(samples):
    stage=Image.new('RGBA',(512,512),'#f6f0e6')
    for layer in s['layers']:
        if layer.get('type')=='blush':continue
        img=layer['img']
        art=Image.open(ROOT/img['src']).convert('RGBA')
        if layer.get('tint') and img.get('fill'):
            mask=Image.open(ROOT/img['fill']).convert('RGBA').getchannel('A')
            art=Image.new('RGBA',mask.size,layer['tint']);art.putalpha(mask)
            art.alpha_composite(Image.open(ROOT/img['line']).convert('RGBA'))
        art=art.resize((max(1,round(layer['w'])),max(1,round(layer['h']))),Image.Resampling.LANCZOS)
        local=Image.new('RGBA',(512,512))
        local.alpha_composite(art,(round(layer['x']),round(layer['y'])))
        if layer['rot']:
            local=local.rotate(-layer['rot'],Image.Resampling.BICUBIC,
                center=(layer['x']+layer['ox'],layer['y']+layer['oy']))
        stage.alpha_composite(local)
    tile=stage.crop((60,95,452,480))
    tile.thumbnail((280,275),Image.Resampling.LANCZOS)
    x=i%6*280;y=i//6*300
    board.paste(tile,(x,y),tile)
    draw.text((x+75,y+278),s['id']+' '+s['look']['parts']['body'],fill='#594337')
board.save(HERE/'qa.jpg',quality=94)
