// ══════════════════════════════════════════
// HUNT.FUN — CANVAS CHART RENDERER
// ══════════════════════════════════════════

function drawChart(canvasId, data, isUp) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const PAD = { top: 12, right: 30, bottom: 20, left: 8 };
  const drawW = W - PAD.left - PAD.right;
  const drawH = H - PAD.top - PAD.bottom;

  ctx.clearRect(0, 0, W, H);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const color  = isUp ? '#00ff41' : '#ff2222';
  const glow   = isUp ? 'rgba(0,255,65,0.3)' : 'rgba(255,34,34,0.3)';
  const fillG  = isUp ? 'rgba(0,255,65,0.06)' : 'rgba(255,34,34,0.06)';

  // Grid lines
  ctx.strokeStyle = 'rgba(0,255,65,0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = PAD.top + (drawH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(PAD.left, y);
    ctx.lineTo(W - PAD.right, y);
    ctx.stroke();
  }

  // Price line points
  const points = data.map((val, i) => ({
    x: PAD.left + (i / (data.length - 1)) * drawW,
    y: PAD.top + drawH - ((val - min) / range) * drawH,
  }));

  // Fill under curve
  ctx.beginPath();
  ctx.moveTo(points[0].x, H - PAD.bottom);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, H - PAD.bottom);
  ctx.closePath();
  ctx.fillStyle = fillG;
  ctx.fill();

  // Main line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  // Smooth line using quadratic curves
  for (let i = 1; i < points.length - 1; i++) {
    const mx = (points[i].x + points[i + 1].x) / 2;
    const my = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  ctx.stroke();

  // Glow line (thicker, lower opacity)
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i++) {
    const mx = (points[i].x + points[i + 1].x) / 2;
    const my = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.strokeStyle = glow;
  ctx.lineWidth = 4;
  ctx.shadowBlur = 0;
  ctx.stroke();

  // Last price dot
  const last = points[points.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 3, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.fill();

  // Price labels on right axis
  const highVal = '$' + (max).toFixed(6);
  const lowVal  = '$' + (min).toFixed(6);
  document.getElementById('chart-high').textContent = highVal;
  document.getElementById('chart-low').textContent  = lowVal;

  // Volume bars at bottom
  ctx.shadowBlur = 0;
  const barW = drawW / data.length * 0.7;
  const maxVol = 100;

  for (let i = 0; i < data.length; i++) {
    const vol = rand(10, maxVol);
    const barH = (vol / maxVol) * 12;
    const bx = PAD.left + (i / (data.length - 1)) * drawW - barW / 2;
    const by = H - PAD.bottom - barH;
    ctx.fillStyle = 'rgba(0,255,65,0.15)';
    ctx.fillRect(bx, by, barW, barH);
  }
}
