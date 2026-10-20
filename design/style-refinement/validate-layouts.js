// Reproduce the finite-layout and active quiz-pool checks without a browser.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const context = vm.createContext({ window: {} });
for (const file of ['parts.js', 'engine.js', 'quiz-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const { Creature: C, QUIZ: Q } = context.window;
const errors = [], extent = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
let attachmentLayouts = 0;
function inspect(look, label) {
  for (const layer of C.computeLayout(look)) {
    if (!['x', 'y', 'w', 'h', 'rot', 'ox', 'oy'].every((key) => Number.isFinite(layer[key]))) errors.push(`${label}: invalid ${layer.key}`);
    if (layer.w <= 0 || layer.h <= 0) errors.push(`${label}: empty ${layer.key}`);
    const angle = layer.rot * Math.PI / 180, cx = layer.x + layer.ox, cy = layer.y + layer.oy;
    for (const [x, y] of [[0, 0], [layer.w, 0], [0, layer.h], [layer.w, layer.h]]) {
      const dx = x - layer.ox, dy = y - layer.oy;
      const px = cx + dx * Math.cos(angle) - dy * Math.sin(angle), py = cy + dx * Math.sin(angle) + dy * Math.cos(angle);
      extent.x0 = Math.min(extent.x0, px); extent.y0 = Math.min(extent.y0, py);
      extent.x1 = Math.max(extent.x1, px); extent.y1 = Math.max(extent.y1, py);
    }
  }
}
for (const [cat, pools] of Object.entries(Q.pools)) for (const values of Object.values(pools)) for (const n of values) {
  const id = `${cat}_${String(n).padStart(2, '0')}`;
  if (!C.findPart(cat, id)) errors.push(`Quiz pool references absent ${id}`);
}
for (let seed = 0; seed < 5000; seed++) inspect(C.randomLook(C.rng(seed)), `seed ${seed}`);
for (const body of C.PARTS.body) for (const cat of C.CATS.filter((c) => c.id !== 'body')) for (const part of C.PARTS[cat.id]) {
  inspect({ parts: { body: body.id, [cat.id]: part.id }, bodyColor: C.BODY_COLORS[3], sync: true }, `${body.id}/${part.id}`);
  attachmentLayouts++;
}
const result = { randomLayouts: 5000, attachmentLayouts, quizPools: 'all references exist', rectangularBounds: extent, errors };
fs.writeFileSync(path.join(__dirname, 'layout-validation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
process.exitCode = errors.length ? 1 : 0;
