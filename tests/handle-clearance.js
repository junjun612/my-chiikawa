(async () => {
  const C = window.Creature, handles = ['prop_04', 'prop_05', 'prop_11', 'prop_13', 'prop_30'], report = [], errors = [];
  const scratch = document.createElement('canvas'); scratch.width = scratch.height = 256;
  const sx = scratch.getContext('2d', { willReadFrequently: true });
  async function paint(layer) {
    sx.clearRect(0, 0, 256, 256); sx.save(); sx.scale(.5, .5);
    sx.translate(layer.x + layer.ox, layer.y + layer.oy); sx.rotate(layer.rot * Math.PI / 180);
    sx.drawImage(await C.loadImg(layer.img.src), -layer.ox, -layer.oy, layer.w, layer.h); sx.restore();
    return sx.getImageData(0, 0, 256, 256).data;
  }
  for (const [bi, body] of C.PARTS.body.entries()) {
    const faceMasks = [];
    for (const face of C.PARTS.face) {
      const layer = C.computeLayout({ parts: { body: body.id, face: face.id } }).find(l => l.key === 'face');
      const data = await paint(layer), mask = new Uint8Array(65536), ink = new Uint8Array(65536);
      for (let at = 0; at < 65536; at++) if (data[at * 4 + 3] > 100 && Math.max(data[at * 4], data[at * 4 + 1], data[at * 4 + 2]) < 170) {
        ink[at] = 1;
        for (const d of [-256, -1, 0, 1, 256]) if (at + d >= 0 && at + d < mask.length) mask[at + d] = 1;
      }
      faceMasks.push({ id: face.id, mask, ink });
    }
    let canvas, ctx;
    if (bi % 5 === 0) {
      canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = Math.min(5, C.PARTS.body.length - bi) * 250;
      ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff8ea'; ctx.fillRect(0, 0, 1200, 1250);
      window.reviewCanvas = canvas;
    } else { canvas = window.reviewCanvas; ctx = canvas.getContext('2d'); }
    for (const part of C.PARTS.prop) {
      const look = { parts: { body: body.id, face: 'face_19', ears: 'ears_02', prop: part.id }, bodyColor: C.BODY_COLORS[3], sync: true };
      const layout = C.computeLayout(look), layer = layout.find(l => l.key === 'prop');
      const data = await paint(layer), points = [];
      for (let at = 0; at < 65536; at++) if (data[at * 4 + 3] > 100) points.push(at);
      const collisions = faceMasks.map(({id, mask, ink}) => ({face:id, pixels:points.reduce((n, at) => n + mask[at], 0), overlapPixels:points.reduce((n, at) => n + ink[at], 0)})).filter(x => x.pixels >= 2);
      report.push({body:body.id, prop:part.id, collisions});
      if (handles.includes(part.id)) {
        const art = await C.renderCanvas(look, {size:512, background:false});
        const x = handles.indexOf(part.id) * 240, y = bi % 5 * 250;
        ctx.drawImage(art, 104, 176, 320, 292, x, y, 240, 219);
        ctx.fillStyle = '#5a3d30'; ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(`${body.id} · ${part.id}`, x + 120, y + 238);
      }
    }
    document.getElementById('status').textContent = `${bi + 1}/${C.PARTS.body.length} 몸통 · 36소품 × 36표정 간섭 검사`;
    if (bi % 5 === 4 || bi + 1 === C.PARTS.body.length) {
      const im = new Image(); im.id = `page-${Math.floor(bi / 5) + 1}`; im.src = canvas.toDataURL('image/jpeg', .94); document.getElementById('pages').append(im);
    }
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  delete window.reviewCanvas;
  const combinations = C.PARTS.body.length * C.PARTS.prop.length * C.PARTS.face.length;
  const blocked = report.flatMap(({body, prop, collisions}) => collisions.filter(x => x.overlapPixels >= 2).map(x => ({body, prop, ...x})));
  document.getElementById('manifest').textContent = JSON.stringify({ combinations, overlapIsDiagnostic: true, intentionalCentralHoldingAllowed: true, blocked, report, errors });
  document.getElementById('status').textContent = `${combinations.toLocaleString()}개 위치 진단 · 중앙에서 안거나 먹는 겹침은 의도된 표현`;
  document.body.dataset.result = errors.length ? 'fail' : 'pass';
})().catch((e) => {document.getElementById('status').textContent=e.message;document.body.dataset.result='fail';});
