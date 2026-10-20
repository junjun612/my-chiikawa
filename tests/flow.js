(async () => {
  let failures = 0;
  const report = (name, pass) => {
    const li = document.createElement("li");
    li.textContent = `${pass ? "PASS" : "FAIL"} ${name}`;
    li.className = pass ? "pass" : "fail";
    document.getElementById("checks").appendChild(li);
    if (!pass) failures++;
  };
  async function until(predicate) {
    const end = Date.now() + 15000;
    while (!predicate()) {
      if (Date.now() > end) throw new Error("화면 전환 시간 초과");
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
  }
  try {
    const frame = document.getElementById("app");
    await new Promise((resolve) => { frame.onload = resolve; frame.src = "index.html"; });
    const win = frame.contentWindow, doc = frame.contentDocument;
    const el = (id) => doc.getElementById(id);
    el("startBtn").click();
    el("nameIn").value = "민트";
    el("birthIn").value = "1998.05.12";
    el("infoForm").requestSubmit();
    for (let i = 0; i < 8; i++) {
      await until(() => el("qNum").textContent === `${i + 1} / 8`);
      el("answers").querySelector("button").click();
    }
    await until(() => el("result").classList.contains("on") && el("resultStage").dataset.render === "ready");
    const color = () => el("rBirth").querySelector("i").style.background;
    const initial = color();
    report("5월 최초 결과는 민트", initial === "rgb(226, 245, 233)");
    report("설명·태그·탄생 컬러 폰트 유지", ["rDesc", "rTags", "rBirth"].every((id) => win.getComputedStyle(el(id)).fontFamily.startsWith('"MJ Body"')));
    report("이름에 감자꽃마을 적용", win.getComputedStyle(el("rName")).fontFamily.startsWith('"Gamja Flower"'));
    report("배지와 이름을 그림 안 상단에 배치", el("resultWrap").contains(el("rType")) && el("resultWrap").contains(el("rName")));
    report("배경 선택 UI를 그림 위로 이동", el("bgPick").getBoundingClientRect().bottom <= el("resultWrap").getBoundingClientRect().top);
    report("불필요한 버튼·소유자 텍스트 제거", !el("owner") && !el("editLink") && !el("restartBtn"));

    const reroll = (mode) => { el("rerollBtn").click(); el("rollPop").querySelector(`[data-mode="${mode}"]`).click(); };
    const initialName = el("rName").textContent;
    const originalArt = el("resultStage").querySelector("canvas").toDataURL();
    const originalBackground = el("resultStage").style.backgroundImage;
    const originalType = el("rType").textContent;
    let previousName = initialName, differentNames = true;
    for (let i = 0; i < 20; i++) {
      reroll("name");
      const next = el("rName").textContent;
      differentNames &&= next !== previousName && /^[가-힣]{2,4}$/.test(next);
      previousName = next;
    }
    report("이름만 다시 20회 · 짧은 별명과 연속 중복 방지", differentNames);
    report("이름만 바꿔도 외형·배경·성향·탄생 컬러 유지", el("resultStage").querySelector("canvas").toDataURL() === originalArt && el("resultStage").style.backgroundImage === originalBackground && el("rType").textContent === originalType && color() === initial);
    let different = true, before = initial;
    for (let i = 0; i < 10; i++) {
      reroll("any");
      const next = color();
      different &&= next !== before;
      before = next;
    }
    report("완전 랜덤 10회 모두 이전 몸 색과 다름", different);
    report("랜덤 색상 안내 갱신", el("rBirth").textContent.includes("컬러"));
    el("bgPick").querySelector('[aria-label="바닷가"]').click();
    reroll("mine");
    report("내 성향대로는 탄생 컬러 복원", color() === initial && el("rBirth").textContent.includes("5월생 탄생 컬러"));
    report("사용자가 고른 바다 배경 유지", el("bgPick").querySelector('[aria-label="바닷가"]').getAttribute("aria-checked") === "true");
    el("bgPick").querySelector('[aria-label="별밤"]').click();
    // Read the target CSS variable: the visual color animates over 200ms.
    report("별밤 이름은 밝은 크림색", el("resultWrap").style.getPropertyValue("--caption-ink") === "#fff1bf");
    el("bgPick").querySelector('[aria-label="바닷가"]').click();
    report("바다 이름은 청록색", el("resultWrap").style.getPropertyValue("--caption-ink") === "#286b80");

    let imageUrl, imageName;
    const original = win.HTMLAnchorElement.prototype.click;
    win.HTMLAnchorElement.prototype.click = function () {
      if (this.download) { imageUrl = this.href; imageName = this.download; }
      else original.call(this);
    };
    try { el("saveBtn").click(); await until(() => imageUrl); }
    finally { win.HTMLAnchorElement.prototype.click = original; }
    const saved = document.getElementById("saved");
    saved.src = imageUrl;
    await saved.decode();
    report("실제 저장 카드 생성 · 1080×1440 PNG", imageUrl.startsWith("data:image/png") && saved.naturalWidth === 1080 && saved.naturalHeight === 1440);
    report("저장 파일명에 새 별명 반영", imageName === `${el("rName").textContent}.png`);

    reroll("restart");
    report("다시 메뉴에서 처음부터 다시", el("intro").classList.contains("on") && !el("nameIn").value && !el("birthIn").value);
    frame.hidden = true;
    document.getElementById("status").textContent = failures ? `${failures}개 검증 실패` : "모든 흐름 검증 통과";
    document.body.dataset.result = failures ? "fail" : "pass";
  } catch (error) {
    report(error.message, false);
    document.getElementById("status").textContent = "검증 실패";
    document.body.dataset.result = "fail";
  }
})();
