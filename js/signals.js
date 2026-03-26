// ══════════════════════════════════════════
// HUNT.FUN — SIGNAL SYSTEM
// ══════════════════════════════════════════

const TOKEN_POOL = [
  { ticker: '$CLOWN',  name: 'ClownFi',       base: 0.00042 },
  { ticker: '$BORK',   name: 'BorkChain',     base: 0.00018 },
  { ticker: '$MEOW',   name: 'MeowDAO',       base: 0.00091 },
  { ticker: '$DOGE2',  name: 'DogeTwo',       base: 0.00034 },
  { ticker: '$PEPO',   name: 'PepoToken',     base: 0.00007 },
  { ticker: '$MOON',   name: 'MoonBase',      base: 0.00210 },
  { ticker: '$FROG',   name: 'FrogNation',    base: 0.00053 },
  { ticker: '$PLONK',  name: 'PlonkFi',       base: 0.00012 },
  { ticker: '$WOJAK',  name: 'WojakCoin',     base: 0.00088 },
  { ticker: '$GIGA',   name: 'GigaBrain',     base: 0.00031 },
  { ticker: '$CHAD',   name: 'ChadToken',     base: 0.00066 },
  { ticker: '$BASED',  name: 'BasedLabs',     base: 0.00014 },
  { ticker: '$NPC',    name: 'NPCoin',        base: 0.00003 },
  { ticker: '$COPE',   name: 'Copium',        base: 0.00022 },
  { ticker: '$WAGMI',  name: 'WAGMI Protocol',base: 0.00140 },
  { ticker: '$NGMI',   name: 'NGMI Token',    base: 0.00005 },
  { ticker: '$APE',    name: 'ApeFi',         base: 0.00073 },
  { ticker: '$BONK2',  name: 'BonkTwo',       base: 0.00029 },
  { ticker: '$ZEN',    name: 'ZenMeme',       base: 0.00044 },
  { ticker: '$HYPE',   name: 'HypeDAO',       base: 0.00019 },
];

const SIGNAL_TYPES = ['early', 'hot', 'pump', 'late', 'anomaly', 'watching'];
const SIGNAL_LABELS = {
  early:    'EARLY',
  hot:      'HOT',
  pump:     'PUMP',
  late:     'TOO LATE',
  anomaly:  '⚠ ANOMALY',
  watching: 'WATCHING',
};

const DEXES = ['Raydium', 'Orca', 'Jupiter', 'Meteora', 'OpenBook'];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randInt(min, max) {
  return Math.floor(rand(min, max + 1));
}

function fmtPct(n) {
  return (n >= 0 ? '+' : '') + n.toFixed(1) + '%';
}

function fmtLiq(n) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return '$' + (n / 1_000).toFixed(0) + 'K';
  return '$' + n.toFixed(0);
}

function fmtMcap(n) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000)     return '$' + (n / 1_000).toFixed(0) + 'K';
  return '$' + n.toFixed(0);
}

function calcSignalType(change, liq, age) {
  if (change > 200) return 'anomaly';
  if (change > 80 && liq > 50000) return 'hot';
  if (change > 40 && age < 10) return 'early';
  if (change > 60) return 'pump';
  if (change < -20 || age > 60) return 'late';
  return 'watching';
}

function calcScore(change, liq, holders, smartMoney) {
  let score = 0;
  score += Math.min(change * 0.3, 35);
  score += Math.min(liq / 5000, 25);
  score += Math.min(holders / 8, 20);
  score += smartMoney * 20;
  return Math.min(Math.round(score), 99);
}

function getVerdict(score) {
  if (score >= 80) return { text: 'STRONG SIGNAL — ENTER NOW', cls: 'strong' };
  if (score >= 60) return { text: 'SIGNAL FORMING', cls: 'medium' };
  if (score >= 40) return { text: 'WEAK SIGNAL — WATCH', cls: 'weak' };
  return { text: 'NO SIGNAL — AVOID', cls: 'danger' };
}

function generateToken(overrides = {}) {
  const base = TOKEN_POOL[randInt(0, TOKEN_POOL.length - 1)];
  const change = rand(-30, 340);
  const liq = rand(5000, 400000);
  const age = randInt(1, 120);
  const holders = randInt(10, 2000);
  const smartMoney = Math.random() > 0.75 ? 1 : 0;
  const score = calcScore(change, liq, holders, smartMoney);
  const signalType = calcSignalType(change, liq, age);
  const dex = DEXES[randInt(0, DEXES.length - 1)];
  const mcap = liq * rand(3, 12);
  const topWallet = rand(5, 45);

  return {
    ticker: base.ticker,
    name: base.name,
    change,
    liq,
    age,
    holders,
    smartMoney,
    score,
    signalType,
    dex,
    mcap,
    topWallet,
    id: Math.random().toString(36).slice(2),
    chartData: generateChartData(change),
    ...overrides,
  };
}

function generateChartData(totalChange) {
  const points = 40;
  const data = [];
  let price = 100;
  const trend = totalChange / points;

  for (let i = 0; i < points; i++) {
    const noise = rand(-6, 6);
    const trendBias = trend * (i / points);
    price = Math.max(1, price + trendBias + noise);
    data.push(price);
  }

  return data;
}
