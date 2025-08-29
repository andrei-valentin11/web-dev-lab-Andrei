// ===== Config you can tweak =====
const CONFIG = {
  count: 120,         // number of sticks
  minLen: 25,         // min stick length (px)
  maxLen: 120,        // max stick length (px)
  minSpeed: 0.2,      // min linear speed (px/frame)
  maxSpeed: 1.4,      // max linear speed
  minRot: -0.01,      // min rotation speed (rad/frame)
  maxRot:  0.01,      // max rotation speed
  minWidth: 1,        // min line width (px)
  maxWidth: 3,        // max line width
  bgFade: 0.08,       // 0=hard trails, 1=solid clear each frame
  glow: true          // set false to disable glow
};

const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let W, H, sticks = [];

function resize() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  W = canvas.width  = Math.floor(innerWidth  * dpr);
  H = canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width  = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener('resize', resize);
resize();

// Create a nice gradient stroke reused for all sticks
function makeStroke() {
  const g = ctx.createLinearGradient(0, 0, innerWidth, innerHeight);
  g.addColorStop(0,   '#7aa7ff');
  g.addColorStop(0.5, '#a47cff');
  g.addColorStop(1,   '#68ffd5');
  return g;
}
let strokeGradient = makeStroke();

// Build sticks
function rnd(a, b) { return a + Math.random() * (b - a); }
function randomStick() {
  const len   = rnd(CONFIG.minLen, CONFIG.maxLen);
  const angle = rnd(0, Math.PI * 2);
  const speed = rnd(CONFIG.minSpeed, CONFIG.maxSpeed);
  const rotSp = rnd(CONFIG.minRot, CONFIG.maxRot);
  const lw    = rnd(CONFIG.minWidth, CONFIG.maxWidth);
  return {
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    len, angle,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    rot: rotSp,
    lw,
    alpha: rnd(0.35, 0.9)
  };
}

function init() {
  sticks = Array.from({ length: CONFIG.count }, randomStick);
}
init();

// Mouse repulsion for subtle interaction
const mouse = { x: innerWidth / 2, y: innerHeight / 2, active: false };
addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
addEventListener('mouseleave', () => mouse.active = false);

// Animation loop
function frame() {
  // Fade the previous frame for motion trails
  ctx.fillStyle = `rgba(11, 15, 23, ${CONFIG.bgFade})`;
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  if (CONFIG.glow) {
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(160,170,255,0.5)';
  } else {
    ctx.shadowBlur = 0;
  }
  ctx.strokeStyle = strokeGradient;

  for (const s of sticks) {
    // Movement
    s.x += s.vx;
    s.y += s.vy;
    s.angle += s.rot;

    // Edge bounce
    if (s.x < -s.len || s.x > innerWidth + s.len) s.vx *= -1;
    if (s.y < -s.len || s.y > innerHeight + s.len) s.vy *= -1;

    // Mouse repulsion
    if (mouse.active) {
      const dx = s.x - mouse.x;
      const dy = s.y - mouse.y;
      const d2 = dx*dx + dy*dy;
      const r = 120; // influence radius
      if (d2 < r*r) {
        const d = Math.sqrt(d2) || 1;
        s.vx += (dx / d) * 0.05;
        s.vy += (dy / d) * 0.05;
      }
    }

    // Draw stick as a rotating line centered at (x, y)
    const hx = Math.cos(s.angle) * (s.len / 2);
    const hy = Math.sin(s.angle) * (s.len / 2);

    ctx.globalAlpha = s.alpha;
    ctx.lineWidth = s.lw;
    ctx.beginPath();
    ctx.moveTo(s.x - hx, s.y - hy);
    ctx.lineTo(s.x + hx, s.y + hy);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
frame();

// Rebuild gradient on resize (so colors line up with viewport)
addEventListener('resize', () => { strokeGradient = makeStroke(); });

// Optional: click to “shuffle” directions
addEventListener('click', () => {
  for (const s of sticks) {
    s.vx = -s.vx;
    s.vy = -s.vy;
  }
});