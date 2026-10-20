// Paint the result's description, tags and color using their actual CSS layout.
(() => {
  function paintText(ctx, node, origin) {
    const style = getComputedStyle(node.parentElement);
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    ctx.fillStyle = style.color;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    const range = document.createRange();
    let offset = 0, line = null;
    const flush = () => {
      if (!line) return;
      const metrics = ctx.measureText(line.text);
      const ascent = metrics.fontBoundingBoxAscent ?? metrics.actualBoundingBoxAscent;
      const descent = metrics.fontBoundingBoxDescent ?? metrics.actualBoundingBoxDescent;
      const baseline = line.y + (line.height - ascent - descent) / 2 + ascent;
      ctx.fillText(line.text, line.x - origin.x, baseline - origin.y);
    };
    for (const character of node.textContent) {
      range.setStart(node, offset);
      offset += character.length;
      range.setEnd(node, offset);
      const rect = range.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      if (!line || Math.abs(rect.y - line.y) > 0.5) {
        flush();
        line = { text: character, x: rect.x, y: rect.y, height: rect.height };
      } else line.text += character;
    }
    flush();
  }

  function paintPill(ctx, element, origin) {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const border = parseFloat(style.borderTopWidth);
    const x = rect.x - origin.x + border / 2;
    const y = rect.y - origin.y + border / 2;
    const w = rect.width - border, h = rect.height - border;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, h / 2);
    ctx.fillStyle = style.backgroundColor;
    ctx.fill();
    ctx.lineWidth = border;
    ctx.strokeStyle = style.borderTopColor;
    ctx.stroke();
  }

  function render(snapshot, { width, layoutWidth = 392 }) {
    const root = snapshot.cloneNode(true);
    root.removeAttribute("id");
    root.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
    Object.assign(root.style, {
      position: "fixed", left: "-10000px", top: "0", width: `${layoutWidth}px`,
      maxWidth: "none", margin: "0", textAlign: "center", visibility: "hidden", pointerEvents: "none",
    });
    root.setAttribute("aria-hidden", "true");
    document.body.appendChild(root);
    try {
      const rect = root.getBoundingClientRect();
      const scale = width / rect.width;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = Math.ceil(rect.height * scale);
      const ctx = canvas.getContext("2d");
      ctx.scale(scale, scale);
      root.querySelectorAll(".tags li, .birth i").forEach((element) => paintPill(ctx, element, rect));
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.textContent.trim()) paintText(ctx, node, rect);
      }
      return canvas;
    } finally {
      root.remove();
    }
  }

  window.ResultCardDetails = { render };
})();
