// Creature composition engine shared by the maker (maker.html) and the test (index.html).
// Requires parts.js. Exposes window.Creature.
//
// A "look" describes one character:
//   { parts: {body, ears, deco, face, prop, back}, bodyColor: "#rrggbb" | null, sync: bool }
(() => {
  // Stage geometry (512 logical px). The body is scaled to bodyWidth; every other part is
  // placed on the body's anchors (computed per body by tools/slice_sheets.py).
  const LAYOUT = {
    stageSize: 512,
    bodyWidth: 190,
    bodyCenterX: 256,
    bodyBottomY: 440,
    sheetBodyW: 313,   // body width the 3x3 part sheets were drawn for
    earSink: 0.36,     // fraction of ear height hidden behind the head
    faceScale: 1.2, propScale: 1.0, tailScale: 0.8,
    z: { back: 5, ears: 10, body: 20, deco: 30, blush: 35, face: 40, prop: 50, arms: 55 },
    blush: { spread: 1.7, color: "255,128,150", alpha: 0.42 },
  };
  // Illustrated backgrounds (backgrounds/<id>.jpg + <id>_thumb.jpg).
  const BG_IMAGES = { meadow: "풀밭", dusk: "저녁 들판", sunset: "노을 꽃밭", beach: "바닷가",
    night: "별밤", sakura: "벚꽃", snow: "눈밭", room: "아늑한 방" };
  const bgImage = (b) => `backgrounds/${BG_IMAGES[b] ? b : "meadow"}.jpg`;
  // Natural animal-like tones: whites, creams, browns, grays and one soft pink.
  const BODY_COLORS = ["#ffffff", "#fff8ec", "#fbefd9", "#f3e2c7", "#ead2b0", "#d9b48f", "#b98c6a",
    "#8f6a52", "#ece8e3", "#cfc9c2", "#f9e4de"];
  const SYNC_CATS = ["ears", "back"]; // follow the body color when sync is on

  const CATS = window.PART_CATEGORIES || [];
  const PARTS = window.PARTS || {};
  const median = (xs) => { const v = xs.slice().sort((a, b) => a - b); return v[v.length >> 1] || 1; };
  const FACE_REF = median((PARTS.face || []).map((p) => p.w));
  const REF_H = median((PARTS.body || []).map((b) => (b.anchors.H * LAYOUT.bodyWidth) / b.w));

  const findPart = (cat, id) => (PARTS[cat] || []).find((p) => p.id === id) || null;
  const noAdjust = (id) => Object.assign({ dx: 0, dy: 0, s: 1 }, (window.PART_ADJUST || {})[id]);

  // Layout in 512 logical px: [{key, cat, part, img, x, y, w, h, rot, ox, oy, z, tint}].
  // (ox, oy) is the rotation origin relative to the layer's top-left.
  function computeLayout(look, getAdjust = noAdjust) {
    const body = findPart("body", look.parts.body);
    if (!body) return [];
    const A = body.anchors;
    const S = LAYOUT.bodyWidth / body.w;
    const left = LAYOUT.bodyCenterX - LAYOUT.bodyWidth / 2;
    const top = LAYOUT.bodyBottomY - body.h * S;
    const P = (pt) => [left + pt[0] * S, top + pt[1] * S];
    // Attachments shrink a little on low/flat bodies so ears and tails do not dwarf them.
    const U = (LAYOUT.bodyWidth / LAYOUT.sheetBodyW) * Math.min(1.1, Math.max(0.72, Math.sqrt((A.H * S) / REF_H)));
    const H = A.H * S, crown = P(A.top);
    const out = [];

    // Place `img` scaled by s so that its pixel (rx, ry) lands on stage point (px, py).
    const put = (key, cat, part, img, s, rx, ry, px, py, rot = 0) => {
      out.push({ key, cat, part, img, w: img.w * s, h: img.h * s, x: px - rx * s, y: py - ry * s,
        ox: rx * s, oy: ry * s, rot, z: LAYOUT.z[key] ?? LAYOUT.z[cat], tint: tintFor(look, cat, img, body) });
    };
    const pair = (cat, part, s, sink, anchors) => {
      ["L", "R"].forEach((side, i) => {
        const half = part[side];
        if (!half) return;
        const [ax, ay, deg] = anchors[i];
        const [px, py] = P([ax, ay]);
        put(cat + "." + side, cat, part, half, s, half.root[0], half.root[1] - sink * half.h, px, py, deg || 0);
      });
    };

    for (const c of CATS) {
      const part = findPart(c.id, look.parts[c.id]);
      if (!part) continue;
      const first = out.length;
      if (c.id === "body") {
        put("body", "body", part, part, S, 0, 0, left, top);
      } else if (c.id === "face") {
        const [px, py] = P(A.face);
        put("face", "face", part, part, (A.face[2] * S * LAYOUT.faceScale) / FACE_REF, part.w / 2, part.h / 2, px, py);
      } else if (c.id === "ears") {
        pair("ears", part, U, LAYOUT.earSink, [A.earL, A.earR]);
      } else if (c.id === "prop") {
        const [px, py] = P(A.prop);
        const size = A.prop[2] * S * LAYOUT.propScale;
        // Fit the width to the hands, but keep tall props (wands) from towering over the face.
        const ps = Math.min(size / part.w, (size * 1.25) / part.h);
        put("prop", "prop", part, part, ps, part.w / 2, part.h / 2, px, py);
        // Redraw the arm strokes above the prop so the hands hold it.
        if (body.arms) put("arms", "body", body, { src: body.arms, w: body.w, h: body.h }, S, 0, 0, left, top);
      } else if (c.id === "deco") {
        placeDeco(part, put, pair, { A, S, U, H, crown, P });
      } else if (c.id === "back") {
        placeBack(part, put, pair, { A, S, U, P });
      }
      // Manual adjustment (maker edit mode) applies to every layer of the part.
      const adj = getAdjust(part.id);
      for (const l of out.slice(first)) {
        if (l.key === "arms") continue;
        const cx = l.x + l.w / 2, cy = l.y + l.h / 2;
        l.w *= adj.s; l.h *= adj.s; l.ox *= adj.s; l.oy *= adj.s;
        l.x = cx - l.w / 2 + adj.dx; l.y = cy - l.h / 2 + adj.dy;
      }
    }
    // Soft blush glow under the drawn cheeks, so the cheeks melt into the body.
    const face = out.find((l) => l.key === "face");
    if (face && face.part.cheeks) {
      const k = face.w / face.part.w;
      face.part.cheeks.forEach(([cx, cy, r], i) => {
        const R = r * k * LAYOUT.blush.spread;
        out.push({ key: "blush." + i, cat: "face", type: "blush", x: face.x + cx * k - R, y: face.y + cy * k - R * 0.7,
          w: R * 2, h: R * 1.4, ox: 0, oy: 0, rot: 0, z: LAYOUT.z.blush });
      });
    }
    return out.sort((p, q) => p.z - q.z);
  }

  function placeDeco(part, put, pair, { A, S, U, H, crown, P }) {
    const [tx, ty] = crown;
    if (part.kind === "hat") {
      const s = (part.fit * A.headW * S) / part.w;
      put("deco", "deco", part, part, s, part.w / 2, part.h, tx, ty + part.bot * H);
    } else if (part.kind === "halo") {
      put("deco", "deco", part, part, U, part.w / 2, part.h, tx, ty - 0.04 * H);
    } else if (part.kind === "pair") {
      pair("deco", part, U, 0.12, [A.earL, A.earR]);
    } else if (part.kind === "side") {
      // Between the crown and the right ear spot, leaning outwards.
      const [ex, ey] = P(A.earR);
      put("deco", "deco", part, part, U * 0.85, part.w / 2, part.h * 0.65, tx + (ex - tx) * 0.75, ey + 0.02 * H, 22);
    } else {
      put("deco", "deco", part, part, U, part.w / 2, part.h * (1 - (part.sink ?? 0.25)), tx, ty);
    }
  }

  function placeBack(part, put, pair, { A, S, U, P }) {
    if (part.kind === "tail") {
      const [px, py] = P(A.tail);
      put("back", "back", part, part, U * LAYOUT.tailScale, part.root[0], part.root[1], px, py);
    } else if (part.kind === "wings") {
      pair("back", part, U, 0, [A.sideL, A.sideR]);
    } else {
      const s = ((part.fit || 1.3) * A.W * S) / part.w;
      const [px, py] = P([A.center[0], A.top[1] + (part.fy ?? 0.45) * A.H]);
      put("back", "back", part, part, s, part.w / 2, part.h / 2, px, py);
    }
  }

  // Target fill color for a layer image, or null to show it unchanged.
  function tintFor(look, cat, img, body) {
    if (!img.fill) return null;
    let col = null;
    if (cat === "body") col = look.bodyColor;
    else if (look.sync !== false && SYNC_CATS.includes(cat)) col = look.bodyColor || body.color;
    return col && col.toLowerCase() !== (img.color || "").toLowerCase() ? col : null;
  }

  const imgCache = {};
  function loadImg(src) {
    return imgCache[src] || (imgCache[src] = new Promise((res, rej) => {
      const im = new Image();
      im.onload = () => res(im); im.onerror = rej; im.src = src;
    }));
  }

  // Body and ears are drawn into a canvas: optional recolor (fill mask painted with the
  // color, line layer on top) plus soft mochi shading (warm shade toward the bottom and rim).
  // Canvas display also works under file://.
  const canvasCache = {};
  function layerCanvas(img, col, shade) {
    const key = img.src + "|" + col + "|" + shade;
    if (canvasCache[key]) return canvasCache[key];
    const cv = canvasCache[key] = document.createElement("canvas");
    const { w, h } = img;
    cv.width = w; cv.height = h;
    const srcs = col ? [img.fill, img.line] : [img.src];
    cv.ready = Promise.all(srcs.map(loadImg)).then((ims) => {
      const ctx = cv.getContext("2d");
      if (col) {
        ctx.drawImage(ims[0], 0, 0, w, h);
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = col;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(ims[1], 0, 0, w, h);
      } else {
        ctx.drawImage(ims[0], 0, 0, w, h);
      }
      if (shade) shadeCanvas(ctx, cv, w, h);
      return cv;
    });
    return cv;
  }

  function shadeCanvas(ctx, cv, w, h) {
    const m = Math.max(w, h);
    const tmp = document.createElement("canvas");
    tmp.width = w; tmp.height = h;
    const t = tmp.getContext("2d");
    // Warm shade toward the bottom and the rim, multiplied over everything.
    let g = t.createRadialGradient(w * 0.45, h * 0.38, m * 0.2, w * 0.5, h * 0.45, m * 0.62);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(1, "rgba(222,184,174,0.45)");
    t.fillStyle = g; t.fillRect(0, 0, w, h);
    g = t.createLinearGradient(0, h * 0.55, 0, h);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(1, "rgba(226,190,178,0.35)");
    t.fillStyle = g; t.fillRect(0, 0, w, h);
    t.globalCompositeOperation = "destination-in";
    t.drawImage(cv, 0, 0);
    ctx.globalCompositeOperation = "multiply";
    ctx.drawImage(tmp, 0, 0);
    ctx.globalCompositeOperation = "source-over";
  }

  const SHADED = (l) => l.key === "body" || l.cat === "ears";
  const blushGradient = () => {
    const { color, alpha } = LAYOUT.blush;
    return `radial-gradient(closest-side, rgba(${color},${alpha}), rgba(${color},${alpha * 0.4}) 55%, rgba(${color},0))`;
  };

  // Scene lighting per background, like anime color grading:
  //   tint  - ambient color multiplied over the character (1 = unchanged)
  //   rim   - rim-light color/alpha on the outline facing the light
  //   light - direction the light comes from ([x, y], -1..1)
  //   shadow- cast/ground shadow color and opacity
  const LIGHTS = {
    meadow: { tint: [1, 1, 0.98], rim: ["#fffbe8", 0.35], light: [-1, -1], shadow: ["#3d4a3a", 0.22] },
    sakura: { tint: [1, 0.97, 0.98], rim: ["#ffe6ef", 0.45], light: [-1, -1], shadow: ["#5a4050", 0.2] },
    beach:  { tint: [1, 0.99, 0.95], rim: ["#ffffff", 0.5], light: [1, -1], shadow: ["#6a5a40", 0.24] },
    snow:   { tint: [0.95, 0.98, 1.0], rim: ["#e8f6ff", 0.55], light: [-1, -1], shadow: ["#4a6080", 0.2] },
    sunset: { tint: [1, 0.9, 0.8], rim: ["#ffb070", 0.8], light: [0.6, -1], shadow: ["#6a3a30", 0.28] },
    dusk:   { tint: [0.8, 0.86, 0.89], rim: ["#bfe6ee", 0.45], light: [-0.6, -1], shadow: ["#14242a", 0.34] },
    night:  { tint: [0.78, 0.81, 0.95], rim: ["#d4e0ff", 0.75], light: [1, -0.8], shadow: ["#101830", 0.36] },
    room:   { tint: [1, 0.95, 0.88], rim: ["#fff0d0", 0.5], light: [-1, -0.8], shadow: ["#5a4030", 0.24] },
  };
  const lightOf = (bg) => LIGHTS[bg] || LIGHTS.meadow;
  const filterId = (bg, k) => `manga-${LIGHTS[bg] ? bg : "meadow"}${k === 1 ? "" : `-${k}x`}`;

  // SVG filter shared by the DOM stage and canvas rendering: warm brown ink, softened lines,
  // the scene's ambient tint, a rim light toward the light and a shadow cast away from it.
  // k scales the radii.
  function mangaFilter(id, k, L) {
    const [lx, ly] = L.light;
    const n = Math.hypot(lx, ly) || 1;
    const ux = lx / n, uy = ly / n;
    const [tr, tg, tb] = L.tint;
    return `<filter id="${id}" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
      <feComponentTransfer in="SourceGraphic" result="ink">
        <feFuncR type="table" tableValues="0.27 1"/><feFuncG type="table" tableValues="0.18 1"/><feFuncB type="table" tableValues="0.15 1"/>
      </feComponentTransfer>
      <feComponentTransfer in="ink" result="lit">
        <feFuncR type="linear" slope="${tr}"/><feFuncG type="linear" slope="${tg}"/><feFuncB type="linear" slope="${tb}"/>
      </feComponentTransfer>
      <feGaussianBlur in="lit" stdDeviation="${0.35 * k}" result="soft"/>
      <feMorphology in="SourceAlpha" operator="erode" radius="${4.5 * k}" result="inner"/>
      <feOffset in="inner" dx="${-ux * 7 * k}" dy="${-uy * 7 * k}" result="away"/>
      <feComposite in="inner" in2="away" operator="out" result="edge"/>
      <feGaussianBlur in="edge" stdDeviation="${2 * k}" result="edgeSoft"/>
      <feComposite in="edgeSoft" in2="inner" operator="in" result="edgeIn"/>
      <feFlood flood-color="${L.rim[0]}" flood-opacity="${L.rim[1]}"/>
      <feComposite in2="edgeIn" operator="in" result="rim"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="${2.2 * k}" result="blur"/>
      <feOffset in="blur" dx="${-ux * 2.5 * k}" dy="${5.5 * k}" result="off"/>
      <feFlood flood-color="${L.shadow[0]}" flood-opacity="${L.shadow[1]}"/>
      <feComposite in2="off" operator="in" result="shadow"/>
      <feMerge><feMergeNode in="shadow"/><feMergeNode in="soft"/><feMergeNode in="rim"/></feMerge>
    </filter>`;
  }
  const FILTER_SCALES = [1, 2];
  function installFilters() {
    if (document.getElementById("manga-meadow")) return;
    const defs = Object.keys(LIGHTS).flatMap((bg) => FILTER_SCALES.map((k) => mangaFilter(filterId(bg, k), k, LIGHTS[bg]))).join("");
    document.body.insertAdjacentHTML("beforeend",
      `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${defs}</svg>`);
  }
  const groundGradient = (bg, a = 1) => {
    const [c, o] = lightOf(bg).shadow;
    const hex = c.slice(1).match(/../g).map((h) => parseInt(h, 16)).join(",");
    return [`rgba(${hex},${(o * 1.35 * a).toFixed(3)})`, `rgba(${hex},0)`];
  };

  // Render a look (+ optional background and ground shadow) to a square canvas.
  // size 1024 matches the "manga2x" filter; other sizes use the nearest filter.
  async function renderCanvas(look, { size = 1024, bg = "meadow", background = true, adjust } = {}) {
    installFilters();
    const S = size / LAYOUT.stageSize;
    const cv = document.createElement("canvas");
    cv.width = cv.height = size;
    const ctx = cv.getContext("2d");
    if (background) ctx.drawImage(await loadImg(bgImage(bg)), 0, 0, size, size);
    // Ground shadow
    const gr = LAYOUT.bodyWidth * 0.42 * S;
    ctx.save();
    ctx.translate(LAYOUT.bodyCenterX * S, (LAYOUT.bodyBottomY + 1) * S);
    ctx.scale(1, 13 / (LAYOUT.bodyWidth * 0.42));
    let g = ctx.createRadialGradient(0, 0, 0, 0, 0, gr);
    const [g0, g1] = groundGradient(bg);
    g.addColorStop(0, g0); g.addColorStop(1, g1);
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = g; ctx.fillRect(-gr, -gr, gr * 2, gr * 2);
    ctx.restore();

    const off = document.createElement("canvas");
    off.width = off.height = size;
    const oc = off.getContext("2d");
    for (const l of computeLayout(look, adjust)) {
      oc.save();
      if (l.type === "blush") {
        const { color, alpha } = LAYOUT.blush;
        const rx = (l.w / 2) * S;
        oc.globalCompositeOperation = "multiply";
        oc.translate((l.x + l.w / 2) * S, (l.y + l.h / 2) * S);
        oc.scale(1, l.h / l.w);
        g = oc.createRadialGradient(0, 0, 0, 0, 0, rx);
        g.addColorStop(0, `rgba(${color},${alpha})`); g.addColorStop(0.55, `rgba(${color},${alpha * 0.4})`);
        g.addColorStop(1, `rgba(${color},0)`);
        oc.fillStyle = g; oc.fillRect(-rx, -rx, rx * 2, rx * 2);
      } else {
        const src = l.tint || SHADED(l) ? await layerCanvas(l.img, l.tint, SHADED(l)).ready : await loadImg(l.img.src);
        oc.translate((l.x + l.ox) * S, (l.y + l.oy) * S);
        oc.rotate((l.rot * Math.PI) / 180);
        oc.drawImage(src, -l.ox * S, -l.oy * S, l.w * S, l.h * S);
      }
      oc.restore();
    }
    const k = FILTER_SCALES.reduce((a, b) => (Math.abs(b - S) < Math.abs(a - S) ? b : a));
    ctx.filter = `url(#${filterId(bg, k)})`;
    ctx.drawImage(off, 0, 0);
    ctx.filter = "none";
    return cv;
  }

  // Live DOM stage (512 logical px, scale it with CSS): ground shadow + character group with
  // the manga filter, idle breathing and a "boing" pop. Returns { render(look), pop(), layers }.
  function mountStage(stage, { adjust, isActive } = {}) {
    installFilters();
    const ground = Object.assign(document.createElement("div"), { className: "ground" });
    const chara = Object.assign(document.createElement("div"), { className: "chara" });
    const squish = Object.assign(document.createElement("div"), { className: "squish" });
    chara.appendChild(squish);
    stage.append(ground, chara);
    stage.style.setProperty("--foot-x", LAYOUT.bodyCenterX + "px");
    stage.style.setProperty("--foot-y", LAYOUT.bodyBottomY + "px");
    Object.assign(ground.style, {
      left: LAYOUT.bodyCenterX - LAYOUT.bodyWidth * 0.42 + "px", top: LAYOUT.bodyBottomY - 12 + "px",
      width: LAYOUT.bodyWidth * 0.84 + "px", height: "26px",
    });

    const els = {};
    function render(look) {
      const seen = new Set();
      for (const l of computeLayout(look, adjust)) {
        seen.add(l.key);
        let want = null;
        if (l.type === "blush") want = "DIV";
        else if (l.tint || SHADED(l)) want = layerCanvas(l.img, l.tint, SHADED(l));
        let el = els[l.key];
        const ok = el && (want === "DIV" ? el.tagName === "DIV" : want ? el === want : el.tagName === "IMG");
        if (el && !ok) { el.remove(); el = null; }
        if (!el) {
          if (want === "DIV") el = Object.assign(document.createElement("div"), { className: "blush" });
          else el = want || Object.assign(document.createElement("img"), { alt: "", draggable: false });
          els[l.key] = el;
          squish.appendChild(el);
        }
        if (want === "DIV") el.style.background = blushGradient();
        else if (!want && el.dataset.src !== l.img.src) { el.src = l.img.src; el.dataset.src = l.img.src; }
        Object.assign(el.style, {
          left: l.x + "px", top: l.y + "px", width: l.w + "px", height: l.h + "px", zIndex: l.z,
          transformOrigin: `${l.ox}px ${l.oy}px`, transform: l.rot ? `rotate(${l.rot}deg)` : "",
        });
        if (isActive) el.classList.toggle("active", isActive(l));
      }
      for (const k in els) if (!seen.has(k)) { els[k].remove(); delete els[k]; }
    }
    function pop() {
      squish.classList.remove("pop");
      void squish.offsetWidth;
      squish.classList.add("pop");
    }
    // Apply a background's lighting to the character and its ground shadow.
    function setScene(bg) {
      chara.style.filter = `url(#${filterId(bg, 1)})`;
      const [g0, g1] = groundGradient(bg);
      ground.style.background = `radial-gradient(closest-side, ${g0}, ${g1})`;
    }
    setScene("meadow");
    return { render, pop, setScene };
  }

  // Deterministic PRNG (mulberry32) and string hash, for seeded characters.
  function hashString(s) {
    let h = 1779033703 ^ s.length;
    for (let i = 0; i < s.length; i++) {
      h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return h >>> 0;
  }
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // A random look; `rand` defaults to Math.random.
  function randomLook(rand = Math.random) {
    const pick = (list) => list[Math.floor(rand() * list.length)];
    const parts = {};
    for (const c of CATS) {
      const list = PARTS[c.id] || [];
      parts[c.id] = !list.length || (!c.required && rand() < 0.3) ? null : pick(list).id;
    }
    return { parts, bodyColor: rand() < 0.5 ? null : pick(BODY_COLORS), sync: true };
  }

  window.Creature = {
    LAYOUT, BG_IMAGES, BODY_COLORS, CATS, PARTS, bgImage, findPart, computeLayout,
    LIGHTS, loadImg, renderCanvas, mountStage, installFilters, randomLook, hashString, rng,
  };
})();
