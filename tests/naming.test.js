const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const context = vm.createContext({ window: {} });
for (const file of ["engine.js", "quiz-data.js", "naming.js"]) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), context);
}
vm.runInContext('Math.random = () => { throw new Error("Names must use their seed"); };', context);
const generate = context.window.CreatureNames.generate;
const profile = { name: "민준", birth: "1998-04-12", code: "ENFP" };

test("same profile and normalized spelling have a stable first nickname", () => {
  assert.equal(generate(profile), generate({ ...profile, name: " 민 준 " }));
  assert.equal(generate(profile), generate({ ...profile, name: "민준".normalize("NFD") }));
  assert.equal(generate({ ...profile, name: "Alex" }), generate({ ...profile, name: "alex" }));
});

test("both given-name syllables are used without borrowing the surname", () => {
  const names = Array.from({ length: 1000 }, (_, variant) => generate({ ...profile, name: "김민준", variant }));
  assert.ok(names.some((name) => name.startsWith("민")));
  assert.ok(names.some((name) => name.startsWith("준")));
  assert.ok(names.every((name) => !name.startsWith("김")));
});

test("reviewed sounds exclude awkward joins and rough personal stems", () => {
  for (const name of ["혁", "석", "국", "빛"]) {
    for (let variant = 0; variant < 100; variant++) {
      assert.ok(!generate({ ...profile, name, variant }).startsWith(name));
    }
  }
  for (const [name, forbidden] of [["모", "모모찌"], ["콩", "콩콩이"], ["아", "아우유"], ["설", "설루루"], ["지", "지방울"]]) {
    for (let variant = 0; variant < 100; variant++) assert.notEqual(generate({ ...profile, name, variant }), forbidden);
  }
});

test("every type and unusual input yields a short Korean nickname", () => {
  const names = new Set();
  for (const code of Object.keys(context.window.QUIZ.types)) {
    for (const name of ["민준", "김지민", "수빈", "유나", "하은", "도윤", "지우", "소율", "나", "Alex", "1234", "🌱", "", "민🌱준", "가나다라마바사아자차"]) {
      for (let variant = 0; variant < 20; variant++) {
        const result = generate({ ...profile, name, code, variant });
        assert.match(result, /^[가-힣]{2,4}$/);
        assert.doesNotMatch(result, /똥|바보|멍청|시발|씨발|병신/);
        names.add(result);
      }
    }
  }
  assert.ok(names.size > 200, `Only ${names.size} distinct nicknames`);
});

test("birth date, personality and reroll counter all contribute to the seed", () => {
  const births = new Set(Array.from({ length: 28 }, (_, day) => generate({ ...profile, birth: `1998-04-${String(day + 1).padStart(2, "0")}` })));
  const types = new Set(Object.keys(context.window.QUIZ.types).map((code) => generate({ ...profile, code })));
  assert.ok(births.size > 8);
  assert.ok(types.size > 5);
});

test("name-only rerolls never immediately repeat", () => {
  let previous = generate(profile);
  for (let variant = 1; variant <= 1000; variant++) {
    const next = generate({ ...profile, variant }, previous);
    assert.notEqual(next, previous);
    assert.equal(next, generate({ ...profile, variant }, previous));
    previous = next;
  }
});

test("personal nicknames keep roughly sixty percent of the mix", () => {
  const names = Array.from({ length: 5000 }, (_, variant) => generate({ ...profile, variant }));
  const personal = names.filter((name) => /^[민준]/.test(name)).length / names.length;
  assert.ok(personal > 0.55 && personal < 0.65, `Personal share: ${personal}`);
});
