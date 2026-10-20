const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const context = vm.createContext({ window: {} });
for (const file of ["parts.js", "engine.js"]) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), context);
}
const C = context.window.Creature;

test("random friends always have valid ears across 10000 seeds", () => {
  const seen = new Set();
  for (let seed = 0; seed < 10000; seed++) {
    const look = C.randomLook(C.rng(seed));
    assert.ok(C.findPart("ears", look.parts.ears), `Missing ears for seed ${seed}`);
    seen.add(look.parts.ears);
  }
  assert.equal(seen.size, C.PARTS.ears.length);
});

test("ears remain present when all optional accessories are skipped", () => {
  const look = C.randomLook(() => 0);
  assert.ok(look.parts.ears);
  for (const cat of ["deco", "prop", "back"]) assert.equal(look.parts[cat], null);
});

test("manual customization can still omit ears", () => {
  assert.equal(C.CATS.find((cat) => cat.id === "ears").required, false);
  const parts = { body: C.PARTS.body[0].id, face: C.PARTS.face[0].id, ears: null };
  assert.ok(!C.computeLayout({ parts, bodyColor: C.BODY_COLORS[0] }).some((layer) => layer.cat === "ears"));
});
