// Personality test flow: intro -> info -> quiz -> making -> result.
(() => {
  const C = window.Creature;
  const Q = window.QUIZ;
  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, "0");

  const profile = { name: "", birth: "", month: 1, answers: [], variant: 0 };

  function show(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.toggle("on", s.id === id));
    window.scrollTo(0, 0);
    const first = $(id).querySelector("input, .answer, .btn");
    if (first && id !== "intro") setTimeout(() => first.focus({ preventScroll: true }), 50);
  }
  document.querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => show(b.dataset.go)));

  // Character canvas without background (transparent), cropped to where creatures live
  // on the 512 stage (x 8-92%, y 12-95%), for decorations.
  async function sprite(look, size = 256) {
    const full = await C.renderCanvas(look, { size, background: false });
    const [x, y, w, h] = [0.08, 0.12, 0.84, 0.83].map((f) => Math.round(f * size));
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    c.getContext("2d").drawImage(full, x, y, w, h, 0, 0, w, h);
    return c;
  }
  // Result zoom around the creature (stage px), shared by the live stage and the saved card.
  const ZOOM = 1.25, ZOOM_CX = 256, ZOOM_CY = 330;

  // ---- Intro parade -------------------------------------------------------
  async function buildParade() {
    const track = $("parade");
    const sprites = [];
    for (let i = 0; i < 9; i++) sprites.push(await sprite(C.randomLook(), 256));
    // Two identical halves so translateX(-50% -> 0) loops seamlessly.
    for (let k = 0; k < 2; k++) {
      for (const s of sprites) {
        const c = document.createElement("canvas");
        c.width = s.width; c.height = s.height;
        c.getContext("2d").drawImage(s, 0, 0);
        c.style.animationDelay = `${(Math.random() * 0.9).toFixed(2)}s`;
        track.appendChild(c);
      }
    }
  }

  // ---- Info -----------------------------------------------------------------
  $("startBtn").onclick = async () => {
    show("info");
    const peek = $("peekStage");
    if (!peek.firstChild) peek.appendChild(await sprite(C.randomLook(), 300));
  };
  // Birthday: digits only, dots inserted automatically (1998.04.12). Separators the user types
  // ("-", "/", ".", space) close a part, so "1998-4-12" also works.
  //   mode "type":   while typing forward; a dot appears as soon as a part is complete
  //   mode "delete": while deleting; never re-adds a trailing dot
  //   mode "final":  on paste / blur / submit; short month and day are zero-padded
  const birthIn = $("birthIn");
  const SLOTS = [4, 2, 2];
  function birthParts(raw, mode) {
    const groups = raw.split(/\D+/).filter(Boolean);
    const closed = /\D$/.test(raw.trim()) || mode === "final";
    const out = [];
    groups.forEach((g, gi) => {
      const last = gi === groups.length - 1;
      while (g && out.length < 3) {
        const need = SLOTS[out.length];
        if (g.length >= need) { out.push(g.slice(0, need)); g = g.slice(need); }
        else { out.push(out.length && (!last || closed) ? g.padStart(need, "0") : g); g = ""; }
      }
    });
    return out;
  }
  function formatBirth(mode) {
    if (mode !== "final" && birthIn.selectionStart !== birthIn.value.length) return; // editing mid-text
    const out = birthParts(birthIn.value, mode);
    let v = out.join(".");
    const done = out.length && out[out.length - 1].length === SLOTS[out.length - 1];
    if (mode === "type" && done && out.length < 3) v += ".";
    if (v !== birthIn.value) birthIn.value = v;
  }
  let composing = false;
  birthIn.addEventListener("compositionstart", () => { composing = true; });
  birthIn.addEventListener("compositionend", () => { composing = false; formatBirth("type"); });
  birthIn.addEventListener("input", (e) => {
    if (composing) return;
    const t = e.inputType || "";
    formatBirth(t.startsWith("delete") ? "delete" : t === "insertFromPaste" || t === "insertReplacementText" || !t ? "final" : "type");
  });
  ["change", "blur"].forEach((ev) => birthIn.addEventListener(ev, () => formatBirth("final")));

  // "YYYY.MM.DD" (or any form birthParts understands) -> "YYYY-MM-DD" if it is a real past date.
  function parseBirth(text) {
    const [ys = "", ms = "", ds = ""] = birthParts(text, "final");
    if (ys.length !== 4 || ms.length !== 2 || ds.length !== 2) return null;
    const [y, mo, d] = [ys, ms, ds].map(Number);
    const dt = new Date(y, mo - 1, d);
    if (y < 1900 || dt > new Date() || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
    return `${ys}-${ms}-${ds}`;
  }
  ["nameIn", "birthIn"].forEach((id) => $(id).addEventListener("input", () => { $("infoErr").textContent = ""; }));
  $("infoForm").onsubmit = (e) => {
    e.preventDefault();
    const name = $("nameIn").value.trim();
    const birth = parseBirth($("birthIn").value);
    const err = $("infoErr");
    if (!name) { err.textContent = "이름을 알려 줘!"; $("nameIn").focus(); return; }
    if (!birth) { err.textContent = "생년월일을 숫자 8자리로 적어 줘! 예) 1998.04.12"; $("birthIn").focus(); return; }
    err.textContent = "";
    Object.assign(profile, { name, birth, month: Number(birth.slice(5, 7)), answers: [], variant: 0 });
    renderQuestion(0);
    show("quiz");
  };

  // ---- Quiz -------------------------------------------------------------------
  let qIndex = 0;
  async function renderQuestion(i) {
    qIndex = i;
    const item = Q.questions[i];
    $("qNum").textContent = `${i + 1} / ${Q.questions.length}`;
    $("qText").textContent = item.q;
    $("progress").innerHTML = Q.questions.map((_, k) => `<i class="${k < i ? "done" : k === i ? "now" : ""}"></i>`).join("");
    const box = $("answers");
    box.innerHTML = "";
    item.a.forEach(([letter, text]) => {
      const b = document.createElement("button");
      b.className = "answer sketch";
      b.textContent = text;
      b.onclick = () => answer(letter, b);
      box.appendChild(b);
    });
    $("quizBack").style.visibility = i ? "visible" : "hidden";
    // A little creature for every question (seeded so going back shows the same one).
    const stage = $("quizStage");
    const cv = await sprite(C.randomLook(C.rng(C.hashString(profile.name + i))), 300);
    if (qIndex === i) { stage.innerHTML = ""; stage.appendChild(cv); }
  }
  let busy = false;
  function answer(letter, btn) {
    if (busy) return;
    busy = true;
    btn.classList.add("picked");
    profile.answers[qIndex] = letter;
    setTimeout(() => {
      busy = false;
      if (qIndex + 1 < Q.questions.length) renderQuestion(qIndex + 1);
      else finish();
    }, 260);
  }
  $("quizBack").onclick = () => { if (qIndex > 0) renderQuestion(qIndex - 1); };

  // ---- Result -----------------------------------------------------------------
  function typeCode() {
    return Q.axes.map((ax) => {
      const [a, b] = ax.letters;
      const n = profile.answers.filter((l) => l === a).length;
      const m = profile.answers.filter((l) => l === b).length;
      // Tie (1:1) -> decided by the name so it stays stable for the same person.
      return n > m ? a : m > n ? b : (C.hashString(profile.name + ax.id) & 1 ? a : b);
    }).join("");
  }

  function buildLook(code) {
    const r = C.rng(C.hashString(`${profile.name}|${profile.birth}|${code}`) + profile.variant * 7919);
    const pick = (list) => list[Math.floor(r() * list.length)];
    const id = (cat, n) => `${cat}_${pad(n)}`;
    const [ei, sn, tf, jp] = code;
    const P = Q.pools;
    const wear = Q.wear[jp];
    const parts = {
      body: id("body", pick(P.body[jp])),
      face: id("face", pick([...P.face[ei], ...P.face[tf]])),
      ears: r() < 0.95 ? id("ears", pick(P.ears[tf])) : null,
      prop: r() < wear.prop ? id("prop", pick(P.prop[sn])) : null,
      deco: r() < wear.deco ? id("deco", pick(P.deco[sn])) : null,
      back: r() < wear.back ? id("back", pick(P.back[tf])) : null,
    };
    const m = profile.month;
    const season = m >= 3 && m <= 5 ? "spring" : m >= 6 && m <= 8 ? "summer" : m >= 9 && m <= 11 ? "autumn" : "winter";
    const bgs = [...Q.seasons[season], ...(ei === "I" ? Q.nightOwls : [])];
    return { parts, bodyColor: Q.months[m][0], sync: true, bg: pick(bgs) };
  }

  function creatureName() {
    const syl = [...profile.name].filter((ch) => /[가-힣a-zA-Z]/.test(ch));
    const base = syl.length ? syl[syl.length - 1] : "몽";
    return base + Q.nameSuffix[C.hashString(profile.name + profile.birth) % Q.nameSuffix.length];
  }

  let view = null;
  let current = null;
  function fitResult() {
    const wrap = $("resultWrap");
    const st = $("resultStage");
    st.style.setProperty("--scale", wrap.clientWidth / C.LAYOUT.stageSize);
    st.style.setProperty("--zoom", ZOOM);
    st.style.setProperty("--zx", ZOOM_CX + "px");
    st.style.setProperty("--zy", ZOOM_CY + "px");
  }

  function finish() {
    show("making");
    const msgs = ["말랑말랑 반죽 중", "귀를 쫑긋 붙이는 중", "볼을 콕콕 물들이는 중", "거의 다 됐어요!"];
    let k = 0;
    $("makingSub").textContent = msgs[0];
    const t = setInterval(() => { $("makingSub").textContent = msgs[++k % msgs.length]; }, 520);
    setTimeout(() => { clearInterval(t); showResult(); }, 2100);
  }

  function showResult() {
    const code = typeCode();
    const [title, desc] = Q.types[code];
    current = { code, title, desc, name: creatureName(), look: buildLook(code) };
    $("owner").textContent = `${profile.name}의 먼작귀`;
    $("rType").textContent = `${title} 먼작귀 · ${code}`;
    $("rName").textContent = current.name;
    $("rDesc").textContent = desc;
    $("rTags").innerHTML = Q.axes.map((ax, i) => `<li>#${ax.tags[ax.letters.indexOf(code[i])]}</li>`).join("");
    const [col, colName] = Q.months[profile.month];
    $("rBirth").innerHTML = `<i style="background:${col}"></i>${profile.month}월생 탄생 컬러 · ${colName}`;
    show("result");
    if (!view) {
      view = C.mountStage($("resultStage"));
      if (window.ResizeObserver) new ResizeObserver(fitResult).observe($("resultWrap"));
      else window.addEventListener("resize", fitResult);
    }
    fitResult();
    drawResult();
  }

  function drawResult() {
    const { look } = current;
    $("resultStage").style.backgroundImage = `url("${C.bgImage(look.bg)}")`;
    view.setScene(look.bg);
    view.render(look);
    view.pop();
    const p = new URLSearchParams({ ...Object.fromEntries(Object.entries(look.parts).filter(([, v]) => v)), bg: look.bg });
    if (look.bodyColor) p.set("color", look.bodyColor.slice(1));
    $("editLink").href = "maker.html#" + p.toString();
  }

  // Re-roll mode: "mine" keeps the personality pools, "any" ignores them.
  let rollMode = "mine";
  document.querySelectorAll("#rollMode button").forEach((b) => {
    b.onclick = () => {
      rollMode = b.dataset.mode;
      document.querySelectorAll("#rollMode button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    };
  });
  $("rerollBtn").onclick = () => {
    if (rollMode === "mine") {
      profile.variant++;
      current.look = buildLook(current.code);
    } else {
      const bgs = Object.keys(C.BG_IMAGES);
      current.look = { ...C.randomLook(), bg: bgs[Math.floor(Math.random() * bgs.length)] };
    }
    drawResult();
  };

  // Save a portrait card: creature on its background + name and type underneath.
  $("saveBtn").onclick = async () => {
    try {
      const allText = [profile.name, current.name, current.title, current.desc, "나만의 먼작귀 만들기의 · "].join("");
      await Promise.all([document.fonts.load('60px "MJ Cute"', allText), document.fonts.load('60px "MJ Round"', allText), document.fonts.load('30px "MJ Body"', allText)]);
      const art = await C.renderCanvas(current.look, { size: 1024, bg: current.look.bg });
      const W = 1080, H = 1440, M = 56, R = 48;
      const cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      const ctx = cv.getContext("2d");
      ctx.fillStyle = "#fff8ea";
      ctx.fillRect(0, 0, W, H);
      const roundRect = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
      ctx.save();
      roundRect(M, M, W - 2 * M, W - 2 * M, R);
      ctx.clip();
      // Same zoom as the live stage: crop the art around the creature.
      const k = art.width / C.LAYOUT.stageSize, src = art.width / ZOOM;
      ctx.drawImage(art, ZOOM_CX * k * (1 - 1 / ZOOM), ZOOM_CY * k * (1 - 1 / ZOOM), src, src, M, M, W - 2 * M, W - 2 * M);
      ctx.restore();
      roundRect(M, M, W - 2 * M, W - 2 * M, R);
      ctx.lineWidth = 6; ctx.strokeStyle = "#5a3d30"; ctx.stroke();

      ctx.textAlign = "center";
      ctx.fillStyle = "#7d6152";
      // Line 1 mixes the user's name (Dongle) and the fixed type title (Jua).
      const owner = `${profile.name}의 먼작귀 · `;
      ctx.font = '38px "MJ Round", sans-serif';
      const ow = ctx.measureText(owner).width;
      ctx.font = '38px "MJ Cute", sans-serif';
      const tw = ctx.measureText(current.title).width;
      ctx.textAlign = "left";
      ctx.fillText(current.title, W / 2 - (ow + tw) / 2 + ow, W + 50);
      ctx.font = '38px "MJ Round", sans-serif';
      ctx.fillText(owner, W / 2 - (ow + tw) / 2, W + 50);
      ctx.textAlign = "center";
      ctx.fillStyle = "#5a3d30";
      ctx.font = '84px "MJ Round", sans-serif';
      ctx.fillText(current.name, W / 2, W + 150);
      ctx.fillStyle = "#7d6152";
      ctx.font = '32px "MJ Body", sans-serif';
      wrapText(ctx, current.desc, W / 2, W + 245, W - 2 * M - 40, 46);
      ctx.font = '28px "MJ Cute", sans-serif';
      ctx.fillStyle = "#c9a58a";
      ctx.fillText("나만의 먼작귀 만들기", W / 2, H - 30);

      const a = document.createElement("a");
      a.href = cv.toDataURL("image/png"); // throws if the canvas is tainted (file://)
      a.download = `${current.name}.png`;
      document.body.appendChild(a); a.click(); a.remove();
    } catch (e) {
      alert("이미지를 저장할 수 없어요. 페이지를 로컬 서버로 열어 주세요. (예: python -m http.server)");
    }
  };

  function wrapText(ctx, text, x, y, maxW, lh) {
    let line = "";
    for (const word of text.split(" ")) {
      const test = line ? line + " " + word : word;
      if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, y); line = word; y += lh; }
      else line = test;
    }
    if (line) ctx.fillText(line, x, y);
  }

  $("restartBtn").onclick = () => { $("infoForm").reset(); show("intro"); };

  buildParade();
})();
