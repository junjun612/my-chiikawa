(async () => {
  const C = window.Creature, body = C.findPart('body', 'body_25'), original = body.anchors.prop;
  const originalOffsets = body.anchors.propOffsets;
  delete body.anchors.propOffsets;
  const offsets = [[0, 0], [-35, -22], [-39, -24], [-42, -26]];
  const canvas = document.createElement('canvas'); canvas.width = 1400; canvas.height = 400;
  const ctx = canvas.getContext('2d'); ctx.fillStyle = '#edf4e8'; ctx.fillRect(0, 0, 1400, 400);
  const looks = [];
  const base = await C.renderCanvas({ parts: { body: body.id, ears: 'ears_02', face: 'face_01' }, bodyColor: C.BODY_COLORS[3], sync: true }, { size: 512, background: false });
  const pixels = (cv) => cv.getContext('2d').getImageData(0, 0, 512, 512).data;
  const basePixels = pixels(base);
  try {
    for (const [index, [dx, dy]] of offsets.entries()) {
      body.anchors.prop = [original[0] + dx, original[1] + dy, ...original.slice(2)];
      const look = { parts: { body: body.id, ears: 'ears_02', face: 'face_01', prop: 'prop_15' }, bodyColor: C.BODY_COLORS[3], sync: true };
      const art = await C.renderCanvas(look, { size: 512, background: false });
      const arms = body.arms;
      let noHands;
      try { delete body.arms; noHands = await C.renderCanvas(look, { size: 512, background: false }); }
      finally { body.arms = arms; }
      const a = pixels(art), b = pixels(noHands);
      let propArea = 0, covered = 0;
      for (let at = 0; at < a.length; at += 4) {
        if ([0, 1, 2, 3].some((c) => Math.abs(b[at + c] - basePixels[at + c]) > 12)) {
          propArea++;
          if ([0, 1, 2, 3].some((c) => Math.abs(a[at + c] - b[at + c]) > 12)) covered++;
        }
      }
      const overlap = Math.round(covered / propArea * 1000) / 10;
      ctx.drawImage(art, 96, 184, 320, 280, index * 350, 15, 350, 306.25);
      ctx.font = '16px sans-serif'; ctx.fillStyle = '#5a3d30'; ctx.textAlign = 'center';
      ctx.fillText(index ? `왼쪽 ${-dx} · 위 ${-dy}` : '이전 위치', index * 350 + 175, 365);
      ctx.fillText(`소품 가림 ${overlap}%`, index * 350 + 175, 390);
      looks.push({ dx, dy, overlap, prop: body.anchors.prop });
    }
  } finally { body.anchors.prop = original; body.anchors.propOffsets = originalOffsets; }
  const image = new Image(); image.id = 'hand-fit'; image.src = canvas.toDataURL('image/jpeg', .96);
  document.getElementById('pages').append(image);
  document.getElementById('manifest').textContent = JSON.stringify({ looks });
  document.getElementById('status').textContent = '도넛 가장자리 접점 4개 위치 비교';
  document.body.dataset.result = 'pass';
})().catch((e) => { document.getElementById('status').textContent = e.message; document.body.dataset.result = 'fail'; });
