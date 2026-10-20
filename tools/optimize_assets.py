"""Convert original PNG/JPEG assets to web-sized WebP; geometry stays in design pixels.

Run after adding original images: python3 tools/optimize_assets.py
Requires Pillow. Originals are removed only after the replacement is verified.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def convert(source, bounds, *, lossless=False, quality=86):
    target = source.with_suffix('.webp')
    with Image.open(source) as image:
        image = image.convert('RGBA' if lossless else 'RGB')
        image.thumbnail(bounds, Image.Resampling.LANCZOS)
        image.save(target, 'WEBP', lossless=lossless, quality=quality, method=6)
        size = image.size
    with Image.open(target) as check:
        check.load()
        assert check.size == size
    before, after = source.stat().st_size, target.stat().st_size
    source.unlink()
    return before, after


def main():
    before = after = count = 0
    for source in sorted((ROOT / 'parts').rglob('*.png')):
        old, new = convert(source, (384, 384), lossless=True)
        before += old; after += new; count += 1
    for source in sorted((ROOT / 'backgrounds').glob('*.jpg')):
        bounds = (80, 80) if source.stem.endswith('_thumb') else (768, 768)
        old, new = convert(source, bounds)
        before += old; after += new; count += 1
    source = ROOT / 'design/page_bg.jpg'
    if source.exists():
        old, new = convert(source, (720, 1280))
        before += old; after += new; count += 1
    # Part coordinates intentionally describe original design dimensions. Resized
    # images are fitted to those coordinates by the renderer.
    data = ROOT / 'parts.js'
    data.write_text(data.read_text().replace('.png"', '.webp"'))
    print(f'{count} images: {before:,} -> {after:,} bytes ({(1-after/before)*100:.1f}% smaller)' if before else 'Images already optimized.')


if __name__ == '__main__':
    main()
