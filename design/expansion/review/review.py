"""Contact-sheet QA for old body/ear shapes using engine-equivalent geometry."""
from pathlib import Path
import json
import math
import cv2
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
text = (ROOT / 'parts.js').read_text()
PARTS = json.JSONDecoder().raw_decode(text.split('window.PARTS = ', 1)[1])[0]
NEW = json.loads((ROOT / 'design/expansion/body/parts.json').read_text())
MED_FACE = sorted(p['w'] for p in PARTS['face'])[len(PARTS['face']) // 2]
REF_H = sorted(p['anchors']['H'] * 190 / p['w'] for p in PARTS['body'])[len(PARTS['body']) // 2]
SIZE = 340


def rgba(src):
    return Image.open(ROOT / src).convert('RGBA')


def tinted(part, color):
    if not color or not part.get('fill'):
        return rgba(part['src'])
    if part.get('tintRegion') == 'coat':
        a = np.array(rgba(part['src'])); r, g, b, al = [a[:, :, i] for i in range(4)]
        mask = (al > 0) & (r > 90) & (b < 215) & (r.astype(int) - b > 10) & (r >= g) & (g >= b)
        target = tuple(bytes.fromhex(color.lstrip('#')))
        a[mask, :3] = target
        return Image.fromarray(a)
    fill = rgba(part['fill'])
    col = Image.new('RGBA', fill.size, color)
    col.putalpha(fill.getchannel('A'))
    col.alpha_composite(rgba(part['line']))
    return col


def render(body, ears, face, prop, color=None):
    scene = Image.new('RGBA', (SIZE, 310))
    A = body['anchors']; S = 190 / body['w']
    left, top = 75, 290 - body['h'] * S
    U = 190 / 313 * min(1.1, max(.72, math.sqrt((A['H'] * S) / REF_H)))
    def P(pt): return left + pt[0] * S, top + pt[1] * S
    def put(im, w, h, rx, ry, px, py, deg=0):
        ang = math.radians(deg); c, s = math.cos(ang), math.sin(ang)
        # Natural source pixels -> logical image -> rotated stage coordinates.
        sx, sy = w / im.width, h / im.height
        mat = np.array([[c * sx, -s * sy, px - c * rx + s * ry],
                        [s * sx, c * sy, py - s * rx - c * ry]], dtype='float32')
        warped = cv2.warpAffine(np.array(im), mat, (SIZE, 310), flags=cv2.INTER_CUBIC)
        scene.alpha_composite(Image.fromarray(warped))
    for side, pt in [('L', A['earL']), ('R', A['earR'])]:
        if side not in ears: continue
        part = ears[side]; px, py = P(pt)
        put(tinted(part, color or body['color']), part['w'] * U, part['h'] * U,
            part['root'][0] * U, (part['root'][1] - .36 * part['h']) * U, px, py, pt[2])
    body_image = tinted(body, color)
    put(body_image, body['w'] * S, body['h'] * S, 0, 0, left, top)
    k = A['face'][2] * S * 1.2 / MED_FACE;px, py = P(A['face'])
    put(rgba(face['src']), face['w'] * k, face['h'] * k, face['w'] * k / 2, face['h'] * k / 2, px, py)
    px, py = P(A['prop']); size = A['prop'][2] * S
    k = min(size / prop['w'], size * 1.25 / prop['h'])
    put(rgba(prop['src']), prop['w'] * k, prop['h'] * k, prop['w'] * k / 2, prop['h'] * k / 2, px, py)
    if body.get('arms'):
        a = np.array(rgba(body['arms'])); h, w = a.shape[:2]
        value = a[:, :, :3].max(axis=2)
        a[:, :, 3] = np.round(a[:, :, 3] * np.clip((220 - value.astype(float)) / 100, 0, 1)).astype('uint8')
        mask = np.zeros((h, w), dtype='uint8')
        for lo, hi in [(0, w // 2), (w // 2, w)]:
            ys, xs = np.where(a[:, lo:hi, 3] > 80)
            if len(xs) > 2:
                cv2.fillConvexPoly(mask, cv2.convexHull(np.stack([xs + lo, ys], axis=1).astype('int32')), 255)
        hand = body_image.resize((w, h), Image.Resampling.LANCZOS)
        hand_a = np.array(hand); hand_a[:, :, 3] = np.minimum(hand_a[:, :, 3], mask)
        hand = Image.fromarray(hand_a); hand.alpha_composite(Image.fromarray(a))
        put(hand, body['w'] * S, body['h'] * S, 0, 0, left, top)
    return scene


def sheet(name, entries, cols):
    canvas = Image.new('RGB', (SIZE * cols, 340 * math.ceil(len(entries) / cols)), '#ecf2e8')
    draw = ImageDraw.Draw(canvas)
    for i, (caption, scene) in enumerate(entries):
        x, y = (i % cols) * SIZE, (i // cols) * 340
        canvas.paste(scene, (x, y), scene)
        draw.text((x + 12, y + 315), caption, fill='#483b30')
    canvas.save(HERE / name, quality=95)


def main():
    face, prop = PARTS['face'][0], PARTS['prop'][14]
    # All old ears on the same new smooth body: isolates ear shape/scale.
    sheet('existing-ears-on-new-body.jpg', [(e['id'], render(NEW[0], e, face, prop, '#e2f5e9'))
          for e in PARTS['ears']], 6)
    # Each old body in its original art plus a representative pastel recolor.
    entries = []
    for color in [None, '#e2f5e9']:
        for b in PARTS['body']:
            entries.append((b['id'] + (' original' if color is None else ' mint'),
                            render(b, PARTS['ears'][1], face, prop, color)))
    sheet('existing-bodies-composed.jpg', entries, 5)
    # Difficult old ears against new body's varying crown shapes.
    entries = []
    for b in [NEW[0], NEW[2], NEW[4], NEW[8], NEW[10], NEW[14]]:
        for ear_index in [2, 8, 11, 12, 13, 15]:
            e = PARTS['ears'][ear_index]
            entries.append((b['id'] + ' + ' + e['id'], render(b, e, face, prop, '#dff1fa')))
    sheet('new-body-stress-ears.jpg', entries, 6)


if __name__ == '__main__':
    main()
