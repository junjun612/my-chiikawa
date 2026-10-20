"""Select and prepare four approved replacement body sprites."""
from pathlib import Path
import importlib.util
import json
import shutil
import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
spec = importlib.util.spec_from_file_location('body_tools', HERE / 'process.py')
body_tools = importlib.util.module_from_spec(spec);spec.loader.exec_module(body_tools)
SRC = Image.open(HERE / 'replacements-hands-fixed-sheet.png').convert('RGBA')
CHOICES = [('body_03', '보송 털뭉치', 1), ('body_07', '우유 구름떡', 13),
           ('body_12', '하트 밀크푸딩', 5), ('body_16', '몽실 구름배', 10)]


def retain_patch(line, source):
    a = np.array(source); lp = np.array(line)
    h, w = a.shape[:2]; yy, xx = np.indices((h, w))
    region = (xx > w * .25) & (xx < w * .75) & (yy > h * .58) & (yy < h * .92)
    strength = np.clip((a[:, :, 2].astype(float) - 236) / 7, 0, 1)
    strength *= region & (a[:, :, :3].min(axis=2) > 235)
    patch = np.zeros_like(a);patch[:, :, :3] = a[:, :, :3]
    patch[:, :, 3] = np.round(a[:, :, 3] * strength).astype('uint8')
    out = Image.fromarray(patch);out.alpha_composite(line)
    return out


def main():
    backup = HERE / 'replaced-originals';backup.mkdir(exist_ok=True)
    old = json.JSONDecoder().raw_decode((ROOT / 'parts.js').read_text().split('window.PARTS = ', 1)[1])[0]
    previous = json.loads((backup / 'parts.json').read_text()) if (backup / 'parts.json').exists() else []
    saved_ids = {p['id'] for p in previous}
    additions = [p for p in old['body'] if p['id'] in [c[0] for c in CHOICES] and p['id'] not in saved_ids]
    for p in additions:
        for key in ['src', 'fill', 'line', 'arms']:
            if p.get(key): shutil.copy2(ROOT / p[key], backup / Path(p[key]).name)
    previous.extend(additions)
    (backup / 'parts.json').write_text(json.dumps(previous, ensure_ascii=False, indent=2) + '\n')
    parts = []
    for part_id, label, cell in CHOICES:
        sprite = body_tools.keep_largest(body_tools.crop_cell(SRC, cell))
        source = Image.new('RGBA', (sprite.width + 8, sprite.height + 8))
        source.alpha_composite(sprite, (4, 4));source.thumbnail((384, 384), Image.Resampling.LANCZOS)
        line, fill = body_tools.line_and_fill(source)
        arms, anchors = body_tools.hands_and_anchors(source, line)
        if part_id != 'body_03': line = retain_patch(line, source)
        paths = {key: f'parts/body/{part_id}{suffix}.webp'
                 for key, suffix in [('src', ''), ('fill', '_fill'), ('line', '_line'), ('arms', '_arms')]}
        for key, im in [('src', source), ('fill', fill), ('line', line), ('arms', arms)]:
            im.save(ROOT / paths[key], 'WEBP', lossless=True, method=6)
        part = {'id': part_id, 'label': label, **paths, 'w': source.width, 'h': source.height,
                'color': '#fff9eb', 'anchors': anchors, 'sourceCell': cell + 1}
        parts.append(part)
        print(part_id, source.size, 'prop', anchors['prop'])
    (HERE / 'replacements.json').write_text(json.dumps(parts, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__': main()
