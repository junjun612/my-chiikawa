(async () => {
  const C = window.Creature, report = [], errors = [];
  const baseline = await (await fetch('design/style-refinement/before-catalog.json')).json();
  await document.fonts.load('16px "MJ Body"');
  const groups = [
    ['body-comparison', '몸통', 'body', ['body_17', 'body_19', 'body_20', 'body_21', 'body_23', 'body_24', 'body_25', 'body_28', 'body_30']],
    ['detail-comparison', '귀·표정·장식', null, ['ears_13', 'ears_14', ...Array.from({ length: 18 }, (_, i) => `face_${i + 19}`), 'deco_08', 'deco_09', 'back_05', 'back_07', 'back_08', 'back_14', 'back_17']],
  ];
  async function render(cat, id, before) {
    const parts = { body: 'body_01', ears: 'ears_02', face: 'face_01', [cat]: id };
    if (cat === 'body') parts.prop = 'prop_15';
    const list = C.PARTS[cat], index = list.findIndex((p) => p.id === id), original = list[index];
    if (before) {
      const old = baseline[cat].find((p) => p.id === id);
      if (index < 0) list.push(old); else list[index] = old;
    }
    try { return await C.renderCanvas({ parts, bodyColor: '#ffffff', sync: true }, { size: 512, bg: 'meadow', background: false }); }
    finally {
      if (before) { if (index < 0) list.pop(); else list[index] = original; }
    }
  }
  function bounds(art) {
    const { data } = art.getContext('2d').getImageData(0, 0, 512, 512);
    let x0 = 512, y0 = 512, x1 = 0, y1 = 0;
    for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) if (data[(y * 512 + x) * 4 + 3] > 40) {
      x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
    }
    return [x0, y0, x1, y1];
  }
  for (const [pageId, title, category, ids] of groups) {
    const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = Math.ceil(ids.length / 3) * 300;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff8ea'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const [at, id] of ids.entries()) {
      const cat = category || id.split('_')[0], x = at % 3 * 400, y = Math.floor(at / 3) * 300;
      try {
        const old = await render(cat, id, true), current = await render(cat, id, false);
        const a = bounds(old), b = bounds(current);
        const box = [Math.min(a[0], b[0]) - 12, Math.min(a[1], b[1]) - 12, Math.max(a[2], b[2]) + 12, Math.max(a[3], b[3]) + 12];
        const bw = box[2] - box[0], bh = box[3] - box[1], scale = Math.min(180 / bw, 224 / bh);
        ctx.fillStyle = '#5a3d30'; ctx.font = '16px "MJ Body"'; ctx.textAlign = 'center';
        ctx.fillText(`${id} · ${C.findPart(cat, id).label}`, x + 200, y + 24);
        for (const [i, art] of [old, current].entries()) {
          const left = x + i * 200 + 100 - bw * scale / 2, top = y + 35 + (224 - bh * scale) / 2;
          ctx.drawImage(art, box[0], box[1], bw, bh, left, top, bw * scale, bh * scale);
          ctx.fillStyle = i ? '#43846b' : '#9a8071'; ctx.fillText(i ? '수정' : '이전', x + i * 200 + 100, y + 284);
        }
        report.push({ cat, id, beforeLabel: baseline[cat].find((p) => p.id === id).label, afterLabel: C.findPart(cat, id).label });
      } catch (error) { errors.push({ id, message: error.message }); }
    }
    const image = new Image(); image.id = pageId; image.alt = `${title} 변경 전후`; image.src = canvas.toDataURL('image/jpeg', .94);
    document.getElementById('pages').append(image);
  }
  const gripCanvas = document.createElement('canvas'); gripCanvas.width = 1200; gripCanvas.height = 1320;
  const gripCtx = gripCanvas.getContext('2d'); gripCtx.fillStyle = '#fff8ea'; gripCtx.fillRect(0, 0, 1200, 1320);
  let gripTests = 0;
  for (const body of groups[0][3]) for (const prop of ['prop_04', 'prop_09', 'prop_15', 'prop_31']) {
    const at = gripTests++, x = at % 6 * 200, y = Math.floor(at / 6) * 220;
    try {
      const art = await C.renderCanvas({ parts: { body, ears: 'ears_02', face: 'face_01', prop }, bodyColor: C.BODY_COLORS[3], sync: true },
        { size: 512, bg: 'meadow', background: false });
      const box = bounds(art), bw = box[2] - box[0] + 16, bh = box[3] - box[1] + 16, scale = Math.min(184 / bw, 190 / bh);
      gripCtx.drawImage(art, box[0] - 8, box[1] - 8, bw, bh, x + (200 - bw * scale) / 2, y + (190 - bh * scale) / 2, bw * scale, bh * scale);
      gripCtx.font = '13px "MJ Body"'; gripCtx.textAlign = 'center'; gripCtx.fillStyle = '#5a3d30';
      gripCtx.fillText(`${body} · ${prop}`, x + 100, y + 210);
    } catch (error) { errors.push({ body, prop, message: error.message }); }
  }
  const grips = new Image(); grips.id = 'grip-comparison'; grips.alt = '새 자세 9종의 한 손·두 손 소품 검수';
  grips.src = gripCanvas.toDataURL('image/jpeg', .94); document.getElementById('pages').append(grips);
  const directionBefore = await (await fetch('design/style-refinement/body/raised-hand-before/parts.json')).json();
  const directionCanvas = document.createElement('canvas'); directionCanvas.width = 1200; directionCanvas.height = 1800;
  const dc = directionCanvas.getContext('2d'); dc.fillStyle = '#fffaf1'; dc.fillRect(0, 0, 1200, 1800);
  let directionTests = 0;
  for (const [row, original] of directionBefore.entries()) for (const [pi, prop] of ['prop_15', 'prop_36'].entries()) {
    const index = C.PARTS.body.findIndex((p) => p.id === original.id), current = C.PARTS.body[index];
    const old = JSON.parse(JSON.stringify(original));
    for (const key of ['src', 'fill', 'line', 'arms']) if (old[key]) old[key] = `design/style-refinement/body/raised-hand-before/${old[key].split('/').pop()}`;
    for (const [version, part] of [old, current].entries()) {
      try {
        C.PARTS.body[index] = part;
        const art = await C.renderCanvas({ parts: { body: part.id, ears: 'ears_02', face: 'face_19', prop }, bodyColor: C.BODY_COLORS[3], sync: true }, { size: 512, background: false });
        const x = (pi * 2 + version) * 300, y = row * 300;
        dc.drawImage(art, 76, 130, 360, 360, x + 10, y, 280, 280);
        dc.font = '15px "MJ Body"'; dc.fillStyle = '#5a3d30'; dc.textAlign = 'center';
        dc.fillText(`${part.id} · ${prop} · ${version ? '뻗은 손' : '이전'}`, x + 150, y + 290);
        directionTests++;
      } catch (error) { errors.push({ body: part.id, prop, message: error.message }); }
      finally { C.PARTS.body[index] = current; }
    }
  }
  const directionImage = new Image(); directionImage.id = 'hand-direction-comparison'; directionImage.alt = '왼쪽·오른쪽으로 뻗은 손 소품 변경 전후';
  directionImage.src = directionCanvas.toDataURL('image/jpeg', .94); document.getElementById('pages').append(directionImage);
  const finalCanvas = document.createElement('canvas'); finalCanvas.width = 1200; finalCanvas.height = 800;
  const fc = finalCanvas.getContext('2d'); fc.fillStyle = '#fffaf1'; fc.fillRect(0, 0, 1200, 800);
  const finalLooks = [
    ['body_27', 'face_09', 'prop_18'], ['body_17', 'face_19', 'prop_36'],
    ['body_19', 'face_19', 'prop_36'], ['body_21', 'face_19', 'prop_36'],
    ['body_24', 'face_19', 'prop_36'], ['body_25', 'face_19', 'prop_15'],
    ['body_28', 'face_19', 'prop_36'], ['body_30', 'face_19', 'prop_36'],
  ];
  for (const [index, [body, face, prop]] of finalLooks.entries()) {
    const art = await C.renderCanvas({ parts: { body, face, prop, ears: 'ears_02' }, bodyColor: C.BODY_COLORS[3], sync: true }, { size: 512, background: false });
    const x = index % 4 * 300, y = Math.floor(index / 4) * 400;
    fc.drawImage(art, 76, 130, 360, 360, x, y + 25, 300, 300);
    fc.font = '17px "MJ Body"'; fc.fillStyle = '#5a3d30'; fc.textAlign = 'center';
    fc.fillText(index === 0 ? '두 손으로 중앙에서 안기' : `${body} · 뻗은 손으로 들기`, x + 150, y + 365);
  }
  const finalImage = new Image(); finalImage.id = 'final-look-preview'; finalImage.alt = '중앙 양손 자세 보존과 왼쪽·오른쪽으로 뻗은 일곱 한손 자세';
  finalImage.src = finalCanvas.toDataURL('image/png'); document.getElementById('pages').append(finalImage);
  document.getElementById('manifest').textContent = JSON.stringify({ report, gripTests, directionTests, errors });
  document.getElementById('status').textContent = `${report.length}종 전후 비교 · 소품 ${gripTests}조합 · 손 방향 ${directionTests}조합 · 오류 ${errors.length}`;
  document.body.dataset.result = errors.length ? 'fail' : 'pass';
})().catch((error) => { document.getElementById('status').textContent = error.message; document.body.dataset.result = 'fail'; });
