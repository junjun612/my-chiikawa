# Accessory style refinement

Reviewed all 36 head accessories and 32 back accessories at their actual engine
composition sizes against the user's `92b2f4d6` and `fa4fd31d` reference images.
The final catalog keeps 58 existing images, replaces four, and retires six.
The lion mane remains. Large cloud frames were removed after composition review;
small ribbons, hats, flowers, curved tails and rounded wings remain.

## Replacements

- `deco_08`: large ram horns → tiny ivory knot ribbon, `kind: side`.
- `back_05`: black arrow devil tail → small cream curve with a pale pink heart.
- `back_07`: pointed bat wings → tiny rounded lavender wings.
- `back_14`: large black/yellow bee wings → small milky wings with pale blue marks.

`deco-replacements.json` and `back-replacements.json` are category arrays with
complete replacement objects. Replace matching objects by ID, rather than
retaining legacy fields; `deco_08` no longer uses its old `L`/`R` horn geometry.
The authoritative retired IDs are in `../catalog.json`: `back_10`, `back_11`,
`back_12`, `back_30`, `back_31`, `back_32`. Their source files are preserved.
Final composition review also reduces `deco_09` to 65%, `back_08` to 72%, and
`back_17` to 62%, preventing extra-ear silhouettes and portrait clipping.

## Generation and extraction

`prompt-candidates.txt` was generated once with built-in ImageGen, directly
referencing the user's `92b2f4d6` image as the style target. `sheet.png` contains
the 4×4 candidates. Selected cells are 0, 4, 8, 12; other candidates were not
adopted. `extract.py` separates connected components with alpha cleanup before
downsampling. Paired wings are separated by their complete silhouettes, avoiding
cell-center or outer-cell clipping. Original replaced files are in `before/`.

The cream tail shaft and cream wings include matching `fill`/`line` masks and
follow body color. The tail's pink heart, wings' blue marks and lavender wings
keep their drawn colors. Source and mask dimensions match every manifest entry.
The small cream wings include a transparent 20px inner attachment margin so
both rounded lobes are visible outside the body, with all attachment roots
remaining inside their image canvases.

## Verification

`deco-before.jpg` and `back-before.jpg` record the full original audit.
`qa.jpg` shows 24 engine-computed compositions across fluffy/round/tall bodies,
bear/rabbit/cat ears and ivory/mint colors. The QA renderer applies actual color
masks and tints; browser lighting and glow are omitted.

All 16 replacement image/mask files have transparent borders, matching design
sizes and roots inside their canvases. Total size: 129,914 bytes. No global
JavaScript was modified by this work.
