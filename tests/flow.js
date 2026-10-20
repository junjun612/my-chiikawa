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

    async function captureCard() {
      let imageUrl, imageName;
      const text = [], fills = [];
      const original = win.HTMLAnchorElement.prototype.click;
      const originalText = win.CanvasRenderingContext2D.prototype.fillText;
      const originalFill = win.CanvasRenderingContext2D.prototype.fill;
      win.HTMLAnchorElement.prototype.click = function () {
        if (this.download) { imageUrl = this.href; imageName = this.download; }
        else original.call(this);
      };
      win.CanvasRenderingContext2D.prototype.fillText = function (value, x, y, ...rest) {
        if (this.canvas.width === 968) text.push({ value, y, center: x + this.measureText(value).width / 2 });
        return originalText.call(this, value, x, y, ...rest);
      };
      win.CanvasRenderingContext2D.prototype.fill = function (...args) {
        if (this.canvas.width === 968) fills.push(this.fillStyle);
        return originalFill.apply(this, args);
      };
      try { el("saveBtn").click(); await until(() => imageUrl); }
      finally {
        win.HTMLAnchorElement.prototype.click = original;
        win.CanvasRenderingContext2D.prototype.fillText = originalText;
        win.CanvasRenderingContext2D.prototype.fill = originalFill;
      }
      return { imageUrl, imageName, text, fills };
    }
    const { imageUrl, imageName, text, fills } = await captureCard();
    const saved = document.getElementById("saved");
    saved.src = imageUrl;
    await saved.decode();
    report("실제 저장 카드 생성 · 1080×1440 PNG", imageUrl.startsWith("data:image/png") && saved.naturalWidth === 1080 && saved.naturalHeight === 1440);
    report("저장 파일명에 새 별명 반영", imageName === `${el("rName").textContent}.png`);
    const sentences = [...el("rDesc").children].map((span) => span.textContent);
    const descriptionRows = text.filter((run) => sentences.includes(run.value));
    report("저장 설명도 화면처럼 문장별 두 줄", descriptionRows.length === 2 && descriptionRows[0].y < descriptionRows[1].y);
    report("저장 설명의 두 문장 모두 가운데 정렬", descriptionRows.length === 2 && Math.abs(descriptionRows[0].center - descriptionRows[1].center) < 1);
    report("저장 이미지에 성향 태그 4개 모두 포함", [...el("rTags").children].every((tag) => text.some((run) => run.value === tag.textContent)));
    report("저장 이미지에 탄생 컬러 안내와 색상 칩 포함", text.some((run) => run.value === el("rBirth").textContent) && fills.includes("#e2f5e9"));
    report("저장 하단에 배경 선택 목록·별도 로고 없음", !text.some((run) => Object.values(win.Creature.BG_IMAGES).includes(run.value) || run.value === "나만의 먼작귀 만들기"));

    reroll("any");
    const updatedLabel = el("rBirth").textContent;
    const expectedFill = doc.createElement("canvas").getContext("2d");
    expectedFill.fillStyle = el("rBirth").querySelector("i").style.background;
    const randomCard = await captureCard();
    report("랜덤 색상도 저장 안내·색상 칩에 그대로 반영", randomCard.text.some((run) => run.value === updatedLabel) && randomCard.fills.includes(expectedFill.fillStyle));

    // Capture the real share handler locally without uploading or sending a message.
    const originalKakao = win.Kakao, originalKey = win.SITE.kakaoKey;
    let uploadedFile, sharedFeed;
    win.Kakao = {
      isInitialized: () => true,
      Share: {
        uploadImage: async ({ file }) => {
          uploadedFile = file[0];
          return { infos: { original: { url: "https://example.test/card.jpg" } } };
        },
        sendDefault: (feed) => { sharedFeed = feed; },
      },
    };
    win.SITE.kakaoKey = "local-share-test";
    try { el("shareBtn").click(); await until(() => sharedFeed); }
    finally { win.Kakao = originalKakao; win.SITE.kakaoKey = originalKey; }
    const jpegUrl = URL.createObjectURL(uploadedFile);
    try {
      const jpeg = new Image(), png = new Image();
      jpeg.src = jpegUrl; png.src = randomCard.imageUrl;
      await Promise.all([jpeg.decode(), png.decode()]);
      report("카카오톡도 같은 1080×1440 카드 이미지를 사용", uploadedFile.type === "image/jpeg" && jpeg.naturalWidth === 1080 && jpeg.naturalHeight === 1440 && sharedFeed.content.imageWidth === 1080 && sharedFeed.content.imageHeight === 1440);
      const footerPixels = (image) => {
        const canvas = document.createElement("canvas");
        canvas.width = 1080; canvas.height = 416;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 1024, 1080, 416, 0, 0, 1080, 416);
        return ctx.getImageData(0, 0, 1080, 416).data;
      };
      const a = footerPixels(png), b = footerPixels(jpeg);
      let difference = 0;
      for (let i = 0; i < a.length; i++) if (i % 4 !== 3) difference += Math.abs(a[i] - b[i]);
      report("PNG와 카카오톡 JPEG 하단 배치 일치", difference / (a.length / 4 * 3) < 5);
    } finally { URL.revokeObjectURL(jpegUrl); }

    const backgroundStyle = win.getComputedStyle(doc.body, "::before");
    report("안전 영역까지 고정 배경을 사용하는 viewport 설정", doc.querySelector('meta[name="viewport"]').content.includes("viewport-fit=cover") && backgroundStyle.position === "fixed" && backgroundStyle.backgroundImage.includes("page_bg.webp") && parseFloat(backgroundStyle.height) >= win.innerHeight);
    const dimensions = [[393, 640], [390, 568], [320, 480], [844, 390]];
    for (const [width, height] of dimensions) {
      frame.style.width = `${width}px`; frame.style.height = `${height}px`;
      await new Promise((resolve) => win.requestAnimationFrame(() => win.requestAnimationFrame(resolve)));
      const bounds = el("resultLayout").getBoundingClientRect();
      const controls = el("shareBtn").getBoundingClientRect();
      report(`${width}×${height}에서 결과·버튼 모두 한 화면에 표시`, bounds.top >= 0 && bounds.bottom <= win.innerHeight + 1 && bounds.left >= 0 && bounds.right <= win.innerWidth + 1 && controls.bottom <= win.innerHeight + 1 && doc.documentElement.scrollHeight <= win.innerHeight + 1);
    }
    const containedCard = await captureCard();
    report("화면을 축소해도 저장 이미지 해상도·배치 유지", containedCard.imageUrl === randomCard.imageUrl);
    frame.style.width = "390px"; frame.style.height = "844px";

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
