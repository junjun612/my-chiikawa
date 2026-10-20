// Block page zoom. iOS Safari ignores user-scalable=no, so pinch and double-tap are
// cancelled here as well (touch-action in CSS covers the rest).
(() => {
  for (const ev of ["gesturestart", "gesturechange", "gestureend"]) {
    document.addEventListener(ev, (e) => e.preventDefault(), { passive: false });
  }
  document.addEventListener("touchmove", (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
  let lastTap = 0;
  document.addEventListener("touchend", (e) => {
    const now = Date.now();
    if (now - lastTap < 300 && !e.target.closest("input, textarea")) e.preventDefault();
    lastTap = now;
  }, { passive: false });
  // Ctrl + wheel / Ctrl + +/- on desktop.
  document.addEventListener("wheel", (e) => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && ["+", "-", "=", "0"].includes(e.key)) e.preventDefault();
  });
})();
