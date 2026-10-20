"""Prepare the six conservatively selected authentic-body replacements.

The generated source is kept unchanged. Crops include 24px outside nominal
sheet cells to recover any crossing ink; padding alone cannot repair clipping.
"""
from pathlib import Path
import importlib.util
import json
import numpy as np
from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
spec = importlib.util.spec_from_file_location('body_tools', ROOT / 'design/expansion/body/process.py')
T = importlib.util.module_from_spec(spec);spec.loader.exec_module(T)
SOURCE = Image.open(HERE / 'final-source-sheet.png').convert('RGBA')
CHOICES = [('body_19', '동글 친구', 0), ('body_20', '포근 동글', 2),
           ('body_21', '작은 달걀', 3), ('body_23', '말랑 볼살', 12),
           ('body_24', '우유 방울', 13), ('body_25', '통통 친구', 15)]


def main():
    parts = []
    contact = Image.new('RGB', (3 * 340, 2 * 340), '#eaf2e5')
    draw = ImageDraw.Draw(contact)
    for i, (part_id, label, cell) in enumerate(CHOICES):
        sprite = T.keep_largest(T.crop_cell(SOURCE, cell))
        p = np.array(sprite)
        # The generator stores colored RGB at barely visible alpha around the ink.
        # Drop only <=4/255 alpha noise; the actual hand-drawn edge stays intact.
        p[p[:, :, 3] <= 4] = 0
        sprite = Image.fromarray(p)
        padded = Image.new('RGBA', (sprite.width + 8, sprite.height + 8))
        padded.alpha_composite(sprite, (4, 4))
        padded.thumbnail((384, 384), Image.Resampling.LANCZOS)
        line, fill = T.line_and_fill(padded)
        arms, anchors = T.hands_and_anchors(padded, line)
        # Faces belong to the broad upper head, leaving the small front paws and
        # their prop clearly below the mouth.
        anchors['face'][1] = round(padded.height * .43, 2)
        paths = {key: f'parts/body/{part_id}{suffix}.webp'
                 for key, suffix in [('src', ''), ('fill', '_fill'), ('line', '_line'), ('arms', '_arms')]}
        for key, image in [('src', padded), ('fill', fill), ('line', line), ('arms', arms)]:
            image.save(ROOT / paths[key], 'WEBP', lossless=True, method=6)
        part = {'id': part_id, 'label': label, **paths, 'w': padded.width, 'h': padded.height,
                'color': '#fffaf0', 'anchors': anchors, 'sourceCell': cell + 1}
        parts.append(part)
        thumb = padded.copy();thumb.thumbnail((290, 290), Image.Resampling.LANCZOS)
        x = (i % 3) * 340 + (340 - thumb.width) // 2
        y = (i // 3) * 340 + (300 - thumb.height) // 2
        contact.paste(thumb, (x, y), thumb)
        draw.text(((i % 3) * 340 + 16, (i // 3) * 340 + 315),
                  f'{part_id} / source cell {cell + 1}', fill='#393128')
        print(part_id, padded.size, 'prop', anchors['prop'])
    (HERE / 'replacements.json').write_text(json.dumps(parts, ensure_ascii=False, indent=2) + '\n')
    contact.save(HERE / 'selected-six.jpg', quality=95)


if __name__ == '__main__': main()
