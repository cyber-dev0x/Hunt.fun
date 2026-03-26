// ══════════════════════════════════════════
// HUNT.FUN — LIVE FEED ENGINE
// ══════════════════════════════════════════

let feedTokens = [];
let feedFilter = 'all';
let activeTokenId = null;
let feedInterval = null;

const MAX_FEED_ITEMS = 24;

function initFeed() {
  // Pre-populate with tokens
  for (let i = 0; i < 14; i++) {
    feedTokens.push(generateToken());
  }
  renderFeed();
  startFeedUpdates();
}

function startFeedUpdates() {
  const interval = window.huntModeActive ? 800 : 2200;

  clearInterval(feedInterval);
  feedInterval = setInterval(() => {
    const roll = Math.random();

    if (roll < 0.4) {
      // New token at top
      const t = generateToken();
      feedTokens.unshift(t);
      if (feedTokens.length > MAX_FEED_ITEMS) feedTokens.pop();
    } else {
      // Update existing token price
      const idx = randInt(0, feedTokens.length - 1);
      const t = feedTokens[idx];
      const delta = rand(-15, 25);
      t.change += delta;
      t.liq *= rand(0.9, 1.15);
      t.signalType = calcSignalType(t.change, t.liq, t.age);
      t.score = calcScore(t.change, t.liq, t.holders, t.smartMoney);
      t.chartData = generateChartData(t.change);

      // If this is the active token, update center panel
      if (t.id === activeTokenId) {
        renderTargetPanel(t);
      }
    }

    renderFeed();
    updateSignalCount();
  }, interval);
}

function renderFeed() {
  const container = document.getElementById('live-feed');
  const filtered = feedFilter === 'all'
    ? feedTokens
    : feedTokens.filter(t => {
        if (feedFilter === 'spikes')  return t.change > 50;
        if (feedFilter === 'new')     return t.age < 15;
        if (feedFilter === 'anomaly') return t.signalType === 'anomaly';
        return true;
      });

  container.innerHTML = '';

  filtered.forEach((t, i) => {
    const item = document.createElement('div');
    item.className = 'feed-item pixel-hover' + (t.id === activeTokenId ? ' active' : '') + (i === 0 ? ' new-token' : '');
    item.dataset.id = t.id;
    item.onclick = () => lockTarget(t.id);

    const changeClass = t.change > 100 ? 'fire' : t.change >= 0 ? 'up' : 'down';

    item.innerHTML = `
      <div class="feed-name">${t.ticker}</div>
      <div class="feed-change ${changeClass}">${fmtPct(t.change)}</div>
      <div class="feed-liq">${fmtLiq(t.liq)}</div>
      <div class="feed-signal ${t.signalType}">${SIGNAL_LABELS[t.signalType]}</div>
    `;

    container.appendChild(item);
  });
}

function filterFeed(type) {
  feedFilter = type;
  document.querySelectorAll('.ctrl-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderFeed();
}

function lockTarget(id) {
  activeTokenId = id;
  const t = feedTokens.find(x => x.id === id);
  if (!t) return;

  // Hide no-target display
  document.getElementById('target-display').style.display = 'none';
  document.getElementById('target-content').classList.remove('hidden');

  const badge = document.getElementById('target-status');
  badge.textContent = 'LOCKED';
  badge.className = 'target-badge locked';

  renderTargetPanel(t);
  renderFeed();

  // Popup flash
  showPopup('TARGET LOCKED', `
    <div style="color:var(--green)">Tracking <strong>${t.ticker}</strong></div>
    <div style="opacity:0.6;margin-top:4px;font-size:11px">Signal score: ${t.score}/99</div>
    <div style="margin-top:6px">${getVerdict(t.score).text}</div>
  `);

  setTimeout(closePopup, 2800);
}

function renderTargetPanel(t) {
  document.getElementById('t-ticker').textContent    = t.ticker;
  document.getElementById('t-name').textContent      = t.name;
  document.getElementById('t-age').textContent       = t.age + 'm ago';
  document.getElementById('t-liq').textContent       = fmtLiq(t.liq);
  document.getElementById('t-mcap').textContent      = fmtMcap(t.mcap);
  document.getElementById('t-holders').textContent   = t.holders.toLocaleString();
  document.getElementById('t-created').textContent   = t.age + 'm ago';
  document.getElementById('t-dex').textContent       = t.dex;
  document.getElementById('t-topwallet').textContent = t.topWallet.toFixed(1) + '%';

  const changeEl = document.getElementById('t-change');
  changeEl.textContent = fmtPct(t.change);
  changeEl.className = 'target-change ' + (t.change >= 0 ? 'up' : 'down');

  // Score
  const scoreBar = document.getElementById('score-bar');
  const scoreVal = document.getElementById('score-value');
  const scoreVerdict = document.getElementById('score-verdict');
  const verdict = getVerdict(t.score);

  scoreBar.style.width = t.score + '%';
  scoreBar.style.background = t.score > 70 ? 'var(--green)' : t.score > 40 ? 'var(--yellow)' : 'var(--red)';
  scoreBar.style.boxShadow = `0 0 10px ${t.score > 70 ? 'var(--green)' : t.score > 40 ? 'var(--yellow)' : 'var(--red)'}`;
  scoreVal.textContent = t.score;
  scoreVerdict.textContent = verdict.text;
  scoreVerdict.className = 'score-verdict ' + verdict.cls;

  // Chart
  setTimeout(() => {
    drawChart('price-chart', t.chartData, t.change >= 0);
  }, 50);
}

function updateSignalCount() {
  const hot = feedTokens.filter(t => ['hot', 'early', 'anomaly'].includes(t.signalType)).length;
  document.getElementById('signal-count').textContent = hot + ' SIGNALS DETECTED';
}

function openTrade(type) {
  if (!activeTokenId) return;
  const t = feedTokens.find(x => x.id === activeTokenId);
  showPopup('DEX BRIDGE', `
    <div style="opacity:0.6;font-size:11px;margin-bottom:8px">ROUTING VIA ${t.dex.toUpperCase()}</div>
    <div>${t.ticker} — ${fmtPct(t.change)}</div>
    <div style="margin-top:8px;opacity:0.5;font-size:10px">Connect wallet to proceed.</div>
    <div style="margin-top:4px;opacity:0.4;font-size:9px">This is a demo — no real transactions.</div>
  `);
  setTimeout(closePopup, 3500);
}

function trackTarget() {
  if (!activeTokenId) return;
  const t = feedTokens.find(x => x.id === activeTokenId);
  showPopup('WALLET TRACKED', `
    <div>${t.ticker} added to watch list</div>
    <div style="margin-top:6px;opacity:0.6;font-size:11px">Alert on: +20% move, whale entry, liquidity spike</div>
  `);
  setTimeout(closePopup, 2500);
}
