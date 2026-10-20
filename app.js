// Maker page (maker.html): pick parts, colors and background; edit-mode placement tuning.
(() => {
  const { LAYOUT, BG_IMAGES, BODY_COLORS, CATS, PARTS, bgImage, assetUrl, findPart, renderCanvas, mountStage, randomLook } = window.Creature;
  const STORE_KEY = "my-chiikawa-adjust";
  const DEFAULT_BG = "meadow";

  const $ = (id) => document.getElementById(id);
  const stage = $("stage"), wrap = $("stageWrap");

  let state = {};
  let activeCat = CATS.length ? CATS[0].id : null;
  let editMode = false;
  let bg = DEFAULT_BG;
  let bodyColor = BODY_COLORS[0];
  let sync = true;
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); } catch (e) { stored = {}; }

  const getAdjust = (id) => Object.assign({ dx: 0, dy: 0, s: 1 }, (window.PART_ADJUST || {})[id], stored[id]);
  const allAdjust = () => Object.assign({}, window.PART_ADJUST, stored);
  const saveStored = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(stored)); } catch (e) {} };
  const look = () => ({ parts: state, bodyColor, sync });

  const view = mountStage(stage, {
    adjust: getAdjust,
    isActive: (l) => editMode && l.cat === activeCat && l.key !== "arms" && !l.type,
  });

  function renderStage() {
    stage.style.backgroundImage = `url("${bgImage(bg)}")`;
    view.setScene(bg);
    view.render(look());
    if (editMode) $("adjustOut").value = JSON.stringify(allAdjust(), null, 2);
  }

  function renderTabs() {
    const tabs = $("tabs");
    tabs.innerHTML = "";
    for (const c of CATS) {
      const b = document.createElement("button");
      b.textContent = c.label;
      b.className = c.id === activeCat ? "on" : "";
      b.onclick = () => { activeCat = c.id; renderTabs(); renderGrid(); renderStage(); };
      tabs.appendChild(b);
    }
  }

  function renderGrid() {
    const grid = $("grid");
    grid.innerHTML = "";
    const cat = CATS.find((c) => c.id === activeCat);
    if (!cat) return;
    const addCell = (id, content) => {
      const b = document.createElement("button");
      b.className = "cell" + ((state[cat.id] || null) === id ? " on" : "");
      b.dataset.id = id || "";
      if (typeof content === "string") b.textContent = content;
      else b.appendChild(content);
      b.onclick = () => { state[cat.id] = id; commit(); };
      grid.appendChild(b);
    };
    if (!cat.required) addCell(null, "없음");
    for (const p of PARTS[cat.id] || []) {
      const im = document.createElement("img");
      im.src = assetUrl(p.src); im.alt = p.label || p.id; im.title = p.label || ""; im.loading = "lazy";
      addCell(p.id, im);
    }
  }

  function renderSwatches() {
    const box = $("swatches");
    box.innerHTML = "";
    for (const id of Object.keys(BG_IMAGES)) {
      const b = document.createElement("button");
      b.className = "swatch scene" + (id === bg ? " on" : "");
      b.style.backgroundImage = `url("${assetUrl(`backgrounds/${id}_thumb.webp`)}")`;
      b.title = BG_IMAGES[id];
      b.setAttribute("aria-label", BG_IMAGES[id]);
      b.onclick = () => { bg = id; writeHash(); renderSwatches(); renderStage(); };
      box.appendChild(b);
    }
    const cbox = $("bodyColors");
    cbox.innerHTML = "";
    for (const col of BODY_COLORS) {
      const b = document.createElement("button");
      b.className = "swatch" + (col === bodyColor ? " on" : "") + (col ? "" : " original");
      if (col) b.style.background = col;
      else b.textContent = "원본";
      b.setAttribute("aria-label", col || "원본 색");
      b.onclick = () => { bodyColor = col; writeHash(); renderSwatches(); renderStage(); };
      cbox.appendChild(b);
    }
    $("syncChk").checked = sync;
  }

  function fitStage() {
    stage.style.setProperty("--scale", wrap.clientWidth / LAYOUT.stageSize);
  }

  // State <-> URL hash
  function writeHash() {
    const p = new URLSearchParams();
    for (const c of CATS) if (state[c.id]) p.set(c.id, state[c.id]);
    if (bg !== DEFAULT_BG) p.set("bg", bg);
    if (bodyColor) p.set("color", bodyColor.slice(1));
    if (!sync) p.set("sync", "0");
    history.replaceState(null, "", "#" + p.toString());
  }
  function readHash() {
    const p = new URLSearchParams(location.hash.slice(1));
    const next = {};
    let any = false;
    for (const c of CATS) {
      const id = p.get(c.id);
      if (id && findPart(c.id, id)) { next[c.id] = id; any = true; }
    }
    const b = p.get("bg");
    bg = BG_IMAGES[b] ? b : DEFAULT_BG;
    const col = p.get("color");
    bodyColor = col && /^[0-9a-f]{6}$/i.test(col) ? "#" + col.toLowerCase() : BODY_COLORS[0];
    sync = p.get("sync") !== "0";
    if (!any) {
      for (const c of CATS) {
        const first = (PARTS[c.id] || [])[0];
        next[c.id] = first && (c.required || c.id === "ears") ? first.id : null;
      }
    }
    for (const c of CATS) if (!(c.id in next)) next[c.id] = null;
    state = next;
  }

  function commit() { writeHash(); renderGrid(); renderStage(); view.pop(); }

  function randomize() {
    const r = randomLook();
    state = r.parts;
    bodyColor = r.bodyColor;
    renderSwatches();
    commit();
  }

  async function savePng() {
    try {
      const cv = await renderCanvas(look(), { bg, adjust: getAdjust });
      const a = document.createElement("a");
      a.href = cv.toDataURL("image/png"); // throws if canvas is tainted (file://)
      a.download = "my-creature.png";
      document.body.appendChild(a); a.click(); a.remove();
    } catch (e) {
      alert("이미지를 저장할 수 없어요. 페이지를 로컬 서버로 열어주세요. (예: python -m http.server)");
    }
  }

  // Edit mode
  const selectedPart = () => findPart(activeCat, state[activeCat]);
  function updateAdjust(fn) {
    const p = selectedPart();
    if (!p) return;
    const adj = getAdjust(p.id);
    fn(adj);
    stored[p.id] = { dx: adj.dx, dy: adj.dy, s: adj.s };
    saveStored();
    renderStage();
  }
  let drag = null;
  stage.addEventListener("pointerdown", (e) => {
    if (!editMode || !selectedPart()) return;
    const adj = getAdjust(selectedPart().id);
    drag = { x: e.clientX, y: e.clientY, dx: adj.dx, dy: adj.dy };
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const sc = wrap.clientWidth / LAYOUT.stageSize;
    updateAdjust((a) => { a.dx = drag.dx + (e.clientX - drag.x) / sc; a.dy = drag.dy + (e.clientY - drag.y) / sc; });
  });
  const endDrag = () => { drag = null; };
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);
  stage.addEventListener("wheel", (e) => {
    if (!editMode || !selectedPart()) return;
    e.preventDefault();
    updateAdjust((a) => { a.s = Math.max(0.1, a.s * (e.deltaY < 0 ? 1.02 : 1 / 1.02)); });
  }, { passive: false });
  document.addEventListener("keydown", (e) => {
    if (!editMode || /^(TEXTAREA|INPUT)$/.test(e.target.tagName)) return;
    const step = e.shiftKey ? 5 : 1;
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!d) return;
    e.preventDefault();
    updateAdjust((a) => { a.dx += d[0]; a.dy += d[1]; });
  });

  $("editBtn").onclick = () => {
    editMode = !editMode;
    $("editBtn").setAttribute("aria-pressed", editMode);
    $("editTools").hidden = !editMode;
    stage.classList.toggle("editing", editMode);
    renderStage();
  };
  $("copyBtn").onclick = async () => {
    const text = JSON.stringify(allAdjust(), null, 2);
    $("adjustOut").value = text;
    try { await navigator.clipboard.writeText(text); } catch (e) { $("adjustOut").select(); }
  };
  $("resetBtn").onclick = () => {
    const p = selectedPart();
    if (!p) return;
    delete stored[p.id];
    saveStored();
    renderStage();
  };
  $("syncChk").onchange = (e) => { sync = e.target.checked; writeHash(); renderStage(); };
  $("randomBtn").onclick = randomize;
  $("saveBtn").onclick = savePng;

  window.addEventListener("hashchange", () => { readHash(); renderSwatches(); renderGrid(); renderStage(); });
  if (window.ResizeObserver) new ResizeObserver(fitStage).observe(wrap);
  else window.addEventListener("resize", fitStage);

  readHash();
  renderTabs(); renderGrid(); renderSwatches(); fitStage(); renderStage();
  writeHash();
  if (window.requestIdleCallback) window.requestIdleCallback(() => window.Creature.preloadAssets(), { timeout: 1200 });
  else setTimeout(() => window.Creature.preloadAssets(), 300);
})();
