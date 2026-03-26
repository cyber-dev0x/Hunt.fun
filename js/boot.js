// ══════════════════════════════════════════
// HUNT.FUN — BOOT SEQUENCE
// ══════════════════════════════════════════

const BOOT_LINES = [
  { text: '> INITIALIZING HUNT.FUN v0.9.1...', delay: 0, type: '' },
  { text: '> LOADING SOLANA RPC NODES...', delay: 320, type: '' },
  { text: '> NODE 1: OK  NODE 2: OK  NODE 3: LATENCY 12ms', delay: 620, type: '' },
  { text: '> CONNECTING TO MEMPOOL STREAM...', delay: 980, type: '' },
  { text: '> STREAM ESTABLISHED. PACKETS FLOWING.', delay: 1280, type: 'success' },
  { text: '> LOADING SIGNAL MATRIX... [████████████████████] 100%', delay: 1600, type: '' },
  { text: '> SCANNING NETWORK...', delay: 1900, type: '' },
  { text: '> 8,441,200 TRANSACTIONS INDEXED', delay: 2200, type: '' },
  { text: '> ANOMALY DETECTION: ARMED', delay: 2480, type: '' },
  { text: '> WALLET TRACKER: ONLINE — 1,247 WALLETS MONITORED', delay: 2750, type: '' },
  { text: '> NARRATIVE ENGINE: RUNNING', delay: 3000, type: '' },
  { text: '⚠ WARNING: HIGH VOLATILITY DETECTED IN MULTIPLE PAIRS', delay: 3280, type: 'warn' },
  { text: '> SIGNAL DETECTED — CONFIDENCE: HIGH', delay: 3580, type: 'success' },
  { text: '> 3 NEW TOKENS IN LAST 60 SECONDS', delay: 3820, type: 'success' },
  { text: '', delay: 4100, type: '' },
  { text: '> SYSTEM READY. INITIATING HUNT INTERFACE...', delay: 4350, type: 'success' },
];

const bootEl = document.getElementById('boot-lines');
const enterWrap = document.getElementById('enter-btn-wrap');

function spawnLine(cfg) {
  return new Promise(resolve => {
    setTimeout(() => {
      const span = document.createElement('span');
      span.className = 'line' + (cfg.type ? ' ' + cfg.type : '');
      span.textContent = cfg.text;
      bootEl.appendChild(span);
      bootEl.scrollTop = bootEl.scrollHeight;
      resolve();
    }, cfg.delay);
  });
}

async function runBoot() {
  const promises = BOOT_LINES.map(cfg => spawnLine(cfg));
  await Promise.all(promises);

  setTimeout(() => {
    enterWrap.classList.remove('hidden');
    enterWrap.style.animation = 'popupAppear 0.4s ease-out forwards';
  }, 4700);
}

function enterHunt() {
  document.body.style.transition = 'opacity 0.4s';
  document.body.style.opacity = '0';
  setTimeout(() => {
    window.location.href = 'app.html';
  }, 420);
}

runBoot();
