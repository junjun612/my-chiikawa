"""Crop the user-requested 4x4 ImageGen sheets into transparent game parts.

The drawn objects do not all stop at the mathematical grid edge, so the
bounding boxes below follow each complete alpha object instead of clipping
at cell boundaries. Only cropping, downsampling and WebP encoding are used.
"""
import json
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
OUT = ROOT / 'parts' / 'deco'

BOXES = [
    (30, 65, 315, 314), (348, 77, 626, 318),
    (670, 103, 908, 329), (946, 121, 1230, 325),
    (30, 405, 322, 623), (377, 382, 582, 633),
    (638, 408, 921, 611), (960, 420, 1234, 627),
    (32, 704, 320, 908), (370, 683, 599, 933),
    (682, 693, 921, 914), (960, 711, 1233, 897),
    (32, 977, 328, 1190), (359, 981, 621, 1196),
    (665, 992, 951, 1180), (998, 965, 1205, 1204),
]
SELECTIONS = [
    # label, kind, target max edge, placement metadata
    ('딸기 모자', 'hat', 220, {'fit': 0.76, 'bot': 0.18}),
    ('푸딩 모자', 'hat', 210, {'fit': 0.70, 'bot': 0.16}),
    ('데이지 핀', 'side', 160, {}),
    ('체크 리본', 'side', 185, {}),
    ('별 리본', 'side', 180, {}),
    ('튤립', 'top', 185, {'sink': 0.22}),
    ('수련 모자', 'hat', 220, {'fit': 0.82, 'bot': 0.18}),
    ('라벤더 베레모', 'hat', 220, {'fit': 0.82, 'bot': 0.17}),
    ('만두 모자', 'hat', 210, {'fit': 0.73, 'bot': 0.15}),
    ('네잎클로버', 'side', 175, {}),
    ('초승달 핀', 'side', 170, {}),
    ('구름 핀', 'side', 180, {}),
    ('병아리', 'top', 190, {'sink': 0.18}),
    ('조개 핀', 'side', 170, {}),
    ('종이배 모자', 'hat', 220, {'fit': 0.83, 'bot': 0.16}),
    ('도토리 모자', 'hat', 205, {'fit': 0.65, 'bot': 0.18}),
    ('하트 간호 모자', 'hat', 220, {'fit': 0.78, 'bot': 0.16}),
    ('살구 나비 핀', 'side', 180, {}),
]

sheet1 = Image.open(HERE / 'sheet-01.png').convert('RGBA')
sheet2 = Image.open(HERE / 'sheet-02.png').convert('RGBA')
sources = [(sheet1, box) for box in BOXES]
sources += [(sheet2, (330, 115, 613, 306)), (sheet2, (961, 400, 1221, 606))]
parts = []
for index, ((sheet, box), (label, kind, max_edge, placement)) in enumerate(zip(sources, SELECTIONS), 19):
    padding = 5
    x1, y1, x2, y2 = box
    crop = sheet.crop((x1-padding, y1-padding, x2+padding, y2+padding))
    ratio = max_edge / max(crop.size)
    crop = crop.resize((round(crop.width*ratio), round(crop.height*ratio)), Image.Resampling.LANCZOS)
    part_id = f'deco_{index:02}'
    destination = OUT / f'{part_id}.webp'
    crop.save(destination, 'WEBP', quality=92, method=6, exact=True)
    parts.append({'id': part_id, 'label': label, 'src': f'parts/deco/{part_id}.webp',
                  'w': crop.width, 'h': crop.height, 'kind': kind, **placement})

(HERE / 'parts.json').write_text(json.dumps(parts, ensure_ascii=False, indent=2) + '\n')

# A checker-free warm preview makes pale fill and transparent-edge defects visible.
preview = Image.new('RGB', (6*230, 3*260), '#f6f0e5')
draw = ImageDraw.Draw(preview)
for index, part in enumerate(parts):
    crop = Image.open(ROOT / part['src']).convert('RGBA')
    col, row = index % 6, index // 6
    preview.paste(crop, (col*230 + (230-crop.width)//2, row*260 + (225-crop.height)//2), crop)
    draw.text((col*230+80, row*260+234), part['id'], fill='#594337')
preview.save(HERE / 'contact-sheet.jpg', quality=94)

print(json.dumps({'count': len(parts), 'bytes': sum((ROOT / p['src']).stat().st_size for p in parts),
                  'max_edge': max(max(p['w'],p['h']) for p in parts)}, ensure_ascii=False))
