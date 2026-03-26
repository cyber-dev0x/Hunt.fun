# HUNT.FUN

> Hunt early. Exit before they arrive.

A real-time Solana memecoin signal terminal. Black screen, neon green, no mercy.

## What It Is

Not a dashboard. Not a landing page. A hunting terminal built for speed and early signal detection in the Solana memecoin market.

## Features

- **Live Feed** — new tokens, spikes, anomalies with signal classification
- **Active Target** — lock any token, view chart + signal score (0–99)
- **Signal Score System** — composite score from price action, liquidity, holders, smart money
- **Wallet Tracker** — 1,247 monitored wallets, smart money detection
- **Narrative Scanner** — trending meta detection
- **Risk Indicators** — rug score, LP lock, mint authority, bundle detection
- **Entry Alerts** — real-time terminal popups
- **Hunt Mode** — faster updates, aggressive highlights (press `H`)

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `H` | Toggle Hunt Mode |
| `↑ / ↓` | Navigate feed |
| `Esc` | Close popup |

## Stack

Pure HTML / CSS / JS. No frameworks. No build step. Open `index.html`.

## Structure

```
hunt.funn/
├── index.html        Boot terminal + enter screen
├── app.html          Main 3-column interface
├── css/
│   ├── terminal.css  Base terminal styles + CRT effects
│   ├── app.css       Main app layout + components
│   └── animations.css Keyframes + effects
├── js/
│   ├── boot.js       Boot sequence
│   ├── signals.js    Token generation + signal math
│   ├── chart.js      Canvas price chart renderer
│   ├── feed.js       Live feed engine + target lock
│   ├── wallets.js    Intel panel (wallets, narratives, risks)
│   ├── huntmode.js   Hunt mode toggle
│   └── app.js        App init, clock, shortcuts, popups
└── assets/
```

## Design

- Font: VT323 (display) + Share Tech Mono (body)
- Colors: `#000000` bg · `#00ff41` green · `#ff2222` red
- CRT scanlines · radial vignette · glow effects
- Pixel borders, clip-path buttons, terminal popups

---

*This is a demo UI. No real blockchain data is used.*
