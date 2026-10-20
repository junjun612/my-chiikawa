"""Slice the generated 4x4 sheet and derive modular body masks/anchors.

Only deterministic crop/alpha optimization: artwork comes from imagegen.
Run from the repository root with python3 design/expansion/body/process.py.
"""
from pathlib import Path
import json
import cv2
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
OUT = ROOT / 'parts/body'
SRC = Image.open(HERE / 'source-sheet.png').convert('RGBA')
SELECTED = [i for i in range(16) if i != 13]
LABELS = ['동글 우유', '통통 볼살', '몽글 식빵', '말랑 찹쌀', '배동글 모찌',
          '구름 찹쌀', '포근 주먹밥', '하얀 마시멜로', '갸우뚱 모찌', '밀크 푸딩',
          '보송 솜뭉치', '둥근 우유떡', '감자 모찌', '눈송이 모찌', '몽실 우유떡']


def crop_cell(image, cell, margin=24):
    """Read beyond nominal cell lines: generated silhouettes can cross them.

    Largest-component extraction below removes any neighboring sprite fragments.
    Validate the complete subject does not touch the expanded crop boundaries.
    """
    row, col = divmod(cell, 4)
    rect = (max(0, round(col * image.width / 4) - margin),
            max(0, round(row * image.height / 4) - margin),
            min(image.width, round((col + 1) * image.width / 4) + margin),
            min(image.height, round((row + 1) * image.height / 4) + margin))
    result = image.crop(rect)
    a = np.array(result)
    _, labels, stats, _ = cv2.connectedComponentsWithStats((a[:, :, 3] > 15).astype('uint8'), 8)
    x, y, w, h, area = stats[1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])]
    assert min(x, y, result.width - x - w, result.height - y - h) > 2, (cell, rect, x, y, w, h)
    return result


def keep_largest(image):
    a = np.array(image)
    count, labels, stats, _ = cv2.connectedComponentsWithStats((a[:, :, 3] > 15).astype('uint8'), 8)
    component = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    mask = labels == component
    # Include the antialias edge, but drop all unrelated cell fragments.
    mask = cv2.dilate(mask.astype('uint8'), np.ones((3, 3), 'uint8')) != 0
    a[:, :, 3] *= mask
    result = Image.fromarray(a)
    return result.crop(result.getbbox())


def line_and_fill(image):
    p = np.array(image)
    # Extract the black ink with fractional alpha; light ivory becomes tintable fill.
    value = p[:, :, :3].max(axis=2).astype('float32')
    ink = np.clip((244 - value) / (244 - 20), 0, 1)
    ink[value > 232] = 0
    line = np.zeros_like(p)
    line[:, :, :3] = 20
    line[:, :, 3] = np.round(ink * p[:, :, 3]).astype('uint8')
    fill = np.zeros_like(p)
    fill[:, :, :3] = 255
    fill[:, :, 3] = p[:, :, 3]
    return Image.fromarray(line), Image.fromarray(fill)


