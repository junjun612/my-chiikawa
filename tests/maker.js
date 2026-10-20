(async () => {
  const frame = document.getElementById("app");
  const storeKey = "my-chiikawa-adjust", previous = localStorage.getItem(storeKey);
  let failures = 0, total = 0;
  function report(name, pass) {
    const li = document.createElement("li"); li.textContent = `${pass ? "PASS" : "FAIL"} ${name}`;
    li.className = pass ? "pass" : "fail"; document.getElementById("checks").append(li);
    total++; if (!pass) failures++;
  }
  async function until(predicate) {
    const end = Date.now() + 15000;
    while (!predicate()) {
      if (Date.now() > end) throw new Error("화면 준비 시간 초과");
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
  }
  const load = (path) => new Promise((resolve) => {
    frame.onload = resolve;
    const target = new URL(path, document.baseURI);
    if (frame.contentWindow.location.pathname === target.pathname) {
      frame.contentWindow.history.replaceState(null, "", target.href);
      frame.contentWindow.location.reload();
    } else frame.src = path;
  });
  try {
    localStorage.removeItem(storeKey);
    await load("maker.html");
    const win = frame.contentWindow, doc = frame.contentDocument, el = (id) => doc.getElementById(id);
    await until(() => el("stage").dataset.render === "ready");
    const hash = () => new URLSearchParams(win.location.hash.slice(1));
    const key = (target, value) => target.dispatchEvent(new win.KeyboardEvent("keydown", { key: value, bubbles: true, cancelable: true }));
    report("기본 캐릭터가 정상 렌더링됨", hash().get("body") && hash().get("face") && el("stage").querySelector("canvas").width === 1024);
    report("모바일 확대를 허용하고 강제 줌 차단 스크립트 제거", !doc.querySelector('meta[name="viewport"]').content.includes("user-scalable=no") && !doc.querySelector('script[src^="no-zoom"]'));
    const first = el("grid").querySelector("button"), second = el("grid").querySelectorAll("button")[1];
    report("파츠 이름과 선택 상태를 함께 제공", first.textContent.trim() && first.getAttribute("aria-pressed") === "true" && first.querySelector("img").alt === "");
    second.focus(); second.click();
    report("파츠 선택 후 초점·선택 상태·URL 유지", doc.activeElement.dataset.id === second.dataset.id && el("grid").querySelector('[aria-pressed="true"]').dataset.id === second.dataset.id && hash().get("body") === second.dataset.id);
    key(el("tabs-body"), "ArrowRight");
    report("파츠 탭 방향키 선택과 초점 이동", doc.activeElement.id === "tabs-ears" && el("tabs-ears").getAttribute("aria-selected") === "true" && el("grid").getAttribute("aria-labelledby") === "tabs-ears");
    el("mode-colors").click();
    const soda = el("bodyColors").querySelector('[aria-label="소다"]'); soda.click();
    report("몸 색 선택과 접근 가능한 라디오 상태", !el("colorsPanel").hidden && el("partsPanel").hidden && soda.getAttribute("aria-checked") === "true" && hash().get("color") === "eff8fd");
    key(soda, "ArrowRight");
    report("색상 방향키 선택과 초점 유지", doc.activeElement.getAttribute("aria-checked") === "true" && hash().get("color") === "fdf2f6");
    el("syncEarsChk").click();
    report("귀 색만 따로 해제 · 꼬리 설정 유지", hash().get("syncEars") === "0" && !hash().has("syncTail") && el("syncTailChk").checked);
    el("syncTailChk").click();
    el("syncEarsChk").click();
    report("꼬리 색만 따로 해제 · 귀 설정 유지", hash().get("syncTail") === "0" && !hash().has("syncEars") && el("syncEarsChk").checked);
    el("mode-backgrounds").click();
    el("swatches").querySelector('[aria-label="별밤"]').click();
    report("기존 배경 8개 유지·선택 배경 반영", el("swatches").children.length === 8 && hash().get("bg") === "night" && el("stage").style.backgroundImage.includes("night.webp"));
    el("editBtn").click();
    report("조절 화면 전환과 활성 파츠 표시", !el("editTools").hidden && el("backgroundsPanel").hidden && el("editBtn").getAttribute("aria-pressed") === "true" && el("stage").tabIndex === 0);
    el("editTabs-body").click();
    const bodyId = hash().get("body"), base = { dx: 0, dy: 0, s: 1, ...win.PART_ADJUST?.[bodyId] };
    doc.querySelector('[data-move="4,0"]').click();
    el("biggerBtn").click();
    const adjusted = JSON.parse(localStorage.getItem(storeKey))[bodyId];
    report("터치 버튼으로 이동·크기 조절 및 보관", adjusted.dx === base.dx + 4 && Math.abs(adjusted.s - base.s - .05) < .0001);
    el("sizeRange").value = "130"; el("sizeRange").dispatchEvent(new win.Event("input", { bubbles: true }));
    report("크기 슬라이더와 화면 수치 일치", JSON.parse(localStorage.getItem(storeKey))[bodyId].s === 1.3 && el("sizeValue").value === "130%");
    key(el("stage"), "ArrowUp");
    report("키보드로 미리보기 파츠 이동", JSON.parse(localStorage.getItem(storeKey))[bodyId].dy === base.dy - 1);
    el("resetBtn").click();
    report("초기화 시 원래 위치·크기로 복원", !JSON.parse(localStorage.getItem(storeKey))[bodyId] && el("sizeValue").value === `${Math.round(base.s * 100)}%`);
    el("editTabs-deco").click();
    report("선택하지 않은 파츠의 조절 버튼 비활성화", el("sizeRange").disabled && el("resetBtn").disabled && [...doc.querySelectorAll("[data-move]")].every((b) => b.disabled));
    el("editBtn").click();
    report("꾸미기로 복귀하면 이전 탭 복원", !el("backgroundsPanel").hidden && el("editTools").hidden && el("stage").getAttribute("role") === "img");

    for (const [width, height] of [[393, 690], [393, 640], [320, 568], [667, 375], [844, 390], [1024, 768]]) {
      frame.style.width = `${width}px`; frame.style.height = `${height}px`;
      await until(() => Math.abs(el("makerApp").getBoundingClientRect().height - height) < 2);
      await new Promise((resolve) => win.requestAnimationFrame(() => win.requestAnimationFrame(resolve)));
      el("mode-parts").click();
      const footer = doc.querySelector(".actions").getBoundingClientRect(), preview = el("stageWrap").getBoundingClientRect(), grid = el("grid").getBoundingClientRect();
      report(`${width}×${height} · 미리보기·버튼·선택 목록이 화면 안에 표시`, footer.bottom <= height + 1 && preview.top >= 0 && preview.bottom < footer.top && grid.height >= 60 && doc.documentElement.scrollWidth <= width && doc.documentElement.scrollHeight <= height + 1);
      report(`${width}×${height} · 주요 터치 영역 44px 이상`, [...doc.querySelectorAll(".mode-tabs button, .tabs button, .actions button, .cell")].filter((b) => b.getBoundingClientRect().height > 0).every((b) => b.getBoundingClientRect().width >= 44 && b.getBoundingClientRect().height >= 44));
      el("mode-colors").click();
      const options = doc.querySelector(".sync-options").getBoundingClientRect(), palette = el("bodyColors").getBoundingClientRect();
      report(`${width}×${height} · 두 색 맞추기 옵션을 항상 표시`, options.bottom <= footer.top && options.top >= palette.bottom && palette.height >= 40 && [...doc.querySelectorAll(".sync")].every((label) => label.getBoundingClientRect().height >= 44));
    }
    // Exercise the actual PNG handler without creating a download in the test run.
    let saved;
    const click = win.HTMLAnchorElement.prototype.click;
    win.HTMLAnchorElement.prototype.click = function () { if (this.download) saved = this.href; else click.call(this); };
    try { el("saveBtn").click(); await until(() => saved); }
    finally { win.HTMLAnchorElement.prototype.click = click; }
    const image = new Image(); image.src = saved; await image.decode();
    report("편집 결과를 실제 1024×1024 PNG로 저장", image.naturalWidth === 1024 && image.naturalHeight === 1024 && saved.startsWith("data:image/png") && !el("saveBtn").disabled);
    const savedHash = win.location.hash;
    await load(`maker.html${savedHash}`);
    await until(() => frame.contentDocument.getElementById("stage").dataset.render === "ready");
    report("새로 열어도 파츠·색·배경·개별 색 맞추기 유지", frame.contentWindow.location.hash === savedHash && frame.contentDocument.getElementById("syncEarsChk").checked && !frame.contentDocument.getElementById("syncTailChk").checked);
    await load("maker.html#color=fbe5ec");
    await until(() => frame.contentDocument.getElementById("stage").dataset.render === "ready");
    report("기존 컬러 링크도 50% 흰색을 섞은 색으로 갱신", frame.contentDocument.querySelector('#bodyColors [aria-checked="true"]').dataset.value === "#fdf2f6");
    await load("maker.html#sync=0");
    await until(() => frame.contentDocument.getElementById("stage").dataset.render === "ready");
    report("기존 sync=0 링크는 귀·꼬리 모두 해제로 복원", !frame.contentDocument.getElementById("syncEarsChk").checked && !frame.contentDocument.getElementById("syncTailChk").checked);
    await load("maker.html#sync=0&syncEars=1");
    await until(() => frame.contentDocument.getElementById("stage").dataset.render === "ready");
    report("기존 링크에서도 개별 설정을 우선 적용", frame.contentDocument.getElementById("syncEarsChk").checked && !frame.contentDocument.getElementById("syncTailChk").checked);
    await load("index.html");
    const intro = frame.contentDocument;
    report("첫 화면 내맘대로 메뉴는 메이커로 연결", intro.querySelector('.intro-actions a[href="maker.html"]').textContent === "내맘대로" && intro.getElementById("startBtn"));
  } catch (e) { report(e.message, false); }
  finally {
    if (previous === null) localStorage.removeItem(storeKey); else localStorage.setItem(storeKey, previous);
    const status = document.getElementById("status");
    status.textContent = failures ? `${total}개 중 ${failures}개 실패` : `${total}개 모두 통과`;
    status.dataset.failures = failures;
  }
})();
