// Maker: a persistent preview with touch and keyboard friendly editing tools.
(() => {
  const { LAYOUT, BG_IMAGES, BODY_COLORS, CATS, PARTS, bgImage, assetUrl, findPart, renderCanvas, mountStage, randomLook } = window.Creature;
  const STORE_KEY = "my-chiikawa-adjust", DEFAULT_BG = "meadow";
  const COLOR_NAMES = ["화이트", "아이보리", "레몬", "민트", "소다", "딸기 우유", "라벤더", "복숭아", "피스타치오", "솜사탕", "눈꽃 민트"];
  const $ = (id) => document.getElementById(id);
  const stage = $("stage"), wrap = $("stageWrap"), preview = wrap.closest(".preview");
  let state = {}, activeCat = CATS[0]?.id, activeView = "parts", editMode = false;
  let bg = DEFAULT_BG, bodyColor = BODY_COLORS[0], sync = true, stored = {};
  try { stored = JSON.parse(localStorage.getItem(STORE_KEY) || "{}") || {}; } catch (e) {}

  const getAdjust = (id) => Object.assign({ dx: 0, dy: 0, s: 1 }, (window.PART_ADJUST || {})[id], stored[id]);
  const allAdjust = () => Object.assign({}, window.PART_ADJUST, stored);
  const saveStored = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(stored)); } catch (e) {} };
  const look = () => ({ parts: state, bodyColor, sync });
  const selectedPart = () => findPart(activeCat, state[activeCat]);
  const announce = (message) => { $("makerStatus").textContent = message; };
  const view = mountStage(stage, {
    adjust: getAdjust,
    isActive: (l) => editMode && l.cat === activeCat && l.key !== "arms" && !l.type,
  });

  function renderStage() {
    stage.style.backgroundImage = `url("${bgImage(bg)}")`;
    view.setScene(bg);
    view.render(look());
    const parts = CATS.map((c) => findPart(c.id, state[c.id])?.label).filter(Boolean).join(", ");
    stage.setAttribute("aria-label", `${BG_IMAGES[bg]} 배경의 먼작귀: ${parts}${editMode ? ". 방향키로 선택한 파츠 이동" : ""}`);
    if (editMode) renderEditControls();
  }

  // Reuse the tab buttons so keyboard focus stays on the selected category.
  function renderTabs() {
    for (const id of ["tabs", "editTabs"]) {
      const tabs = $(id);
      if (!tabs.children.length) {
        for (const c of CATS) {
          const b = document.createElement("button");
          b.type = "button"; b.id = `${id}-${c.id}`; b.textContent = c.label; b.dataset.cat = c.id;
          b.setAttribute("role", "tab");
          b.setAttribute("aria-controls", id === "tabs" ? "grid" : "editPartPanel");
          b.onclick = () => {
            const changed = activeCat !== c.id;
            activeCat = c.id;
            renderTabs(); renderGrid(!changed); renderStage();
            b.scrollIntoView({ block: "nearest", inline: "nearest" });
          };
          tabs.appendChild(b);
        }
      }
      for (const b of tabs.children) {
        const on = b.dataset.cat === activeCat;
        b.classList.toggle("on", on); b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1;
      }
    }
    $("grid").setAttribute("aria-labelledby", `tabs-${activeCat}`);
    $("editPartPanel").setAttribute("aria-labelledby", `editTabs-${activeCat}`);
  }

  function renderGrid(keepScroll = true) {
    const grid = $("grid"), scroll = keepScroll ? grid.scrollTop : 0;
    const focused = grid.contains(document.activeElement) ? document.activeElement.dataset.id : undefined;
    grid.replaceChildren();
    const cat = CATS.find((c) => c.id === activeCat);
    if (!cat) return;
    $("categoryTitle").textContent = `${cat.label} 고르기`;
    $("partCount").textContent = `${(PARTS[cat.id] || []).length}가지`;
    function addCell(p) {
      const id = p?.id || null, label = p?.label || "없음", b = document.createElement("button");
      const on = (state[cat.id] || null) === id;
      b.type = "button"; b.className = `cell${on ? " on" : ""}${p ? "" : " none"}`;
      b.dataset.id = id || ""; b.setAttribute("aria-label", label); b.setAttribute("aria-pressed", on);
      if (p) {
        const im = document.createElement("img");
        im.src = assetUrl(p.src); im.alt = ""; im.loading = "lazy";
        b.appendChild(im);
      }
      const caption = document.createElement("span"); caption.textContent = label; b.appendChild(caption);
      b.onclick = () => { state[cat.id] = id; commit(); announce(`${cat.label}: ${label} 선택`); };
      grid.appendChild(b);
    }
    if (!cat.required) addCell(null);
    for (const p of PARTS[cat.id] || []) addCell(p);
    if (focused !== undefined) [...grid.children].find((b) => b.dataset.id === focused)?.focus({ preventScroll: true });
    grid.scrollTop = scroll;
  }

  function renderSwatches() {
    const box = $("swatches"), cbox = $("bodyColors");
    if (!box.children.length) {
      for (const [id, label] of Object.entries(BG_IMAGES)) {
        const b = document.createElement("button"), thumb = document.createElement("span"), caption = document.createElement("span");
        b.type = "button"; b.className = "swatch scene"; b.dataset.value = id;
        b.setAttribute("role", "radio"); b.setAttribute("aria-label", label);
        thumb.className = "scene-thumb"; thumb.setAttribute("aria-hidden", "true");
        thumb.style.backgroundImage = `url("${assetUrl(`backgrounds/${id}_thumb.webp`)}")`;
        caption.textContent = label; b.append(thumb, caption);
        b.onclick = () => { bg = id; writeHash(); renderSwatches(); renderStage(); announce(`${label} 배경 선택`); };
        box.appendChild(b);
      }
      BODY_COLORS.forEach((col, i) => {
        const b = document.createElement("button"), dot = document.createElement("span"), caption = document.createElement("span");
        const label = COLOR_NAMES[i] || "파스텔";
        b.type = "button"; b.className = "swatch"; b.dataset.value = col;
        b.setAttribute("role", "radio"); b.setAttribute("aria-label", label);
        dot.className = "color-dot"; dot.style.setProperty("--color", col); dot.setAttribute("aria-hidden", "true");
        caption.textContent = label; b.append(dot, caption);
        b.onclick = () => { bodyColor = col; writeHash(); renderSwatches(); renderStage(); announce(`${label} 몸 색 선택`); };
        cbox.appendChild(b);
      });
    }
    for (const [group, value] of [[box, bg], [cbox, bodyColor]]) {
      for (const b of group.children) {
        const on = b.dataset.value === value;
        b.classList.toggle("on", on); b.setAttribute("aria-checked", on); b.tabIndex = on ? 0 : -1;
      }
    }
    $("syncChk").checked = sync;
  }

  function setView(next) {
    activeView = next;
    for (const b of $("modeTabs").children) {
      const on = b.dataset.view === next;
      b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1;
      $(b.getAttribute("aria-controls")).hidden = editMode || !on;
    }
  }
  // Tabs and radio groups support the same arrow / Home / End navigation.
  for (const id of ["modeTabs", "tabs", "editTabs", "bodyColors", "swatches"]) {
    $(id).addEventListener("keydown", (e) => {
      const buttons = [...$(id).querySelectorAll("button")], index = buttons.indexOf(e.target);
      if (index < 0) return;
      let next;
      if (["ArrowRight", "ArrowDown"].includes(e.key)) next = (index + 1) % buttons.length;
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) next = (index - 1 + buttons.length) % buttons.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = buttons.length - 1;
      if (next === undefined) return;
      e.preventDefault(); buttons[next].click(); buttons[next].focus({ preventScroll: true });
      buttons[next].scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  }
  for (const b of $("modeTabs").children) b.onclick = () => setView(b.dataset.view);

  function fitStage() {
    const css = getComputedStyle(preview), note = $("previewNote");
    const noteHeight = note.getBoundingClientRect().height;
    const width = preview.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight);
    const height = preview.clientHeight - parseFloat(css.paddingTop) - parseFloat(css.paddingBottom) - (noteHeight ? noteHeight + parseFloat(css.gap) : 0);
    const size = Math.max(32, Math.floor(Math.min(width, height, 460)));
    wrap.style.width = `${size}px`; wrap.style.height = `${size}px`;
    stage.style.setProperty("--scale", size / LAYOUT.stageSize);
  }
  function fitViewport() {
    // Keep the layout stable during pinch zoom, while following Safari toolbar changes.
    if (!window.visualViewport || window.visualViewport.scale === 1) {
      $("makerApp").style.setProperty("--maker-height", `${window.visualViewport?.height || window.innerHeight}px`);
    }
    fitStage();
  }

  function writeHash() {
    const p = new URLSearchParams();
    for (const c of CATS) if (state[c.id]) p.set(c.id, state[c.id]);
    if (bg !== DEFAULT_BG) p.set("bg", bg);
    if (bodyColor) p.set("color", bodyColor.slice(1));
    if (!sync) p.set("sync", "0");
    history.replaceState(null, "", "#" + p.toString());
  }
  function readHash() {
    const p = new URLSearchParams(location.hash.slice(1)), next = {};
    const any = CATS.some((c) => findPart(c.id, p.get(c.id)));
    for (const c of CATS) {
      const id = p.get(c.id), first = (PARTS[c.id] || [])[0];
      next[c.id] = findPart(c.id, id) ? id : first && (c.required || (!any && c.id === "ears")) ? first.id : null;
    }
    bg = BG_IMAGES[p.get("bg")] ? p.get("bg") : DEFAULT_BG;
    const col = p.get("color");
    bodyColor = col && /^[0-9a-f]{6}$/i.test(col) ? "#" + col.toLowerCase() : BODY_COLORS[0];
    sync = p.get("sync") !== "0"; state = next;
  }
  function commit() { writeHash(); renderGrid(); renderStage(); view.pop(); }
  function randomize() {
    const r = randomLook(); state = r.parts; bodyColor = r.bodyColor;
    renderSwatches(); commit(); announce("새로운 친구를 만났어!");
  }
  async function savePng() {
    const button = $("saveBtn"), caption = button.querySelector("span");
    button.disabled = true; caption.textContent = "저장 중…";
    try {
      const cv = await renderCanvas(look(), { bg, adjust: getAdjust });
      const a = document.createElement("a");
      a.href = cv.toDataURL("image/png"); a.download = "my-creature.png";
      document.body.appendChild(a); a.click(); a.remove(); announce("이미지를 저장했어!");
    } catch (e) { announce("이미지를 저장하지 못했어. 잠시 후 다시 눌러줘."); }
    finally { button.disabled = false; caption.textContent = "이미지 저장"; }
  }

  function renderEditControls() {
    const p = selectedPart(), adj = p ? getAdjust(p.id) : null;
    $("editPartName").textContent = p ? `${p.label} 조절하기` : "선택한 파츠가 없어";
    $("editHint").textContent = p ? "버튼을 누르거나 캐릭터 위에서 드래그해줘." : "다른 종류를 고르거나 꾸미기로 돌아가 파츠를 골라줘.";
    $("sizeValue").value = adj ? `${Math.round(adj.s * 100)}%` : "—";
    $("sizeRange").value = adj ? adj.s * 100 : 100;
    for (const control of $("editTools").querySelectorAll("[data-move], #sizeRange, #smallerBtn, #biggerBtn, #resetBtn")) control.disabled = !p;
    $("adjustOut").value = JSON.stringify(allAdjust(), null, 2);
  }
  function updateAdjust(fn) {
    const p = selectedPart(); if (!p) return;
    const adj = getAdjust(p.id); fn(adj);
    adj.s = Math.max(.1, Math.min(3, adj.s));
    stored[p.id] = { dx: adj.dx, dy: adj.dy, s: adj.s }; saveStored(); renderStage();
  }
  function setEditMode(on) {
    editMode = on; $("makerApp").dataset.editing = on;
    $("editBtn").setAttribute("aria-pressed", on);
    $("editBtn").querySelector("span").textContent = on ? "꾸미기로" : "위치·크기";
    $("editTools").hidden = !on;
    stage.classList.toggle("editing", on); stage.setAttribute("role", on ? "group" : "img");
    if (on) stage.tabIndex = 0; else stage.removeAttribute("tabindex");
    $("previewNote").textContent = on ? "선택한 파츠를 움직여 딱 맞춰줘!" : "아래에서 마음에 드는 파츠를 골라줘!";
    setView(activeView); renderTabs(); renderStage(); fitStage();
    announce(on ? "위치와 크기 조절. 아래에서 조절할 파츠 종류를 골라줘." : "꾸미기로 돌아왔어!");
  }
  for (const b of document.querySelectorAll("[data-move]")) {
    b.onclick = () => { const [dx, dy] = b.dataset.move.split(",").map(Number); updateAdjust((a) => { a.dx += dx; a.dy += dy; }); };
  }
  $("sizeRange").oninput = (e) => updateAdjust((a) => { a.s = Number(e.target.value) / 100; });
  $("smallerBtn").onclick = () => updateAdjust((a) => { a.s -= .05; });
  $("biggerBtn").onclick = () => updateAdjust((a) => { a.s += .05; });
  let drag = null;
  stage.addEventListener("pointerdown", (e) => {
    if (!editMode || !selectedPart() || !e.isPrimary || e.button !== 0) return;
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
  stage.addEventListener("pointerup", endDrag); stage.addEventListener("pointercancel", endDrag); stage.addEventListener("lostpointercapture", endDrag);
  stage.addEventListener("wheel", (e) => {
    if (!editMode || !selectedPart() || e.ctrlKey) return;
    e.preventDefault(); updateAdjust((a) => { a.s *= e.deltaY < 0 ? 1.02 : 1 / 1.02; });
  }, { passive: false });
  stage.addEventListener("keydown", (e) => {
    if (!editMode || e.altKey || e.ctrlKey || e.metaKey) return;
    const step = e.shiftKey ? 5 : 1;
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (d) { e.preventDefault(); updateAdjust((a) => { a.dx += d[0]; a.dy += d[1]; }); }
  });
  $("editBtn").onclick = () => setEditMode(!editMode);
  $("copyBtn").onclick = async () => {
    const text = JSON.stringify(allAdjust(), null, 2); $("adjustOut").value = text;
    try { await navigator.clipboard.writeText(text); announce("조정값을 복사했어!"); }
    catch (e) { $("adjustOut").select(); announce("선택된 조정값을 복사해줘."); }
  };
  $("resetBtn").onclick = () => {
    const p = selectedPart(); if (!p) return;
    delete stored[p.id]; saveStored(); renderStage(); announce(`${p.label}의 위치와 크기를 되돌렸어.`);
  };
  $("syncChk").onchange = (e) => { sync = e.target.checked; writeHash(); renderStage(); };
  $("randomBtn").onclick = randomize; $("saveBtn").onclick = savePng;
  window.addEventListener("hashchange", () => { readHash(); renderSwatches(); renderGrid(); renderStage(); });
  if (window.ResizeObserver) new ResizeObserver(fitStage).observe(preview);
  window.addEventListener("resize", fitViewport);
  window.visualViewport?.addEventListener("resize", fitViewport);
  document.fonts.ready.then(fitStage);
  readHash(); renderTabs(); renderGrid(); renderSwatches(); fitViewport(); renderStage(); writeHash();
  if (window.requestIdleCallback) window.requestIdleCallback(() => window.Creature.preloadAssets(), { timeout: 1200 });
  else setTimeout(() => window.Creature.preloadAssets(), 300);
})();
