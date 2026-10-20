(async () => {
  const C = window.Creature;
  let failed = 0;
  function check(label, passed, detail = "") {
    const item = document.createElement("li");
    item.className = passed ? "pass" : "fail";
    item.textContent = `${passed ? "PASS" : "FAIL"} ${label}${detail ? ": " + detail : ""}`;
    document.getElementById("checks").appendChild(item);
    if (!passed) failed++;
  }
  function sample(canvas, label) {
    const figure = document.createElement("figure"), caption = document.createElement("figcaption");
    caption.textContent = label;
    figure.append(canvas, caption);
    document.getElementById("samples").appendChild(figure);
  }
  const pixel = (canvas, x = 512, y = 660) => [...canvas.getContext("2d").getImageData(x, y, 1, 1).data];
  try {
    const look = { parts: { body: "body_01" }, bodyColor: "#ffffff", sync: true };
    const day = await C.renderCanvas(look, { bg: "meadow", background: false });
    const night = await C.renderCanvas(look, { bg: "night", background: false });
    const a = pixel(day), b = pixel(night), redDrop = a[0] - b[0];
    check("Canvas 필터 미지원 환경에서 렌더", a[3] === 255 && b[3] === 255);
    check("35% 라이팅: 흰 몸의 밤 색상 변화", redDrop >= 16 && redDrop <= 24 && b[0] >= 225, `${a} → ${b}`);
    check("PNG 인코딩", day.toDataURL("image/png").startsWith("data:image/png;base64,"));
    const NativeImage = window.Image;
    const source = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    let interrupted = false, recovered;
    window.Image = function () {
      const image = new NativeImage();
      Object.defineProperty(image, 'src', {
        get() { return source.get.call(image); },
        set(url) {
          if (url.includes('_retryTest') && !interrupted) {
            interrupted = true;
            queueMicrotask(() => image.onerror(new Event('error')));
          } else source.set.call(image, url);
        },
      });
      return image;
    };
    try { recovered = await C.loadImg('parts/ears/ears_21_L_line.webp?_retryTest=1'); }
    finally { window.Image = NativeImage; }
    check("일시적인 이미지 로딩 실패 후 자동 복구", interrupted && recovered.naturalWidth > 0);
    check("5월 민트", window.QUIZ.months[5][0] === "#f1faf4");
    check("공룡 꼬리 제거", !C.findPart("back", "back_16") && !window.QUIZ.pools.back.T.includes(16));
    check("파스텔 랜덤 팔레트", Array.from({ length: 100 }, (_, seed) => C.randomLook(C.rng(seed))).every((r) =>
      C.BODY_COLORS.includes(r.bodyColor) && r.parts.back !== "back_16"));

    const stage = document.getElementById("live"), view = C.mountStage(stage);
    view.setScene("night");
    await view.render(look);
    const live = stage.querySelector("canvas");
    check("화면·저장 라이팅 일치", JSON.stringify(pixel(live)) === JSON.stringify(pixel(night)));
    const oldRender = view.render({ ...look, bodyColor: "#fdf2f6" });
    view.setScene("meadow");
    await view.render(look);
    await oldRender;
    check("빠른 변경 시 마지막 렌더 유지", stage.dataset.render === "ready" && JSON.stringify(pixel(live)) === JSON.stringify(pixel(day)));

    for (const bg of Object.keys(C.BG_IMAGES)) {
      const image = await C.renderCanvas({ ...look, bodyColor: "#f1faf4" }, { bg, size: 128 });
      check(`${bg} 배경 렌더`, image.getContext("2d").getImageData(64, 64, 1, 1).data[3] === 255);
    }
    const earLook = { ...look, parts: { body: "body_01", ears: "ears_09" }, bodyColor: "#f1faf4" };
    const ears = await C.renderCanvas(earLook, { size: 512, background: false });
    const earPixels = C.computeLayout(earLook).filter((l) => l.cat === "ears").map((l) => {
      const angle = l.rot * Math.PI / 180, x = l.w * 0.5 - l.ox, y = l.h * 0.25 - l.oy;
      const px = Math.round(l.x + l.ox + x * Math.cos(angle) - y * Math.sin(angle));
      const py = Math.round(l.y + l.oy + x * Math.sin(angle) + y * Math.cos(angle));
      return [...ears.getContext("2d").getImageData(px, py, 1, 1).data];
    });
    check("너구리 귀 좌우 모두 같은 민트 색상", earPixels.length === 2 && earPixels.every((p) => p[1] - p[0] > 4) &&
      earPixels[0].every((v, i) => Math.abs(v - earPixels[1][i]) < 8), JSON.stringify(earPixels));

    // Each matching option must affect only its category, in preview and export.
    const splitLook = { parts: { body: "body_01", ears: "ears_09", back: "back_01" }, bodyColor: "#fdf2f6" };
    const splitImages = {};
    for (const syncEars of [false, true]) for (const syncTail of [false, true]) {
      const choice = { ...splitLook, syncEars, syncTail };
      const exported = await C.renderCanvas(choice, { size: 512, background: false });
      splitImages[`${syncEars},${syncTail}`] = exported;
      view.setScene("meadow"); await view.render(choice);
      const full = await C.renderCanvas(choice, { background: false });
      const actual = live.getContext("2d").getImageData(0, 0, 1024, 1024).data;
      const expected = full.getContext("2d").getImageData(0, 0, 1024, 1024).data;
      let compared = 0, differences = 0;
      // The exported ground shadow is separate in the live view. Compare opaque art.
      for (let i = 0; i < actual.length; i += 4) if (actual[i + 3] === 255) {
        compared++;
        if ([0, 1, 2, 3].some((channel) => actual[i + channel] !== expected[i + channel])) differences++;
      }
      check(`귀 ${syncEars ? "켜짐" : "꺼짐"} · 꼬리 ${syncTail ? "켜짐" : "꺼짐"}: 미리보기·저장 색상 일치`, compared > 1000 && differences === 0);
    }
    check("귀·꼬리 네 가지 설정이 각각 다른 이미지로 저장", new Set(Object.values(splitImages).map((cv) => cv.toDataURL())).size === 4);
    for (const [cat, ownFlag, otherFlag] of [["ears", "syncEars", "syncTail"], ["back", "syncTail", "syncEars"]]) {
      const isolated = { ...splitLook, parts: { body: "body_01", [cat]: splitLook.parts[cat] } };
      const first = await C.renderCanvas({ ...isolated, [ownFlag]: true, [otherFlag]: false }, { size: 256, background: false });
      const second = await C.renderCanvas({ ...isolated, [ownFlag]: true, [otherFlag]: true }, { size: 256, background: false });
      check(`${cat === "ears" ? "귀" : "꼬리"} 색은 다른 옵션의 영향을 받지 않음`, first.toDataURL() === second.toDataURL());
    }
    for (const sync of [false, true]) {
      const legacy = await C.renderCanvas({ ...splitLook, sync }, { size: 512, background: false });
      const explicitLook = { ...splitLook, syncEars: sync, syncTail: sync };
      const explicit = await C.renderCanvas(explicitLook, { size: 512, background: false });
      const sameLayout = JSON.stringify(C.computeLayout({ ...splitLook, sync })) === JSON.stringify(C.computeLayout(explicitLook));
      check(`기존 sync=${sync} 렌더 호환`, sameLayout && legacy.toDataURL() === explicit.toDataURL());
    }

    const handLook = { parts: { body: "body_14", prop: "prop_15" }, bodyColor: "#f1faf4", sync: true };
    const handBody = C.findPart("body", "body_14"), originalArms = handBody.arms;
    const withHands = await C.renderCanvas(handLook, { size: 512, background: false });
    const withoutProp = await C.renderCanvas({ ...handLook, parts: { body: "body_14" } }, { size: 512, background: false });
    let noHands;
    try {
      delete handBody.arms;
      noHands = await C.renderCanvas(handLook, { size: 512, background: false });
    } finally { handBody.arms = originalArms; }
    const data = [withHands, withoutProp, noHands].map((cv) => cv.getContext("2d").getImageData(0, 0, 512, 512).data);
    let covered = 0;
    for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
      const i = (y * 512 + x) * 4;
      const restored = [0, 1, 2].every((c) => Math.abs(data[0][i + c] - data[1][i + c]) < 4);
      const propWasVisible = [0, 1, 2].some((c) => Math.abs(data[2][i + c] - data[1][i + c]) > 20);
      if (restored && propWasVisible) covered++;
    }
    check("손의 몸 색 면이 도넛을 앞에서 가림", covered > 20, `${covered} pixels`);
    const baseParts = { body: "body_14", face: "face_02", ears: "ears_09", deco: "deco_01", prop: "prop_15" };
    for (const [color, bg, label] of [["#f1faf4", "meadow", "민트 · 손과 소품 · 작은 새싹"], ["#fffae3", "sunset", "레몬 · 너구리 귀 색상"], ["#ffffff", "night", "화이트 · 밤 라이팅 35%"]]) {
      const canvas = await C.renderCanvas({ parts: baseParts, bodyColor: color, sync: true }, { bg, size: 768 });
      sample(canvas, label);
    }
    await C.preloadAssets();
    document.getElementById("status").textContent = failed ? `${failed}개 검증 실패` : "모든 검증 통과";
    document.body.dataset.result = failed ? "fail" : "pass";
  } catch (error) {
    check("렌더링 완료", false, error.stack || error.message);
    document.getElementById("status").textContent = "검증 실패";
    document.body.dataset.result = "fail";
  }
})();