def hands_and_anchors(image, line):
    p = np.array(image)
    h, w = p.shape[:2]
    solid = (p[:, :, 3] >= 128)
    ink = ((p[:, :, :3].max(axis=2) < 140) & (p[:, :, 3] > 100)).astype('uint8')
    n, labels, stats, centers = cv2.connectedComponentsWithStats(ink, 8)
    candidates = []
    for i in range(1, n):
        x, y = centers[i]
        if (stats[i, cv2.CC_STAT_AREA] > 28 and stats[i, cv2.CC_STAT_WIDTH] < w * .3
                and stats[i, cv2.CC_STAT_HEIGHT] < h * .3
                and w * .19 < x < w * .81 and h * .44 < y < h * .89):
            candidates.append(i)
    candidates = sorted(candidates, key=lambda i: stats[i, cv2.CC_STAT_AREA], reverse=True)[:2]
    assert len(candidates) == 2, (w, h, candidates)
    candidates.sort(key=lambda i: centers[i][0])
    arms = np.zeros_like(p)
    lp = np.array(line)
    for i in candidates:
        cm = cv2.dilate((labels == i).astype('uint8'), np.ones((5, 5), 'uint8')) != 0
        arms[cm] = lp[cm]
    hand_centers = centers[candidates]
    px, py = hand_centers.mean(axis=0)
    gap = float(hand_centers[1][0] - hand_centers[0][0])
    def surface(x):
        x = int(round(x))
        ys = np.nonzero(solid[:, max(0, x - 2):min(w, x + 3)].any(axis=1))[0]
        return float(ys[0]) if len(ys) else h * .1
    ys, xs = np.nonzero(solid)
    top_y = int(ys.min())
    top_xs = np.nonzero(solid[top_y:min(h, top_y + 4)].any(axis=0))[0]
    cx = float(np.median(top_xs))
    # Keep crown centered even when one rounded cheek leans slightly.
    cx = float(np.clip(cx, w * .46, w * .54))
    head_w = w * .82
    left_x, right_x = cx - w * .275, cx + w * .275
    anchors = {
        'top': [round(cx, 2), float(top_y)], 'headW': round(head_w, 2),
        'earL': [round(left_x, 2), round(surface(left_x) + 2, 2), -15.0],
        'earR': [round(right_x, 2), round(surface(right_x) + 2, 2), 15.0],
        'prop': [round(float(px), 2), round(float(py), 2), round(gap * 1.06, 2)],
        'face': [round(float(px), 2), round(h * .46, 2), round(w * .57, 2)],
        'tail': [round(w * .83, 2), round(h * .74, 2)],
        'sideL': [round(w * .17, 2), round(h * .43, 2)],
        'sideR': [round(w * .83, 2), round(h * .43, 2)],
        'center': [round(w / 2, 2), round(h / 2, 2)],
        'H': float(ys.max() - ys.min() + 1), 'W': float(xs.max() - xs.min() + 1),
    }
    return Image.fromarray(arms), anchors


def main():
    parts = []
    preview = Image.new('RGB', (4 * 310, 4 * 340), '#f4f7ec')
    draw = ImageDraw.Draw(preview)
    for no, cell in enumerate(SELECTED):
        sprite = keep_largest(crop_cell(SRC, cell))
        # The source cell is under 384 px. Preserve original pixels; add modest padding.
        padded = Image.new('RGBA', (sprite.width + 8, sprite.height + 8))
        padded.alpha_composite(sprite, (4, 4))
        padded.thumbnail((384, 384), Image.Resampling.LANCZOS)
        line, fill = line_and_fill(padded)
        arms, anchors = hands_and_anchors(padded, line)
        part_id = f'body_{17 + no:02d}'
        if part_id == 'body_21':
            # The pear-shaped crown is narrower than the cheeks: attach ears and
            # hats to that crown rather than the full lower-body width.
            solid = np.array(padded)[:, :, 3] >= 128
            for side, direction in [('earL', -1), ('earR', 1)]:
                x = anchors['top'][0] + direction * padded.width * .22
                xi = round(x)
                ys = np.where(solid[:, xi - 2:xi + 3].any(axis=1))[0]
                anchors[side] = [round(x, 2), float(ys[0] + 2), float(direction * 15)]
            anchors['headW'] = round(padded.width * .7, 2)
        paths = {key: f'parts/body/{part_id}{suffix}.webp'
                 for key, suffix in [('src', ''), ('fill', '_fill'), ('line', '_line'), ('arms', '_arms')]}
        for key, im in [('src', padded), ('fill', fill), ('line', line), ('arms', arms)]:
            im.save(ROOT / paths[key], 'WEBP', lossless=True, method=6)
        parts.append({'id': part_id, 'label': LABELS[no], **paths,
                      'w': padded.width, 'h': padded.height, 'color': '#fff9eb',
                      'anchors': anchors, 'sourceCell': cell + 1})
        bx, by = (no % 4) * 310, (no // 4) * 340
        thumb = padded.copy(); thumb.thumbnail((290, 290), Image.Resampling.LANCZOS)
        preview.paste(thumb, (bx + (310 - thumb.width) // 2, by + (300 - thumb.height) // 2), thumb)
        draw.text((bx + 14, by + 310), f'{part_id}  [sheet cell {cell + 1}]', fill='#372f28')
        print(part_id, padded.size, 'prop', anchors['prop'], 'earL', anchors['earL'])
    (HERE / 'parts.json').write_text(json.dumps(parts, ensure_ascii=False, indent=2) + '\n')
    preview.save(HERE / 'contact-sheet.jpg', quality=95)


if __name__ == '__main__':
    main()
