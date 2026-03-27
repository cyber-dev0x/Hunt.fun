# HUNT.FUN

> Hunt early. Exit before they arrive.

A real-time Solana memecoin signal terminal with a neon-green hacker shell aesthetic.

## Overview

This repository contains a static HTML/CSS/JS demo site for a Solana memecoin hunting terminal. It is built without frameworks and runs directly from `index.html`.

## Repository contents

- `index.html` — boot interface and entry screen
- `app.html` — main terminal interface with live feed and charts
- `css/` — style sheets for terminal layout, animations, and visual effects
- `js/` — JavaScript modules for feed generation, chart rendering, wallet intelligence, and UX controls
- `assets/` — static images, sounds, and other media used in the UI
- `.github/workflows/lint.yml` — GitHub Actions workflow for code validation
- `LICENSE` — MIT license for the repository
- `.gitignore` — local files excluded from version control

## Features

- Live token feed with signal classification
- Target lock, chart preview, and signal score display
- Wallet analytics panel with risk indicators
- Hunt Mode for faster updates and highlighted triggers
- Retro terminal style with CRT scanlines and neon glow

## Local preview

1. Open `index.html` in a browser
2. Click ENTER to load the terminal UI
3. Use the keyboard shortcuts:
   - `H` — toggle Hunt Mode
   - `↑ / ↓` — navigate feed
   - `Esc` — close popups

## Development notes

- No build step required
- Static site can be served from GitHub Pages or Vercel
- Keep `.vercel/` local when deploying to Vercel, but do not commit secrets or sensitive data

## Standard GitHub repository setup

This repository now includes:

- `README.md` with project overview and usage instructions
- `LICENSE` for open source distribution
- GitHub Actions workflow for linting static assets
- Clean folder layout suitable for a static project

## License

This project is licensed under the MIT License.
