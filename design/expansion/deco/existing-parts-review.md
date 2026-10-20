# Existing accessory visual review

Reviewed 84 actual `Creature.computeLayout` compositions: 18 original head
accessories on two body/long-ear combinations, and 16 original backs/tails on
three body silhouettes. Browser lighting and tint are omitted in these geometry
previews. Existing production assets and global JavaScript were not changed.

## Recommended changes

- `deco_06` / 밤 껍질: the plain brown blob does not clearly read as a hat and
  breaks the milky pastel palette. Recommend replacing it with the second
  generated sheet's pink sleep cap. A review-only crop is
  `proposed-deco_06.webp`, with proposed geometry in `proposed-deco_06.json`.
- `back_12` / 거북 등딱지: nearly all of the shell is hidden behind every tested
  body, leaving two green lobes resembling headphones. Recommend a side-facing
  shell design or replacing this accessory. Increasing the centered shell's
  size would make the character's silhouette bulky rather than solving its
  recognition problem.
- `back_13` / 망토: its collar and main shape are hidden, leaving a bright red
  hem beside the feet. Recommend a milky pink color and a side/cape silhouette
  redesign when replacing old back art. Current geometry is not broken.

## Optional refinements

- `back_05` / 악마 꼬리: the thin black arrow is legible and small, but a rounded
  pastel heart tip would better match the “always cute” direction.
- `back_14` / 벌 날개: its broad dark stripes have stronger contrast than the
  rest of the accessories. Softer charcoal and cream-yellow would fit better.
- `back_09`, `back_10`, `back_11`: the full rings intentionally frame the body
  like a flower costume. They do not obscure the face or hands and remain cute
  on round, scalloped, and pear-shaped bodies. Keep their current geometry.

## Keep

All other original head accessories are proportionate at the current
`decoScale: 0.7`. Tall rabbit ears and large fennec ears remain readable behind
the hats; no hat covers the face. Horns intentionally sit over the ear roots.
The original small tails and wings fit all three reviewed body silhouettes.

## Evidence

- `old-deco-body_01.jpg`: all 18 original head accessories with tall rabbit ears.
- `old-deco-body_15.jpg`: all 18 original head accessories with fennec ears.
- `old-back-body_01.jpg`: all 16 original back accessories on the round body.
- `old-back-body_12.jpg`: all 16 originals on the scalloped body.
- `old-back-body_16.jpg`: all 16 originals on the pear-shaped body.
