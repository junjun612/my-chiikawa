// Creature composition engine shared by the maker (maker.html) and the test (index.html).
// Requires parts.js. Exposes window.Creature.
//
// A "look" describes one character:
//   { parts: {body, ears, deco, face, prop, back}, bodyColor: "#rrggbb" | null, syncEars: bool, syncTail: bool }
// Legacy sync remains the fallback for both categories when individual flags are absent.
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
    faceScale: 1.2, propScale: 1.0, tailScale: 0.8, decoScale: 0.7,
    z: { back: 5, ears: 10, body: 20, deco: 30, blush: 35, face: 40, prop: 50, arms: 55 },
    blush: { spread: 1.7, color: "255,128,150", alpha: 0.42 },
  };
  const LIGHTING_STRENGTH = 0.35;
  const ASSET_VERSION = "20261020-style4";
  const assetUrl = (src) => /[?&]v=/.test(src) ? src : `${src}${src.includes("?") ? "&" : "?"}v=${ASSET_VERSION}`;
  // Illustrated backgrounds (backgrounds/<id>.webp + <id>_thumb.webp).
  const BG_IMAGES = { meadow: "풀밭", dusk: "저녁 들판", sunset: "노을 꽃밭", beach: "바닷가",
    night: "별밤", sakura: "벚꽃", snow: "눈밭", room: "아늑한 방" };
  const bgImage = (b) => assetUrl(`backgrounds/${BG_IMAGES[b] ? b : "meadow"}.webp`);
  // Mix each pastel with 50% white. Keep old URL colors mapped to the softer palette.
  const ORIGINAL_BODY_COLORS = ["#ffffff", "#fffaf0", "#fff4c7", "#e2f5e9", "#dff1fa", "#fbe5ec",
    "#eee5fa", "#ffe9da", "#edf5d9", "#f5edf3", "#e8f6f3"];
  const BODY_COLORS = ORIGINAL_BODY_COLORS.map((color) => "#" + color.slice(1).match(/../g)
    .map((channel) => Math.round((parseInt(channel, 16) + 255) / 2).toString(16).padStart(2, "0")).join(""));
  function resolveBodyColor(color) {
    const index = ORIGINAL_BODY_COLORS.indexOf(color?.toLowerCase());
    return index < 0 ? color : BODY_COLORS[index];
  }
  const SYNC_CATS = { ears: "syncEars", back: "syncTail" }; // individual body-color matching

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
    const heightFactor = Math.min(1.1, Math.max(0.72, Math.sqrt((A.H * S) / REF_H)));
    const U = (LAYOUT.bodyWidth / LAYOUT.sheetBodyW) * heightFactor;
    // A waving arm widens the sprite without widening its head. Head attachments
    // follow the measured head frame instead of the full body's bounding box.
    const headU = (LAYOUT.bodyWidth / LAYOUT.sheetBodyW) * (A.earScale ?? heightFactor);
    const headRotation = A.head?.rotation || 0;
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
        // Floppy ears attach at their upper inner corner instead of the bottom.
        // Their own attachment settings keep the hanging tip and outline visible.
        const hidden = half.sink ?? sink;
        const [dx, dy] = half.offset || [0, 0];
        const headAngle = (cat === "ears" || cat === "deco") ? headRotation : 0;
        const rad = headAngle * Math.PI / 180;
        const offsetX = dx * Math.cos(rad) - dy * Math.sin(rad), offsetY = dx * Math.sin(rad) + dy * Math.cos(rad);
        const rotation = half.rotation != null ? half.rotation + headAngle : deg || 0;
        put(cat + "." + side, cat, part, half, s, half.root[0], half.root[1] - hidden * half.h,
          px + offsetX * s, py + offsetY * s, rotation);
        if (half.z != null) out[out.length - 1].z = half.z;
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
        put("face", "face", part, part, (A.face[2] * S * LAYOUT.faceScale) / FACE_REF,
          part.w / 2, part.h / 2, px, py, A.face[3] || 0);
      } else if (c.id === "ears") {
        pair("ears", part, headU, LAYOUT.earSink, [A.earL, A.earR]);
      } else if (c.id === "prop") {
        const [dx, dy, rotation = 0, scale = 1] = A.propOffsets?.[part.id] || [0, 0];
        const [px, py] = P([A.prop[0] + dx, A.prop[1] + dy]);
        const size = A.prop[2] * S * LAYOUT.propScale * scale;
        // Fit the width to the hands, but keep tall props (wands) from towering over the face.
        const ps = Math.min(size / part.w, (size * 1.25) / part.h);
        // A pose can hold the item at either hand, tilted with the wrist.
        put("prop", "prop", part, part, ps, part.w / 2, part.h / 2, px, py, (A.prop[3] || 0) + rotation);
        // Filled hand cutouts cover the prop, then their ink outlines sit on top.
        if (body.arms) put("arms", "body", body, { src: body.arms, w: body.w, h: body.h }, S, 0, 0, left, top);
      } else if (c.id === "deco") {
        placeDeco(part, put, pair, { A, S, U: headU, H: A.head ? A.head.h * S : H, crown, P, headRotation });
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
      const angle = face.rot * Math.PI / 180, cos = Math.cos(angle), sin = Math.sin(angle);
      face.part.cheeks.forEach(([cx, cy, r], i) => {
        const R = r * k * LAYOUT.blush.spread;
        const dx = cx * k - face.ox, dy = cy * k - face.oy;
        const px = face.x + face.ox + dx * cos - dy * sin, py = face.y + face.oy + dx * sin + dy * cos;
        out.push({ key: "blush." + i, cat: "face", type: "blush", x: px - R, y: py - R * 0.7,
          w: R * 2, h: R * 1.4, ox: R, oy: R * 0.7, rot: face.rot, z: LAYOUT.z.blush });
      });
    }
    return out.sort((p, q) => p.z - q.z);
  }

  function placeDeco(part, put, pair, { A, S, U, H, crown, P, headRotation }) {
    U *= LAYOUT.decoScale;
    const [tx, ty] = crown;
    if (part.kind === "hat") {
      const s = (part.fit * A.headW * S * LAYOUT.decoScale) / part.w;
      put("deco", "deco", part, part, s, part.w / 2, part.h, tx, ty + part.bot * H * LAYOUT.decoScale, headRotation);
    } else if (part.kind === "halo") {
      put("deco", "deco", part, part, U, part.w / 2, part.h, tx, ty - 0.04 * H, headRotation);
    } else if (part.kind === "pair") {
      pair("deco", part, U, 0.12, [A.earL, A.earR]);
    } else if (part.kind === "side") {
      // Between the crown and the right ear spot, leaning outwards.
      const [ex, ey] = P(A.earR);
      put("deco", "deco", part, part, U * 0.85, part.w / 2, part.h * 0.65, tx + (ex - tx) * 0.75, ey + 0.02 * H, 22 + headRotation);
    } else {
      put("deco", "deco", part, part, U, part.w / 2, part.h * (1 - (part.sink ?? 0.25)), tx, ty, headRotation);
    }
  }

  function placeBack(part, put, pair, { A, S, U, P }) {
    if (part.kind === "tail") {
      const [px, py] = P(A.tail);
      put("back", "back", part, part, U * LAYOUT.tailScale * (part.scale ?? 1), part.root[0], part.root[1], px, py);
    } else if (part.kind === "wings") {
      pair("back", part, U * (part.scale ?? 1), 0, [A.sideL, A.sideR]);
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
    else if (SYNC_CATS[cat] && (look[SYNC_CATS[cat]] ?? look.sync) !== false) col = look.bodyColor || body.color;
    return col && col.toLowerCase() !== (img.color || "").toLowerCase() ? col : null;
  }

  const imgCache = new Map();
  function loadImg(src) {
    if (imgCache.has(src)) {
      const cached = imgCache.get(src);
      imgCache.delete(src); imgCache.set(src, cached);
      return cached;
    }
    const pending = new Promise((res, rej) => {
      const im = new Image();
      let retried = false;
      im.decoding = "async";
      im.onload = () => res(im);
      im.onerror = () => {
        if (!retried) {
          retried = true;
          const url = assetUrl(src);
          im.src = `${url}${url.includes("?") ? "&" : "?"}retry=1`;
          return;
        }
        if (imgCache.get(src) === pending) imgCache.delete(src);
        rej(new Error(`Image unavailable: ${src}`));
      };
      im.src = assetUrl(src);
    });
    if (imgCache.size >= 96) imgCache.delete(imgCache.keys().next().value);
    imgCache.set(src, pending);
    return pending;
  }

  // Body and ears are drawn into a canvas: optional recolor (fill mask painted with the
  // color, line layer on top) plus soft mochi shading (warm shade toward the bottom and rim).
  // Canvas display also works under file://.
  const canvasCache = new Map();
  function layerCanvas(img, col, shade) {
    const key = img.src + "|" + col + "|" + shade;
    if (canvasCache.has(key)) return canvasCache.get(key);
    const cv = document.createElement("canvas");
    if (canvasCache.size >= 96) canvasCache.delete(canvasCache.keys().next().value);
    canvasCache.set(key, cv);
    const coat = col && img.tintRegion === "coat";
    const srcs = col && !coat ? [img.fill, img.line] : [img.src];
    cv.ready = Promise.all(srcs.map(loadImg)).then((ims) => {
      // Metadata stays in original design coordinates; raster assets are at most 384px.
      const w = cv.width = ims[0].naturalWidth, h = cv.height = ims[0].naturalHeight;
      const ctx = cv.getContext("2d");
      if (coat) {
        // The raccoon ear masks selected different regions on each side. Select
        // the brown coat consistently and retain the white inner-ear accents.
        ctx.drawImage(ims[0], 0, 0, w, h);
        const image = ctx.getImageData(0, 0, w, h), target = rgb(col);
        for (let i = 0; i < image.data.length; i += 4) {
          const [r, g, b, a] = image.data.subarray(i, i + 4);
          if (a && r > 90 && b < 215 && r - b > 10 && r >= g && g >= b) {
            image.data[i] = target[0]; image.data[i + 1] = target[1]; image.data[i + 2] = target[2];
          }
        }
        ctx.putImageData(image, 0, 0);
      } else if (col) {
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
    }).catch((error) => {
      if (canvasCache.get(key) === cv) canvasCache.delete(key);
      throw error;
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
    g.addColorStop(1, `rgba(222,184,174,${0.45 * LIGHTING_STRENGTH})`);
    t.fillStyle = g; t.fillRect(0, 0, w, h);
    g = t.createLinearGradient(0, h * 0.55, 0, h);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(1, `rgba(226,190,178,${0.35 * LIGHTING_STRENGTH})`);
    t.fillStyle = g; t.fillRect(0, 0, w, h);
    t.globalCompositeOperation = "destination-in";
    t.drawImage(cv, 0, 0);
    ctx.globalCompositeOperation = "multiply";
    ctx.drawImage(tmp, 0, 0);
    ctx.globalCompositeOperation = "source-over";
  }

  const SHADED = (l) => l.key === "body" || l.cat === "ears";

  const handMasks = new Map();
  function convexHull(points) {
    points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const half = (list) => {
      const out = [];
      for (const point of list) {
        while (out.length > 1 && cross(out[out.length - 2], out[out.length - 1], point) <= 0) out.pop();
        out.push(point);
      }
      return out;
    };
    return [...half(points).slice(0, -1), ...half(points.slice().reverse()).slice(0, -1)];
  }

  function handsOverProp(arms, bodyImage) {
    let mask = handMasks.get(arms.src);
    if (!mask) {
      const stroke = document.createElement("canvas");
      const w = stroke.width = arms.naturalWidth, h = stroke.height = arms.naturalHeight;
      const ctx = stroke.getContext("2d");
      ctx.drawImage(arms, 0, 0);
      const pixels = ctx.getImageData(0, 0, w, h), points = [[], []];
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4, value = Math.max(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]);
        // Remove the pale matte baked around the extracted arm strokes.
        pixels.data[i + 3] *= Math.max(0, Math.min(1, (220 - value) / 100));
        if (pixels.data[i + 3] > 80) points[x < w / 2 ? 0 : 1].push([x, y]);
      }
      ctx.putImageData(pixels, 0, 0);
      mask = { stroke, hulls: points.filter((p) => p.length > 2).map(convexHull) };
      handMasks.set(arms.src, mask);
    }
    const out = document.createElement("canvas");
    out.width = arms.naturalWidth; out.height = arms.naturalHeight;
    const ctx = out.getContext("2d");
    ctx.save();
    ctx.beginPath();
    for (const hull of mask.hulls) {
      ctx.moveTo(...hull[0]);
      for (const point of hull.slice(1)) ctx.lineTo(...point);
      ctx.closePath();
    }
    ctx.clip();
    // Use the actual recolored/shaded body pixels, so the hands match the body.
    ctx.drawImage(bodyImage, 0, 0, out.width, out.height);
    ctx.restore();
    ctx.drawImage(mask.stroke, 0, 0);
    return out;
  }

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
  const rgb = (hex) => hex.slice(1).match(/../g).map((h) => parseInt(h, 16));
  const groundGradient = (bg) => {
    const [c, opacity] = lightOf(bg).shadow;
    return [`rgba(${rgb(c)},${(opacity * 1.35 * LIGHTING_STRENGTH).toFixed(3)})`, `rgba(${rgb(c)},0)`];
  };

  // Canvas pixels and native shadows work in Safari too. Both the preview and export
  // use this path, without CSS/SVG filters or CanvasRenderingContext2D.filter.
  function lightCharacter(source, bg) {
    const size = source.width, scale = size / LAYOUT.stageSize;
    const ctx = source.getContext("2d");
    const pixels = ctx.getImageData(0, 0, size, size);
    const data = pixels.data;
    const alpha = new Uint8Array(size * size);
    for (let i = 0; i < alpha.length; i++) alpha[i] = data[i * 4 + 3];
    const L = lightOf(bg), rimColor = rgb(L.rim[0]);
    const norm = Math.hypot(...L.light) || 1;
    const ux = L.light[0] / norm, uy = L.light[1] / norm;
    const dx = Math.round(ux * 5 * scale), dy = Math.round(uy * 5 * scale);
    const ink = [0.27, 0.18, 0.15];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const at = y * size + x, i = at * 4;
        if (!alpha[at]) continue;
        const nx = x + dx, ny = y + dy;
        const neighbor = nx >= 0 && nx < size && ny >= 0 && ny < size ? alpha[ny * size + nx] / 255 : 0;
        // Preserve ink outlines while catching the inner edge facing the light.
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / (3 * 255);
        const rim = (1 - neighbor) * L.rim[1] * brightness;
        for (let c = 0; c < 3; c++) {
          const original = data[i + c];
          const toned = (ink[c] * 255 + (1 - ink[c]) * original) * L.tint[c];
          const lit = toned * (1 - rim) + rimColor[c] * rim;
          data[i + c] = original + (lit - original) * LIGHTING_STRENGTH;
        }
      }
    }
    ctx.putImageData(pixels, 0, 0);
    const out = document.createElement("canvas");
    out.width = out.height = size;
    const target = out.getContext("2d");
    target.shadowColor = `rgba(${rgb(L.shadow[0])},${L.shadow[1] * LIGHTING_STRENGTH})`;
    target.shadowBlur = 2.2 * scale;
    target.shadowOffsetX = -ux * 2.5 * scale;
    target.shadowOffsetY = 5.5 * scale;
    target.drawImage(source, 0, 0);
    return out;
  }

  async function renderCharacter(layers, size, bg, isCurrent) {
    const scale = size / LAYOUT.stageSize;
    // Resolve every layer first, so a render never shows half-loaded parts.
    const images = await Promise.all(layers.map((l) => l.type === "blush" ? null :
      l.tint || SHADED(l) ? layerCanvas(l.img, l.tint, SHADED(l)).ready : loadImg(l.img.src)));
    if (isCurrent && !isCurrent()) return null;
    const bodyImage = images[layers.findIndex((l) => l.key === "body")];
    const off = document.createElement("canvas");
    off.width = off.height = size;
    const ctx = off.getContext("2d");
    layers.forEach((l, i) => {
      ctx.save();
      if (l.type === "blush") {
        const { color, alpha } = LAYOUT.blush;
        const radius = l.w / 2 * scale;
        ctx.globalCompositeOperation = "multiply";
        ctx.translate((l.x + l.w / 2) * scale, (l.y + l.h / 2) * scale);
        ctx.rotate(l.rot * Math.PI / 180);
        ctx.scale(1, l.h / l.w);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        g.addColorStop(0, `rgba(${color},${alpha})`);
        g.addColorStop(0.55, `rgba(${color},${alpha * 0.4})`);
        g.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
      } else {
        ctx.translate((l.x + l.ox) * scale, (l.y + l.oy) * scale);
        ctx.rotate(l.rot * Math.PI / 180);
        const image = l.key === "arms" ? handsOverProp(images[i], bodyImage) : images[i];
        ctx.drawImage(image, -l.ox * scale, -l.oy * scale, l.w * scale, l.h * scale);
      }
      ctx.restore();
    });
    return lightCharacter(off, bg);
  }

  // Export and live preview share the same character renderer and scene lighting.
  async function renderCanvas(look, { size = 1024, bg = "meadow", background = true, adjust } = {}) {
    const cv = document.createElement("canvas");
    cv.width = cv.height = size;
    const ctx = cv.getContext("2d"), scale = size / LAYOUT.stageSize;
    const [character, scene] = await Promise.all([
      renderCharacter(computeLayout(look, adjust), size, bg),
      background ? loadImg(bgImage(bg)) : null,
    ]);
    if (scene) ctx.drawImage(scene, 0, 0, size, size);
    const radius = LAYOUT.bodyWidth * 0.42 * scale;
    ctx.save();
    ctx.translate(LAYOUT.bodyCenterX * scale, (LAYOUT.bodyBottomY + 1) * scale);
    ctx.scale(1, 13 / (LAYOUT.bodyWidth * 0.42));
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    const [g0, g1] = groundGradient(bg);
    g.addColorStop(0, g0); g.addColorStop(1, g1);
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = g; ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
    ctx.restore();
    ctx.drawImage(character, 0, 0);
    return cv;
  }

  // Keep the breathing/pop animation on one composited canvas. Editing uses outline
  // overlays in original layout coordinates, independent of the raster resolution.
  function mountStage(stage, { adjust, isActive } = {}) {
    const ground = Object.assign(document.createElement("div"), { className: "ground" });
    const chara = Object.assign(document.createElement("div"), { className: "chara" });
    const squish = Object.assign(document.createElement("div"), { className: "squish" });
    const canvas = Object.assign(document.createElement("canvas"), { className: "character-art", width: 1024, height: 1024 });
    canvas.setAttribute("aria-hidden", "true");
    squish.appendChild(canvas);
    chara.appendChild(squish);
    stage.append(ground, chara);
    stage.style.setProperty("--foot-x", LAYOUT.bodyCenterX + "px");
    stage.style.setProperty("--foot-y", LAYOUT.bodyBottomY + "px");
    Object.assign(ground.style, {
      left: LAYOUT.bodyCenterX - LAYOUT.bodyWidth * 0.42 + "px", top: LAYOUT.bodyBottomY - 12 + "px",
      width: LAYOUT.bodyWidth * 0.84 + "px", height: "26px",
    });
    let scene = "meadow", revision = 0;
    async function render(look) {
      const ticket = ++revision, layers = computeLayout(look, adjust);
      stage.dataset.render = "pending";
      squish.querySelectorAll(".active").forEach((el) => el.remove());
      if (isActive) for (const l of layers.filter(isActive)) {
        const outline = Object.assign(document.createElement("div"), { className: "active" });
        Object.assign(outline.style, {
          position: "absolute", pointerEvents: "none", left: l.x + "px", top: l.y + "px",
          width: l.w + "px", height: l.h + "px", transformOrigin: `${l.ox}px ${l.oy}px`,
          transform: l.rot ? `rotate(${l.rot}deg)` : "",
        });
        squish.appendChild(outline);
      }
      try {
        const art = await renderCharacter(layers, canvas.width, scene, () => ticket === revision);
        if (ticket !== revision) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(art, 0, 0);
        stage.dataset.render = "ready";
      } catch (error) {
        if (ticket === revision) stage.dataset.render = "error";
        console.error(error);
      }
    }
    function pop() {
      squish.classList.remove("pop");
      void squish.offsetWidth;
      squish.classList.add("pop");
    }
    function setScene(bg) {
      scene = bg;
      const [g0, g1] = groundGradient(bg);
      ground.style.background = `radial-gradient(closest-side, ${g0}, ${g1})`;
    }
    setScene("meadow");
    return { render, pop, setScene };
  }

  // Warm the HTTP cache in four lanes without retaining every decoded sprite in
  // memory. The larger catalog stays light on mobile; visible images decode on demand.
  let preloadPromise;
  function preloadAssets() {
    if (preloadPromise) return preloadPromise;
    const sources = new Set(Object.keys(BG_IMAGES).flatMap((id) => [bgImage(id), `backgrounds/${id}_thumb.webp`]));
    function collect(value) {
      if (!value || typeof value !== "object") return;
      for (const [key, item] of Object.entries(value)) {
        if (["src", "fill", "line", "arms"].includes(key) && typeof item === "string") sources.add(item);
        else if (typeof item === "object") collect(item);
      }
    }
    collect(PARTS);
    const queue = [...sources];
    preloadPromise = Promise.all(Array.from({ length: 4 }, async () => {
      while (queue.length) {
        const src = queue.shift();
        try {
          const response = await fetch(assetUrl(src), { cache: "force-cache" });
          if (!response.ok) throw new Error(`Image unavailable: ${src}`);
          await response.arrayBuffer();
        } catch (error) { console.warn(error.message); }
      }
    }));
    return preloadPromise;
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

  // Generated friends always have ears; the maker can still remove them manually.
  // `rand` defaults to Math.random.
  function randomLook(rand = Math.random) {
    const pick = (list) => list[Math.floor(rand() * list.length)];
    const parts = {};
    for (const c of CATS) {
      const list = PARTS[c.id] || [];
      parts[c.id] = !list.length || (!c.required && c.id !== "ears" && rand() < 0.3) ? null : pick(list).id;
    }
    return { parts, bodyColor: pick(BODY_COLORS), sync: true };
  }

  window.Creature = {
    LAYOUT, BG_IMAGES, BODY_COLORS, resolveBodyColor, CATS, PARTS, bgImage, findPart, computeLayout,
    LIGHTS, LIGHTING_STRENGTH, assetUrl, loadImg, renderCanvas, mountStage, preloadAssets, randomLook, hashString, rng,
  };
})();
