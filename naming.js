// Short, seeded nicknames. Requires engine.js; it never consumes the look's RNG.
(() => {
  const { hashString, rng } = window.Creature;
  const endings = [
    ["콩이", "SF"], ["몽이", "IN"], ["뭉이", "IP"], ["솜이", "IF"],
    ["뽀", "EF"], ["모찌", "FP"], ["두부", "IS"], ["푸딩", "SF"],
    ["젤리", "EP"], ["토리", "TJ"], ["방울", "EN"], ["루루", "NP"],
    ["포포", "EF"], ["보리", "SJ"], ["누리", "NF"], ["쿠키", "ES"],
  ];
  // Each prefix has a reviewed set of companions rather than every possible noun.
  const moods = [
    ["반짝", "EN", ["콩", "별", "방울", "모찌"]],
    ["통통", "E", ["콩", "모찌", "두부", "토리"]],
    ["소곤", "I", ["콩", "솜", "모찌", "방울"]],
    ["포근", "IF", ["콩", "솜", "모찌", "두부"]],
    ["몽실", "NF", ["콩", "솜", "모찌", "구름"]],
    ["보송", "F", ["콩", "솜", "모찌", "구름"]],
    ["또박", "J", ["콩", "토리", "모찌"]],
    ["말랑", "P", ["콩", "뭉", "모찌", "두부", "푸딩"]],
    ["도란", "F", ["콩", "솜", "방울", "토리"]],
    ["씩씩", "T", ["콩", "토리", "모찌"]],
    ["꼬물", "I", ["콩", "모찌", "두부"]],
    ["별빛", "N", ["콩", "모찌", "방울"]],
    ["새록", "S", ["콩", "토리", "모찌"]],
  ];
  const specials = [
    ["콩알대장", "ET"], ["낮잠요정", "IP"], ["구름찹쌀", "NF"], ["우유방울", "F"],
    ["별사탕", "N"], ["달빛모찌", "IN"], ["햇살푸딩", "EF"], ["복숭뽀", "F"],
    ["도토리왕", "SJ"], ["솜사탕", "F"], ["반달두부", "IN"], ["꽃잎모찌", "SF"],
    ["뽀짝대장", "ET"], ["포켓구름", "N"], ["꼬마박사", "NT"], ["주먹콩이", "ST"],
    ["구름요정", "NF"], ["소풍대장", "EP"], ["밤톨요정", "IF"], ["우유구름", "F"],
    ["감자대장", "ST"], ["새싹요정", "SF"], ["찹쌀대장", "TJ"], ["달콩요정", "NF"],
  ];
  const unsuitable = /똥|바보|멍청|시발|씨발|병신|지방/;
  const softFinals = new Set([0, 4, 8, 16, 21]); // no coda, ㄴ, ㄹ, ㅁ, ㅇ
  const normalize = (name) => String(name || "").normalize("NFC").replace(/\s+/gu, "").toLowerCase();

  function suitable(parts) {
    const name = parts.join("");
    if (!/^[가-힣]{2,4}$/.test(name) || unsuitable.test(name) || /(.)\1\1/u.test(name)) return false;
    return parts.every((part, index) => parts.slice(index + 1).every((other) =>
      !part.includes(other) && !other.includes(part) && part.at(-1) !== other[0]));
  }

  function basesFor(name) {
    // Use the last two Korean syllables so a full name does not become 김모찌.
    const syllables = [...normalize(name)].filter((ch) => /[가-힣]/.test(ch)).slice(-2);
    return [...new Set(syllables)].filter((ch) => softFinals.has((ch.charCodeAt(0) - 0xac00) % 28));
  }

  const affinity = (letters, code) => [...letters].filter((letter) => code.includes(letter)).length;
  function candidates(name, code, previous) {
    const personal = [], mood = [], special = [];
    const add = (list, parts, weight) => {
      const text = parts.join("");
      if (text !== previous && text !== normalize(name) && suitable(parts)) list.push({ text, weight });
    };
    for (const base of basesFor(name)) {
      const final = (base.charCodeAt(0) - 0xac00) % 28;
      for (const [ending, letters] of endings) {
        const initial = Math.floor((ending.charCodeAt(0) - 0xac00) / 588);
        // Avoid vowel piles (아우유) and a run of liquids (설루루).
        if ((!final && initial === 11) || (final === 8 && initial === 5)) continue;
        add(personal, [base, ending], 1 + affinity(letters, code));
      }
    }
    for (const [prefix, letters, companions] of moods) {
      const matches = affinity(letters, code);
      if (matches) for (const companion of companions) add(mood, [prefix, companion], matches);
    }
    for (const [text, letters] of specials) {
      const matches = affinity(letters, code);
      if (matches) add(special, [text], matches);
    }
    return [
      { weight: 60, choices: personal },
      { weight: 30, choices: mood },
      { weight: 10, choices: special },
    ].filter((family) => family.choices.length);
  }

  function pick(list, random) {
    let remaining = random() * list.reduce((sum, item) => sum + item.weight, 0);
    for (const item of list) {
      remaining -= item.weight;
      if (remaining < 0) return item;
    }
    return list[list.length - 1];
  }

  function generate({ name, birth, code, variant = 0 }, previous = "") {
    const normalized = normalize(name);
    const type = /^[EI][SN][TF][JP]$/.test(code) ? code : "INFP";
    const seed = JSON.stringify(["nickname-v2", normalized, birth, type, variant]);
    const random = rng(hashString(seed));
    const families = candidates(normalized, type, previous);
    return pick(pick(families, random).choices, random).text;
  }

  window.CreatureNames = { generate };
})();
