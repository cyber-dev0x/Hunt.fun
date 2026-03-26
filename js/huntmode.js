// ══════════════════════════════════════════
// HUNT.FUN — HUNT MODE
// ══════════════════════════════════════════

window.huntModeActive = false;

function toggleHuntMode() {
  window.huntModeActive = !window.huntModeActive;

  const body = document.body;
  const btn = document.getElementById('hunt-mode-btn');
  const status = document.getElementById('hm-status');
  const overlay = document.getElementById('hunt-mode-overlay');
  const statusText = document.getElementById('status-text');

  if (window.huntModeActive) {
    body.classList.add('hunt-mode');
    overlay.classList.remove('hidden');
    status.textContent = 'ON';
    status.classList.add('active');
    btn.style.borderColor = 'var(--red)';
    statusText.textContent = '⚠ HUNT MODE ACTIVE — TRACKING';
    statusText.style.color = 'var(--red)';

    showPopup('HUNT MODE ACTIVATED', `
      <div style="color:var(--red);text-shadow:0 0 10px var(--red)">MAXIMUM AGGRESSION</div>
      <div style="margin-top:8px;font-size:11px;opacity:0.7">Update speed: 800ms<br>Signal threshold: lowered<br>Highlights: maximized</div>
    `);
    setTimeout(closePopup, 2200);

    // Faster feed
    startFeedUpdates();

    // Flash scanlines more aggressively
    document.querySelector('.scanlines').style.opacity = '1.5';

  } else {
    body.classList.remove('hunt-mode');
    overlay.classList.add('hidden');
    status.textContent = 'OFF';
    status.classList.remove('active');
    btn.style.borderColor = '';
    statusText.textContent = 'SCANNING NETWORK...';
    statusText.style.color = '';

    startFeedUpdates();
    document.querySelector('.scanlines').style.opacity = '1';
  }
}
