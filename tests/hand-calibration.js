(async () => {
  const C = window.Creature, offsets = {}, report = [], errors = [];
  const replay = new URLSearchParams(location.search).has('review');
  const ids = ['body_17', 'body_19', 'body_20', 'body_21', 'body_23', 'body_24', 'body_25', 'body_28', 'body_30'];
  // Thin handles should sit inside the palm; broad items rest against a corner.
  const handles = { prop_04: [.3, .82], prop_05: [.5, .88], prop_06: [.5, .82], prop_11: [.42, .88], prop_13: [.27, .84], prop_16: [.35, .8], prop_30: [.5, .84] };
  const pixels = (cv) => cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
  const changed = (a, b, i) => Math.abs(a[i] - b[i]) > 12 || Math.abs(a[i + 1] - b[i + 1]) > 12 || Math.abs(a[i + 2] - b[i + 2]) > 12 || Math.abs(a[i + 3] - b[i + 3]) > 12;
  let completed = 0;
  for (const id of ids) {
    const body = C.findPart('body', id), A = body.anchors, saved = A.propOffsets;
    const look = { parts: { body: id, ears: 'ears_02', face: 'face_19' }, bodyColor: C.BODY_COLORS[3], sync: true };
    const basePixels = pixels(await C.renderCanvas(look, { size: 256, background: false }));
    const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 1320;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff8ea'; ctx.fillRect(0, 0, 1200, 1320);
    A.propOffsets = {}; offsets[id] = {};
    const grip = body.gripRegions[0], gx = (grip[0] + grip[2]) / 2, gy = (grip[1] + grip[3]) / 2;
    const dir = gx < A.center[0] ? -1 : 1;
    async function measure(part, offset) {
      A.propOffsets[part.id] = offset;
      look.parts.prop = part.id;
      const art = await C.renderCanvas(look, { size: 256, background: false });
      const arms = body.arms; let noHands;
      try { delete body.arms; noHands = await C.renderCanvas(look, { size: 256, background: false }); }
      finally { body.arms = arms; }
      const a = pixels(art), b = pixels(noHands); let area = 0, covered = 0;
      for (let at = 0; at < a.length; at += 4) if (changed(b, basePixels, at)) {
        area++; if (changed(a, b, at)) covered++;
      }
      return { offset, overlap: area ? covered / area : 0, area };
    }
    try {
      for (const [at, part] of C.PARTS.prop.entries()) {
        let best;
        if (replay) best = await measure(part, saved?.[part.id] || [0, 0]);
        else if (body.gripCount === 2) best = await measure(part, [0, 0]);
        // Keep the reviewed raised-left-hand pose as the reference. Recalibrate
        // the other six poses after moving their grip to the outstretched paw.
        else if (id === 'body_25') best = await measure(part, saved?.[part.id] || (part.id === 'prop_15' ? [-39, -24] : [0, 0]));
        else {
          const scale = Math.min(A.prop[2] / part.w, A.prop[2] * 1.25 / part.h);
          const width = part.w * scale, height = part.h * scale, handle = handles[part.id];
          const candidates = [];
          if (handle) {
            const angle = (A.prop[3] || 0) * Math.PI / 180, x = (handle[0] - .5) * width, y = (handle[1] - .5) * height;
            const dx = gx - (x * Math.cos(angle) - y * Math.sin(angle)) - A.prop[0];
            const dy = gy - (x * Math.sin(angle) + y * Math.cos(angle)) - A.prop[1];
            for (const adjust of [-8, -4, 0, 4, 8]) candidates.push([dx + dir * adjust, dy - adjust * .35]);
          } else {
            for (let step = 0; step <= A.prop[2] * 1.05; step += 4) candidates.push([dir * step, -step * .62]);
          }
          for (const candidate of candidates) {
            const offset = candidate.map((v) => Math.round(v * 100) / 100), current = await measure(part, offset);
            if (!best || Math.abs(current.overlap - .1) < Math.abs(best.overlap - .1)) best = current;
          }
        }
        A.propOffsets[part.id] = best.offset;
        if (body.gripCount === 1) offsets[id][part.id] = best.offset;
        const art = await C.renderCanvas(look, { size: 512, background: false });
        const data = pixels(art); let x0 = 512, y0 = 512, x1 = 0, y1 = 0;
        for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) if (data[(y * 512 + x) * 4 + 3] > 40) {
          x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
        }
        const bw = x1 - x0 + 16, bh = y1 - y0 + 16, s = Math.min(184 / bw, 190 / bh), x = at % 6 * 200, y = Math.floor(at / 6) * 220;
        ctx.drawImage(art, x0 - 8, y0 - 8, bw, bh, x + (200 - bw * s) / 2, y + (190 - bh * s) / 2, bw * s, bh * s);
        ctx.font = '12px sans-serif'; ctx.fillStyle = '#5a3d30'; ctx.textAlign = 'center';
        ctx.fillText(`${id} · ${part.id} · ${(best.overlap * 100).toFixed(1)}%`, x + 100, y + 210);
        report.push({ body: id, prop: part.id, gripCount: body.gripCount, ...best });
        document.getElementById('status').textContent = `${++completed}/324 소품 접점 검수 중`;
        if (at % 6 === 0) await new Promise((resolve) => setTimeout(resolve, 0));
      }
    } catch (error) { errors.push({ id, message: error.message }); }
    finally { A.propOffsets = saved; }
    const image = new Image(); image.id = id; image.src = canvas.toDataURL('image/jpeg', .94); document.getElementById('pages').append(image);
  }
  document.getElementById('manifest').textContent = JSON.stringify({ offsets, report, errors });
  document.getElementById('status').textContent = `${completed}개 손·소품 조합 검수 · 오류 ${errors.length}`;
  document.body.dataset.result = errors.length ? 'fail' : 'pass';
})().catch((e) => { document.getElementById('status').textContent = e.message; document.body.dataset.result = 'fail'; });
