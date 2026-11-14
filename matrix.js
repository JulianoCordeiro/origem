// Chuva de código decorativa. Não coleta dados e não interfere no toque.
(() => {
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-rain';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const glyphs = 'アイウエオカキクケコサシスセソタチツテト012345789ZXYORIGEM';
  const size = 19;
  let width, height, drops, timer;
  function resize() {
    width = window.innerWidth; height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * ratio; canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    drops = Array.from({ length: Math.ceil(width / size) }, () => Math.random() * height / size);
    ctx.fillStyle = '#030705'; ctx.fillRect(0, 0, width, height);
    if (motion.matches) staticFrame();
  }
  function staticFrame() {
    ctx.font = '14px monospace';
    for (let x = 0; x < width; x += size * 2) {
      for (let y = 0; y < height; y += size) {
        ctx.fillStyle = Math.random() > .9 ? '#744577' : '#173d29';
        ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], x, y);
      }
    }
  }
  function draw() {
    ctx.fillStyle = 'rgba(3,7,5,0.075)'; ctx.fillRect(0, 0, width, height);
    ctx.font = '14px monospace';
    drops.forEach((drop, i) => {
      ctx.fillStyle = i % 7 === 0 ? '#98619d' : '#5eb982';
      ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * size, drop * size);
      if (drop * size > height && Math.random() > .98) drops[i] = -Math.random() * 25;
      else drops[i] += .38;
    });
  }
  function run() {
    clearInterval(timer);
    if (!motion.matches && !document.hidden) timer = setInterval(draw, 65);
  }
  window.addEventListener('resize', resize, { passive: true });
  motion.addEventListener('change', () => { resize(); run(); });
  document.addEventListener('visibilitychange', run);
  resize(); run();
})();
