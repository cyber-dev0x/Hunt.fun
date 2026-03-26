// ══════════════════════════════════════════
// HUNT.FUN — APP INIT & GLOBAL UTILS
// ══════════════════════════════════════════

// ── Clock ──
function updateClock() {
  const now = new Date();
  const h = String(now.getUTCHours()).padStart(2, '0');
  const m = String(now.getUTCMinutes()).padStart(2, '0');
  const s = String(now.getUTCSeconds()).padStart(2, '0');
  document.getElementById('live-clock').textContent = `${h}:${m}:${s} UTC`;
}

setInterval(updateClock, 1000);
updateClock();

// ── Status cycle ──
const STATUS_MSGS = [
  'SCANNING NETWORK...',
  'TRACKING 1,247 WALLETS',
  'MEMPOOL INDEXING...',
  'SIGNAL MATRIX ACTIVE',
  'MONITORING 8.4M TX/DAY',
];

let statusIdx = 0;
setInterval(() => {
  if (window.huntModeActive) return;
  statusIdx = (statusIdx + 1) % STATUS_MSGS.length;
  document.getElementById('status-text').textContent = STATUS_MSGS[statusIdx];
}, 4000);

// ── Ticker duplication for seamless loop ──
function setupTicker() {
  const track = document.getElementById('ticker-track');
  const clone = track.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.parentElement.appendChild(clone);
}

// ── Popup ──
function showPopup(title, body) {
  document.getElementById('popup-title').textContent = title;
  document.getElementById('popup-body').innerHTML = body;
  document.getElementById('terminal-popup').classList.remove('hidden');
}

function closePopup() {
  document.getElementById('terminal-popup').classList.add('hidden');
}

// ── Keyboard shortcuts ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePopup();
  if (e.key === 'h' || e.key === 'H') toggleHuntMode();
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    navigateFeed(e.key === 'ArrowDown' ? 1 : -1);
  }
});

function navigateFeed(dir) {
  if (!feedTokens.length) return;
  const currentIdx = feedTokens.findIndex(t => t.id === activeTokenId);
  let next = currentIdx + dir;
  if (next < 0) next = 0;
  if (next >= feedTokens.length) next = feedTokens.length - 1;
  if (feedTokens[next]) lockTarget(feedTokens[next].id);
}

// ── Random terminal popups ──
const RANDOM_ALERTS = [
  { title: '⚡ SIGNAL', body: 'Smart money entered $BORK<br><span style="opacity:0.6;font-size:11px">3 tracked wallets — total: 18.4 SOL</span>' },
  { title: '⚠ PUMP ALERT', body: '$CLOWN up +220% in 6 minutes<br><span style="opacity:0.6;font-size:11px">Liquidity: $180K — still early</span>' },
  { title: '🔴 EXIT SIGNAL', body: '$MOON showing dump patterns<br><span style="opacity:0.6;font-size:11px">Top wallets selling — exit window closing</span>' },
  { title: '◈ NEW TOKEN', body: '$FROGE launched on Raydium<br><span style="opacity:0.6;font-size:11px">12 holders — 0 minutes old</span>' },
];

setInterval(() => {
  if (Math.random() < 0.3) {
    const alert = RANDOM_ALERTS[randInt(0, RANDOM_ALERTS.length - 1)];
    showPopup(alert.title, alert.body);
    setTimeout(closePopup, 3000);
  }
}, window.huntModeActive ? 6000 : 12000);

// ── Init ──
setupTicker();
initFeed();
initIntel();

// Initial signal count
setTimeout(updateSignalCount, 500);

// Canvas resize on window resize
window.addEventListener('resize', () => {
  if (activeTokenId) {
    const t = feedTokens.find(x => x.id === activeTokenId);
    if (t) drawChart('price-chart', t.chartData, t.change >= 0);
  }
});

// Terminal boot message
console.log('%c HUNT.FUN TERMINAL v0.9.1 ', 'background:#000;color:#00ff41;font-family:monospace;font-size:14px;border:1px solid #00ff41;padding:4px 8px;');
console.log('%c Hunt early. Exit before they arrive. ', 'color:#00ff41;font-family:monospace;font-size:11px;');
