(async () => {
  const attachments = new URLSearchParams(location.search).has('attachments');
  const C = window.Creature, total = attachments ? 6 : 192, manifest = [], errors = [];
  const bgs = Object.keys(C.BG_IMAGES), cols = attachments ? 3 : 6, rows = attachments ? 2 : 8;
  const tile = attachments ? 320 : 200, step = tile + 30, capacity = cols * rows;
  const pages = Array.from({ length: Math.ceil(total / capacity) }, () => {
    const canvas = document.createElement('canvas');canvas.width = cols * tile;canvas.height = rows * step;
    const ctx = canvas.getContext('2d');ctx.fillStyle = '#fff8ea';ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas;
  });
  for (let i = 0; i < total; i++) {
    const look = C.randomLook(C.rng(i * 7919 + 100));
    if (attachments) {
      look.parts = { body: i < 3 ? 'body_01' : 'body_29', ears: ['ears_22', 'ears_30', 'ears_33'][i % 3], face: 'face_19' };
      look.bodyColor = '#ffffff';
    } else if (i < 72) for (const [cat, stride] of [['body', 1], ['ears', 1], ['deco', 5], ['face', 7], ['prop', 11], ['back', 13]]) {
      look.parts[cat] = C.PARTS[cat][i * stride % C.PARTS[cat].length].id;
    }
    const bg = attachments ? 'meadow' : bgs[i % bgs.length], page = Math.floor(i / capacity), at = i % capacity;
    const x = at % cols * tile, y = Math.floor(at / cols) * step, ctx = pages[page].getContext('2d');
    try {
      const art = await C.renderCanvas(look, { size: 384, bg });
      ctx.save();ctx.beginPath();ctx.roundRect(x + 7, y + 5, tile - 14, tile - 14, 16);ctx.clip();
      ctx.drawImage(art, 38.4, 49.5, 307.2, 307.2, x + 7, y + 5, tile - 14, tile - 14);ctx.restore();
    } catch (error) { errors.push({ index: i + 1, parts: look.parts, message: error.message }); }
    ctx.fillStyle = '#5a3d30';ctx.font = '12px sans-serif';ctx.textAlign = 'center';
    const n = (cat) => (look.parts[cat] || 'none').replace(/^[a-z]+_/, '');
    ctx.fillText(`${i + 1}  B${n('body')} E${n('ears')} D${n('deco')}`, x + tile / 2, y + tile + 7);
    ctx.fillText(`F${n('face')} P${n('prop')} K${n('back')} · ${bg}`, x + tile / 2, y + tile + 22);
    manifest.push({ index: i + 1, bg, ...look });
    document.getElementById('status').textContent = `${i + 1}/${total} 렌더 중`;
    if ((i + 1) % capacity === 0 || i + 1 === total) {
      const image = new Image();image.src = pages[page].toDataURL('image/jpeg', .9);image.id = `page-${page + 1}`;
      image.alt = `랜덤 조합 검수 ${page + 1}`;document.getElementById('pages').appendChild(image);
    }
    if (i % 8 === 0) await new Promise((resolve) => setTimeout(resolve, 0));
  }
  document.getElementById('manifest').textContent = JSON.stringify({ total, errors, looks: manifest });
  document.getElementById('status').textContent = `${total}/${total} 완료 · 오류 ${errors.length}`;
  document.body.dataset.result = errors.length ? 'fail' : 'pass';
})();
