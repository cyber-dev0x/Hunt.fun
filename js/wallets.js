// ══════════════════════════════════════════
// HUNT.FUN — WALLET & INTEL ENGINE
// ══════════════════════════════════════════

const WALLETS = [
  { addr: '7xKp...m4Rq', label: 'SMART #1',  roi: '+4,210%', active: true  },
  { addr: '3nBz...w9Ys', label: 'WHALE A',   roi: '+820%',  active: false },
  { addr: 'Kd92...pL7t', label: 'INSIDER',   roi: '+12,100%', active: true },
  { addr: '1qRm...8vNc', label: 'SMART #2',  roi: '+1,640%', active: false },
  { addr: '5fHj...z3Ew', label: 'DEGEN PRO', roi: '+390%',  active: true  },
];

const NARRATIVES = [
  { tag: '#AI-MEME',    strength: 'strong', pct: 92 },
  { tag: '#DOG-COINS',  strength: 'med',    pct: 67 },
  { tag: '#RETRO-FI',   strength: 'strong', pct: 88 },
  { tag: '#L2-MEMES',   strength: 'weak',   pct: 31 },
  { tag: '#JEET-FARM',  strength: 'med',    pct: 54 },
];

const RISKS = [
  { label: 'RUG SCORE',      val: 'LOW',  cls: 'low'  },
  { label: 'LP LOCKED',      val: 'YES',  cls: 'low'  },
  { label: 'MINT AUTHORITY', val: 'NONE', cls: 'low'  },
  { label: 'TOP 10 HOLD %',  val: 'MED',  cls: 'med'  },
  { label: 'BUNDLE DETECTED',val: 'NO',   cls: 'low'  },
];

function renderWallets() {
  const el = document.getElementById('wallet-list');
  el.innerHTML = WALLETS.map(w => `
    <div class="wallet-item">
      <div>
        <div class="wallet-label">${w.label}</div>
        <div class="wallet-addr">${w.addr}</div>
      </div>
      <div style="text-align:right">
        <div class="wallet-roi">${w.roi}</div>
        <div class="wallet-status ${w.active ? 'active' : ''}">${w.active ? 'ACTIVE' : 'IDLE'}</div>
      </div>
    </div>
  `).join('');
}

function renderNarratives() {
  const el = document.getElementById('narrative-list');
  el.innerHTML = NARRATIVES.map(n => `
    <div class="narrative-item">
      <span class="narrative-tag">${n.tag}</span>
      <span class="narrative-strength ${n.strength}">${n.pct}%</span>
    </div>
  `).join('');
}

function renderRisks() {
  const el = document.getElementById('risk-list');
  el.innerHTML = RISKS.map(r => `
    <div class="risk-item">
      <span class="risk-label">${r.label}</span>
      <span class="risk-val ${r.cls}">${r.val}</span>
    </div>
  `).join('');
}

function initAlerts() {
  const ALERT_MSGS = [
    { text: 'Smart money entered $CLOWN — 2 wallets', cls: 'hot', time: 'just now' },
    { text: 'Liquidity spike: $FROG +$85K in 3min', cls: '', time: '1m ago' },
    { text: 'New token: $PLONK — watch for pump', cls: 'warn', time: '2m ago' },
    { text: '$WAGMI entering exit phase', cls: 'warn', time: '4m ago' },
    { text: 'Whale bought 28 SOL of $GIGA', cls: 'hot', time: '6m ago' },
  ];

  const el = document.getElementById('alert-list');
  el.innerHTML = ALERT_MSGS.map(a => `
    <div class="alert-entry ${a.cls}">
      <div>${a.text}</div>
      <div class="alert-time">${a.time}</div>
    </div>
  `).join('');

  // Rotate alerts
  setInterval(() => {
    const FRESH = [
      { text: `Pump forming: ${pickTicker()} — signal: ${randInt(60,99)}/99`, cls: 'hot', time: 'just now' },
      { text: `Smart money exit: ${pickTicker()}`, cls: 'warn', time: 'just now' },
      { text: `New token launched: ${pickTicker()} on Raydium`, cls: '', time: 'just now' },
      { text: `Anomaly detected: ${pickTicker()} +${randInt(100,400)}% in ${randInt(1,5)}m`, cls: 'hot', time: 'just now' },
    ];
    const msg = FRESH[randInt(0, FRESH.length - 1)];
    const div = document.createElement('div');
    div.className = 'alert-entry ' + msg.cls;
    div.innerHTML = `<div>${msg.text}</div><div class="alert-time">${msg.time}</div>`;
    el.insertBefore(div, el.firstChild);
    if (el.children.length > 6) el.removeChild(el.lastChild);
  }, window.huntModeActive ? 1800 : 4000);
}

function pickTicker() {
  const tickers = ['$CLOWN','$BORK','$FROG','$GIGA','$PEPO','$CHAD','$WOJAK','$COPE'];
  return tickers[randInt(0, tickers.length - 1)];
}

function initIntel() {
  renderWallets();
  renderNarratives();
  renderRisks();
  initAlerts();

  // Randomly toggle wallet active states
  setInterval(() => {
    const w = WALLETS[randInt(0, WALLETS.length - 1)];
    w.active = !w.active;
    renderWallets();
  }, 5000);
}
