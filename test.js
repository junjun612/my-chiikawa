// Personality test flow: intro -> info -> quiz -> making -> result.
(() => {
  const C = window.Creature;
  const Q = window.QUIZ;
  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, "0");

  const profile = { name: "", birth: "", month: 1, answers: [], variant: 0, nameVariant: 0 };

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
  const CAPTION_COLORS = {
    meadow: { ink: "#84533f", shadow: "#fffbea" },
    dusk: { ink: "#fff5dc", shadow: "#304b56" },
    sunset: { ink: "#92513f", shadow: "#fff3dc" },
    beach: { ink: "#286b80", shadow: "#f1fbff" },
    night: { ink: "#fff1bf", shadow: "#293554" },
    sakura: { ink: "#99596c", shadow: "#fff8f5" },
    snow: { ink: "#4e7290", shadow: "#ffffff" },
    room: { ink: "#855b46", shadow: "#fff8e8" },
  };

  // ---- Intro parade -------------------------------------------------------
  async function buildParade() {
    const track = $("parade");
    const sprites = [];
    for (let i = 0; i < 3; i++) {
      const batch = await Promise.allSettled(Array.from({ length: 3 }, () => sprite(C.randomLook(), 256)));
      sprites.push(...batch.filter((result) => result.status === "fulfilled").map((result) => result.value));
    }
    // One unavailable image must not remove the whole parade.
    if (!sprites.length) sprites.push(await sprite({ parts: { body: "body_01", face: "face_01" }, bodyColor: "#ffffff" }, 256));
    const available = sprites.slice();
    while (sprites.length < 9) sprites.push(available[sprites.length % available.length]);
    const delays = sprites.map(() => `${(Math.random() * 0.9).toFixed(2)}s`);
    // Two identical halves so translateX(-50% -> 0) loops seamlessly.
    for (let k = 0; k < 2; k++) {
      for (const [i, s] of sprites.entries()) {
        const c = document.createElement("canvas");
        c.width = s.width; c.height = s.height;
        c.getContext("2d").drawImage(s, 0, 0);
        c.style.animationDelay = delays[i];
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
    if (!name) { err.textContent = "이름을 알려줘!"; $("nameIn").focus(); return; }
    if (!birth) { err.textContent = "생년월일을 숫자 8자리로 적어줘!\n예: 1998.04.12"; $("birthIn").focus(); return; }
    err.textContent = "";
    bgPicked = false;
    Object.assign(profile, { name, birth, month: Number(birth.slice(5, 7)), answers: [], variant: 0, nameVariant: 0 });
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
      ears: id("ears", pick(P.ears[tf])),
      prop: r() < wear.prop ? id("prop", pick(P.prop[sn])) : null,
      deco: r() < wear.deco ? id("deco", pick(P.deco[sn])) : null,
      back: r() < wear.back ? id("back", pick(P.back[tf])) : null,
    };
    const m = profile.month;
    const season = m >= 3 && m <= 5 ? "spring" : m >= 6 && m <= 8 ? "summer" : m >= 9 && m <= 11 ? "autumn" : "winter";
    const bgs = [...Q.seasons[season], ...(ei === "I" ? Q.nightOwls : [])];
    return { parts, bodyColor: Q.months[m][0], sync: true, bg: pick(bgs) };
  }

  function creatureName(code, previous = "") {
    return window.CreatureNames.generate({ name: profile.name, birth: profile.birth, code, variant: profile.nameVariant }, previous);
  }

  let view = null;
  let current = null;
  function fitResult() {
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    document.documentElement.style.setProperty("--viewport-height", `${viewportHeight}px`);
    const screen = $("result");
    if (!screen.classList.contains("on")) return;
    const wrap = $("resultWrap");
    const st = $("resultStage");
    st.style.setProperty("--scale", wrap.clientWidth / C.LAYOUT.stageSize);
    st.style.setProperty("--zoom", ZOOM);
    st.style.setProperty("--zx", ZOOM_CX + "px");
    st.style.setProperty("--zy", ZOOM_CY + "px");
    const layout = $("resultLayout");
    const style = getComputedStyle(screen);
    const top = parseFloat(style.paddingTop), bottom = parseFloat(style.paddingBottom);
    const availableHeight = Math.max(1, screen.clientHeight - top - bottom);
    layout.style.top = `${top + availableHeight / 2}px`;
    layout.style.setProperty("--result-fit", Math.min(1, availableHeight / Math.max(1, layout.offsetHeight)));
  }
  window.addEventListener("resize", fitResult);
  window.visualViewport?.addEventListener("resize", fitResult);

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
    current = { code, title, desc, name: creatureName(code), look: buildLook(code) };
    $("rType").textContent = `${title} 먼작귀 · ${code}`;
    $("rName").textContent = current.name;
    $("rDesc").replaceChildren(...desc.split(/([.!?])\s+/).reduce((out, text, index, parts) => {
      if (index % 2 === 0 && text) {
        const sentence = document.createElement("span");
        sentence.className = "sentence";
        sentence.textContent = text + (parts[index + 1] || "");
        out.push(sentence);
      }
      return out;
    }, []));
    $("rTags").innerHTML = Q.axes.map((ax, i) => `<li>#${ax.tags[ax.letters.indexOf(code[i])]}</li>`).join("");
    show("result");
    if (!view) {
      view = C.mountStage($("resultStage"));
      if (window.ResizeObserver) {
        const resize = new ResizeObserver(fitResult);
        resize.observe($("resultLayout"));
        resize.observe($("result"));
      }
    }
    fitResult();
    drawResult();
  }

  function drawResult(bounce = true) {
    const { look } = current;
    $("resultStage").style.backgroundImage = `url("${C.bgImage(look.bg)}")`;
    const caption = CAPTION_COLORS[look.bg] || CAPTION_COLORS.meadow;
    $("resultWrap").style.setProperty("--caption-ink", caption.ink);
    $("resultWrap").style.setProperty("--caption-shadow", caption.shadow);
    view.setScene(look.bg);
    view.render(look);
    if (bounce) view.pop();
    renderBgPick();
    const color = look.bodyColor;
    const birthColor = Q.months[profile.month];
    const name = Q.months.slice(1).find(([hex]) => hex === color)?.[1] || "파스텔";
    const label = color === birthColor[0] ? `${profile.month}월생 탄생 컬러` : "새로 뽑은 컬러";
    $("rBirth").replaceChildren();
    const chip = document.createElement("i");
    chip.style.background = color;
    $("rBirth").append(chip, `${label} · ${name}`);
    fitResult();
  }

  // Re-roll asks how: "mine" keeps the personality pools, "any" ignores them.
  // A background the user picked by hand stays through re-rolls.
  let bgPicked = false;
  const pop = $("rollPop");
  $("rerollBtn").onclick = () => pop.showModal();
  pop.addEventListener("click", (e) => {
    if (e.target === pop) return pop.close(); // backdrop
    const b = e.target.closest("[data-mode]");
    if (!b) return;
    pop.close();
    const mode = b.dataset.mode;
    if (!mode) return;
    if (mode === "name") {
      profile.nameVariant++;
      current.name = creatureName(current.code, current.name);
      $("rName").textContent = current.name;
      return;
    }
    if (mode === "restart") {
      $("infoForm").reset();
      $("infoErr").textContent = "";
      Object.assign(profile, { name: "", birth: "", month: 1, answers: [], variant: 0, nameVariant: 0 });
      bgPicked = false;
      show("intro");
      return;
    }
    const keepBg = bgPicked && current.look.bg;
    if (mode === "mine") {
      profile.variant++;
      current.look = buildLook(current.code);
    } else {
      const bgs = Object.keys(C.BG_IMAGES);
      const previousColor = current.look.bodyColor;
      current.look = { ...C.randomLook(), bg: bgs[Math.floor(Math.random() * bgs.length)] };
      if (current.look.bodyColor === previousColor) {
        const colors = C.BODY_COLORS.filter((color) => color !== previousColor);
        current.look.bodyColor = colors[Math.floor(Math.random() * colors.length)];
      }
    }
    if (keepBg) current.look.bg = keepBg;
    drawResult();
  });

  function renderBgPick() {
    const box = $("bgPick");
    box.innerHTML = "";
    for (const [id, label] of Object.entries(C.BG_IMAGES)) {
      const on = id === current.look.bg;
      const b = document.createElement("button");
      b.className = "bg-thumb" + (on ? " on" : "");
      b.style.backgroundImage = `url("${C.assetUrl(`backgrounds/${id}_thumb.webp`)}")`;
      b.title = label;
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", on);
      b.setAttribute("aria-label", label);
      b.onclick = () => { bgPicked = true; current.look.bg = id; drawResult(false); };
      box.appendChild(b);
    }
  }

  // The card exports the picture and result details; the background picker stays in the UI.
  async function makeCard() {
      const result = { ...current, look: { ...current.look, parts: { ...current.look.parts } } };
      const details = $("result").querySelector(".result-text").cloneNode(true);
      const allText = [result.name, result.title, details.textContent, result.code].join("");
      await Promise.all([document.fonts.load('60px "Gamja Flower"', allText), document.fonts.load('30px "MJ Body"', allText)]);
      const art = await C.renderCanvas(result.look, { size: 1024, bg: result.look.bg });
      const W = 1080, H = 1440, M = 56, R = 48;
      const pageStyle = getComputedStyle(document.querySelector(".page"));
      const screenStyle = getComputedStyle($("result"));
      const cardStyle = getComputedStyle($("result").querySelector(".result-card"));
      const layoutWidth = parseFloat(pageStyle.maxWidth) - parseFloat(screenStyle.paddingLeft) - parseFloat(screenStyle.paddingRight)
        - parseFloat(cardStyle.paddingLeft) - parseFloat(cardStyle.paddingRight);
      const footer = window.ResultCardDetails.render(details, { width: W - 2 * M, layoutWidth });
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
      ctx.font = '42px "Gamja Flower", sans-serif';
      const type = `${result.title} 먼작귀 · ${result.code}`;
      const badgeWidth = Math.min(W - 2 * M - 48, ctx.measureText(type).width + 64);
      ctx.fillStyle = "#cfeaf8";
      roundRect((W - badgeWidth) / 2, M + 28, badgeWidth, 62, 31);
      ctx.fill();
      ctx.fillStyle = "#5a3d30";
      ctx.fillText(type, W / 2, M + 71, badgeWidth - 40);
      const caption = CAPTION_COLORS[result.look.bg] || CAPTION_COLORS.meadow;
      ctx.save();
      ctx.fillStyle = caption.ink;
      ctx.font = '84px "Gamja Flower", sans-serif';
      ctx.shadowColor = caption.shadow;
      ctx.shadowBlur = 7;
      ctx.shadowOffsetY = 5;
      ctx.fillText(result.name, W / 2, M + 183);
      ctx.restore();
      const footerScale = Math.min(1, (H - 2 * M - (W - 2 * M)) / footer.height);
      const footerWidth = footer.width * footerScale, footerHeight = footer.height * footerScale;
      ctx.drawImage(footer, (W - footerWidth) / 2, W - M, footerWidth, footerHeight);
      return cv;
  }
  const NO_SERVER = "이미지를 만들 수 없어요. 페이지를 로컬 서버로 열어주세요. (예: python -m http.server)";
  const cardBlob = async () => new Promise((res, rej) => makeCard().then((cv) => {
    try { cv.toBlob((b) => (b ? res(b) : rej(new Error("toBlob"))), "image/jpeg", 0.9); } catch (e) { rej(e); } // throws if tainted (file://)
  }, rej));

  $("saveBtn").onclick = async () => {
    try {
      const cv = await makeCard();
      const a = document.createElement("a");
      a.href = cv.toDataURL("image/png"); // throws if the canvas is tainted (file://)
      a.download = `${current.name}.png`;
      document.body.appendChild(a); a.click(); a.remove();
    } catch (e) {
      alert(NO_SERVER);
    }
  };

  // ---- Share ----------------------------------------------------------------
  const SITE = window.SITE || {};
  const siteUrl = SITE.url || location.href.split("#")[0].replace(/[^/]*$/, "");
  const shareText = () => ({
    title: `${profile.name}의 먼작귀는 ${current.name}!`,
    desc: `${current.title} 먼작귀\n나를 꼭 닮은 먼작귀를 만나보세요 🌱`,
  });
  const kakaoReady = () => {
    if (!SITE.kakaoKey || !window.Kakao) return false;
    if (!Kakao.isInitialized()) Kakao.init(SITE.kakaoKey);
    return true;
  };
  $("shareBtn").onclick = async () => {
    const btn = $("shareBtn");
    if (btn.disabled) return;
    btn.disabled = true;
    btn.classList.add("busy");
    try {
      const blob = await cardBlob();
      const file = new File([blob], `${current.name}.jpg`, { type: "image/jpeg" });
      const { title, desc } = shareText();
      const text = [title, desc, siteUrl].join("\n\n");
      if (kakaoReady()) {
        // Kakao keeps uploaded images for up to 100 days.
        const up = await Kakao.Share.uploadImage({ file: [file] });
        Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title, description: desc, imageUrl: up.infos.original.url, imageWidth: 1080, imageHeight: 1440,
            link: { mobileWebUrl: siteUrl, webUrl: siteUrl },
          },
          buttons: [{ title: "나도 만들어보기", link: { mobileWebUrl: siteUrl, webUrl: siteUrl } }],
        });
      } else if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title, text });
      } else {
        await navigator.clipboard.writeText(text);
        alert("공유 문구와 링크를 복사했어요! 카카오톡에 붙여 넣어 주세요.");
      }
    } catch (e) {
      if (e && e.name === "AbortError") return; // user closed the share sheet
      alert(location.protocol === "file:" ? NO_SERVER : "공유하지 못했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      btn.disabled = false;
      btn.classList.remove("busy");
    }
  };

  buildParade().catch(console.error).finally(() => {
    const warm = () => C.preloadAssets();
    if (window.requestIdleCallback) window.requestIdleCallback(warm, { timeout: 1200 });
    else setTimeout(warm, 300);
  });
})();
