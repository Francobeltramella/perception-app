import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Inter+Tight:wght@600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #111111; color: #F5F1E8;
    -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
  }
  :root {
    --bg:      #111111;
    --surface: #1C1C1C;
    --surface2:#222222;
    --border:  #2B2B2B;
    --bh:      #3A3A3A;
    --text:    #F5F1E8;
    --muted:   #707070;
    --muted2:  #A0A0A0;
    --muted3:  #C8C4BC;
    --copper:  #E06A2C;
    --copper-l:#f0844a;
    --copper-d:rgba(224,106,44,0.14);
    --copper-g:rgba(224,106,44,0.20);
    --ok:      #4CAF82;
    --warn:    #E0A52C;
    --danger:  #E05252;
  }
  .app { min-height: 100vh; display: flex; flex-direction: column; }
  ::selection { background: rgba(224,106,44,0.3); }

  /* ── KEYFRAMES ── */
  @keyframes fadeUp   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes scalePop { 0%{transform:scale(0.88);opacity:0} 60%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }
  @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.6)} }
  @keyframes scanRot  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes pRing    { 0%,100%{box-shadow:0 0 0 0 rgba(224,106,44,.36)} 50%{box-shadow:0 0 0 6px transparent} }
  @keyframes slideIn  { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
  @keyframes barGrow  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
  @keyframes breathe  { 0%,100%{transform:scale(1) translateY(0);opacity:.7} 50%{transform:scale(1.04) translateY(-3px);opacity:1} }

  /* stagger helpers */
  .reveal-1 { animation: fadeUp .5s ease both; }
  .reveal-2 { animation: fadeUp .5s .08s ease both; }
  .reveal-3 { animation: fadeUp .5s .16s ease both; }
  .reveal-4 { animation: fadeUp .5s .24s ease both; }
  .reveal-5 { animation: fadeUp .5s .32s ease both; }
  .reveal-6 { animation: fadeUp .5s .40s ease both; }

  /* ── NAV ── */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 2rem; border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 200;
    background: rgba(17,17,17,.95); backdrop-filter: blur(20px) saturate(1.4);
  }
  .nav-logo {
    display: flex; align-items: center; gap: .6rem;
    cursor: pointer; user-select: none;
  }
  .nav-logo-text {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-weight: 700; font-size: .92rem; letter-spacing: -.01em; color: var(--text);
  }
  .nav-right { display: flex; align-items: center; gap: 1rem; }
  .nav-badge {
    font-size: .62rem; letter-spacing: .1em; text-transform: uppercase;
    color: var(--copper); border: 1px solid rgba(224,106,44,.28);
    border-radius: 999px; padding: .2rem .7rem;
  }
  .nav-cta {
    background: var(--copper); color: #111; border: none; border-radius: 999px;
    padding: .45rem 1.1rem; font-size: .78rem; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: all .15s;
  }
  .nav-cta:hover { background: var(--copper-l); }

  /* ── HERO ── */
  .hero-wrap {
    position: relative; overflow: hidden;
    min-height: calc(100vh - 58px);
    display: flex; align-items: center; justify-content: center;
  }
  /* background eye watermark */
  .hero-eye-bg {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -52%);
    width: min(700px, 90vw); opacity: .035;
    pointer-events: none; z-index: 0;
    animation: breathe 8s ease-in-out infinite;
  }
  /* radial glow */
  .hero-glow {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 800px; height: 600px;
    background: radial-gradient(ellipse at center, rgba(224,106,44,.07) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }
  .hero-inner {
    position: relative; z-index: 1;
    max-width: 780px; width: 100%; margin: 0 auto;
    padding: 6rem 2rem 5rem; text-align: center;
  }
  .eyebrow {
    display: inline-flex; align-items: center; gap: .45rem;
    font-size: .67rem; letter-spacing: .14em; text-transform: uppercase;
    color: var(--copper); border: 1px solid rgba(224,106,44,.22);
    border-radius: 999px; padding: .3rem .9rem; margin-bottom: 2rem;
    animation: fadeIn .6s ease both;
  }
  .eyebrow-dot { width: 5px; height: 5px; background: var(--copper); border-radius: 50%; animation: pulse 2.2s ease-in-out infinite; flex-shrink: 0; }
  .hero h1 {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: clamp(2.8rem, 6vw, 4.8rem);
    font-weight: 800; line-height: 1.04; letter-spacing: -.035em;
    color: var(--text); margin-bottom: 1.5rem;
    animation: fadeUp .65s .1s ease both;
  }
  .hero h1 em { font-style: normal; color: var(--copper); }
  .hero-sub {
    font-size: 1.05rem; color: var(--muted2); line-height: 1.82;
    max-width: 500px; margin: 0 auto 2.75rem; font-weight: 400;
    animation: fadeUp .65s .2s ease both;
  }

  /* hero URL bar */
  .hero-url-bar {
    display: flex; gap: .5rem; max-width: 520px; margin: 0 auto 1.5rem;
    animation: fadeUp .65s .3s ease both;
  }
  .hero-url-input {
    flex: 1; background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: .85rem 1.1rem; font-size: .9rem;
    color: var(--text); font-family: inherit; outline: none;
    transition: border .2s, box-shadow .2s;
  }
  .hero-url-input:focus { border-color: var(--copper); box-shadow: 0 0 0 3px var(--copper-g); }
  .hero-url-input::placeholder { color: var(--muted); }
  .hero-url-btn {
    background: var(--copper); color: #111; border: none;
    border-radius: 12px; padding: .85rem 1.4rem;
    font-size: .88rem; font-weight: 700; cursor: pointer;
    font-family: inherit; white-space: nowrap; transition: all .15s;
    flex-shrink: 0;
  }
  .hero-url-btn:hover { background: var(--copper-l); transform: translateY(-1px); }
  .hero-url-btn:disabled { opacity: .4; cursor: not-allowed; transform: none; }

  .hero-alt {
    font-size: .75rem; color: var(--muted); animation: fadeUp .65s .38s ease both;
  }
  .hero-alt button {
    background: none; border: none; color: var(--muted2); font-family: inherit;
    font-size: inherit; cursor: pointer; text-decoration: underline;
    text-underline-offset: 3px; transition: color .15s;
  }
  .hero-alt button:hover { color: var(--text); }

  /* ── STATS BAR ── */
  .stats-bar {
    display: flex; justify-content: center; flex-wrap: wrap;
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  }
  .stat-item {
    flex: 1; min-width: 130px; text-align: center;
    padding: 2rem 1.5rem; border-right: 1px solid var(--border);
  }
  .stat-item:last-child { border-right: none; }
  .stat-val {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: 1.6rem; font-weight: 800; color: var(--text); line-height: 1;
  }
  .stat-lbl { font-size: .7rem; color: var(--muted); margin-top: .3rem; letter-spacing: .04em; }

  /* ── HOW SECTION ── */
  .how-section { max-width: 900px; margin: 0 auto; padding: 7rem 2rem; }
  .section-eyebrow { font-size: .66rem; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-bottom: .8rem; }
  .section-heading {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: clamp(1.9rem, 3.2vw, 2.6rem); font-weight: 800;
    letter-spacing: -.025em; color: var(--text); margin-bottom: 3rem;
    line-height: 1.1;
  }
  .step-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(195px,1fr)); gap: 1.1rem; }
  .step-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 20px; padding: 1.6rem; position: relative; overflow: hidden;
    transition: border-color .2s, transform .2s;
  }
  .step-card:hover { border-color: var(--bh); transform: translateY(-2px); }
  .step-card::after {
    content: ''; position: absolute; top: 0; right: 0;
    width: 80px; height: 80px;
    background: radial-gradient(ellipse at top right, rgba(224,106,44,.06), transparent);
  }
  .step-n {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: 2.6rem; font-weight: 800;
    color: rgba(224,106,44,.13); line-height: 1; margin-bottom: 1.1rem;
  }
  .step-t { font-size: .86rem; font-weight: 600; color: var(--text); margin-bottom: .4rem; }
  .step-d { font-size: .78rem; color: var(--muted); line-height: 1.7; }

  /* ── FORM ── */
  .form-wrap { flex: 1; display: flex; align-items: flex-start; justify-content: center; padding: 4rem 2rem 7rem; }
  .form-card {
    width: 100%; max-width: 560px; background: var(--surface);
    border: 1px solid var(--border); border-radius: 24px; padding: 2.5rem;
    animation: fadeUp .4s ease both;
  }
  .form-progress { display: flex; gap: .3rem; margin-bottom: 2.25rem; }
  .p-dot { flex: 1; height: 2px; border-radius: 1px; background: var(--border); transition: background .3s; }
  .p-dot.active { background: var(--copper); }
  .p-dot.done { background: rgba(224,106,44,.4); }
  .q-label {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: 1.25rem; font-weight: 700; margin-bottom: .4rem;
    letter-spacing: -.015em; line-height: 1.3; color: var(--text);
  }
  .q-sub { font-size: .8rem; color: var(--muted); margin-bottom: 1.6rem; line-height: 1.65; }
  .opt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(138px,1fr)); gap: .55rem; margin-bottom: 1.75rem; }
  .opt-btn {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 11px; padding: .75rem .9rem; font-size: .82rem;
    color: var(--muted3); cursor: pointer; font-family: inherit;
    text-align: left; transition: all .14s; line-height: 1.4;
  }
  .opt-btn:hover { border-color: var(--bh); color: var(--text); background: rgba(255,255,255,.025); }
  .opt-btn.sel { border-color: var(--copper); color: var(--copper); background: var(--copper-d); }
  .text-inp {
    width: 100%; background: var(--bg); border: 1px solid var(--border);
    border-radius: 11px; padding: .8rem 1rem; font-size: .88rem;
    color: var(--text); font-family: inherit; outline: none;
    transition: border .2s, box-shadow .2s; margin-bottom: 1.75rem;
    resize: none; line-height: 1.6;
  }
  .text-inp:focus { border-color: var(--copper); box-shadow: 0 0 0 3px var(--copper-g); }
  .text-inp::placeholder { color: var(--muted); }
  .url-inp {
    width: 100%; background: var(--bg); border: 1px solid var(--border);
    border-radius: 11px; padding: .8rem 1rem; font-size: .9rem;
    color: var(--text); font-family: inherit; outline: none;
    transition: border .2s, box-shadow .2s; margin-bottom: 1.1rem;
  }
  .url-inp:focus { border-color: var(--copper); box-shadow: 0 0 0 3px var(--copper-g); }
  .url-inp::placeholder { color: var(--muted); }
  .form-nav { display: flex; justify-content: space-between; align-items: center; }
  .back-btn {
    background: none; border: none; color: var(--muted); font-family: inherit;
    font-size: .82rem; cursor: pointer; padding: .4rem 0; transition: color .14s;
  }
  .back-btn:hover { color: var(--text); }
  .err-box {
    background: rgba(224,82,82,.07); border: 1px solid rgba(224,82,82,.2);
    border-radius: 10px; padding: .85rem 1rem; margin-bottom: 1rem;
    font-size: .8rem; color: #f4a0a0; line-height: 1.6;
  }
  .btn-primary {
    background: var(--copper); color: #111; border: none; border-radius: 999px;
    padding: .8rem 1.8rem; font-size: .88rem; font-weight: 700;
    cursor: pointer; font-family: inherit; transition: all .16s; letter-spacing: -.01em;
  }
  .btn-primary:hover { background: var(--copper-l); transform: translateY(-1px); box-shadow: 0 6px 22px var(--copper-g); }
  .btn-primary:active { transform: none; box-shadow: none; }
  .btn-primary:disabled { opacity: .38; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn-secondary {
    background: transparent; color: var(--muted3);
    border: 1px solid var(--border); border-radius: 999px;
    padding: .8rem 1.8rem; font-size: .88rem; font-weight: 500;
    cursor: pointer; font-family: inherit; transition: all .16s;
  }
  .btn-secondary:hover { border-color: var(--bh); color: var(--text); background: rgba(255,255,255,.025); }

  /* ── LOADING SCREEN ── */
  .loading-wrap {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: calc(100vh - 58px); padding: 2rem; text-align: center;
    position: relative; overflow: hidden;
  }
  .load-glow {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    width: 600px; height: 400px;
    background: radial-gradient(ellipse at center, rgba(224,106,44,.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .load-eye-wrap { position: relative; width: 120px; height: 120px; margin-bottom: 2.5rem; flex-shrink: 0; }
  /* outer scan ring */
  .load-scan-ring {
    position: absolute; inset: -12px; border-radius: 50%;
    border: 1.5px solid transparent;
    border-top-color: var(--copper);
    border-right-color: rgba(224,106,44,.3);
    animation: scanRot 1.6s linear infinite;
  }
  .load-scan-ring2 {
    position: absolute; inset: -22px; border-radius: 50%;
    border: 1px solid transparent;
    border-bottom-color: rgba(224,106,44,.18);
    animation: scanRot 2.8s linear infinite reverse;
  }
  .load-eye-svg {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    animation: breathe 2.6s ease-in-out infinite;
  }
  .load-msg-wrap { margin-bottom: 2.5rem; position: relative; z-index: 1; }
  .load-msg {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: 1.1rem; font-weight: 700; color: var(--text);
    margin-bottom: .45rem; animation: slideIn .35s ease both;
  }
  .load-url { font-size: .76rem; color: var(--muted); line-height: 1.6; }
  /* step progress */
  .load-steps { display: flex; flex-direction: column; gap: .45rem; width: 100%; max-width: 260px; position: relative; z-index: 1; }
  .ls { display: flex; align-items: center; gap: .6rem; font-size: .76rem; color: var(--muted); transition: color .3s; }
  .ls.done { color: var(--ok); }
  .ls.cur  { color: var(--text); }
  .ls-dot {
    width: 14px; height: 14px; border-radius: 50%; border: 1px solid var(--border);
    flex-shrink: 0; transition: all .3s; display: flex; align-items: center;
    justify-content: center; font-size: 7px;
  }
  .ls.done .ls-dot { background: var(--ok); border-color: var(--ok); color: #111; }
  .ls.cur  .ls-dot { border-color: var(--copper); animation: pRing 1.1s ease-in-out infinite; }

  /* ── RESULTS ── */
  .results-wrap { max-width: 860px; margin: 0 auto; padding: 4rem 2rem 7rem; }

  /* hero score block */
  .score-hero {
    text-align: center; padding: 4rem 2rem 3rem;
    border-bottom: 1px solid var(--border); margin-bottom: 3.5rem;
    position: relative;
  }
  .score-hero::before {
    content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 500px; height: 350px;
    background: radial-gradient(ellipse at center, rgba(224,106,44,.07) 0%, transparent 68%);
    pointer-events: none;
  }
  .score-eyebrow {
    font-size: .66rem; letter-spacing: .14em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 1.5rem; position: relative;
  }
  .score-big {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: clamp(5.5rem, 14vw, 9rem);
    font-weight: 800; line-height: 1; color: var(--copper);
    letter-spacing: -.05em; position: relative;
    animation: scalePop .7s .1s ease both;
  }
  .score-grade-label {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: clamp(1.1rem, 2.5vw, 1.5rem); font-weight: 700;
    color: var(--text); margin-top: .5rem; letter-spacing: -.015em;
    animation: fadeUp .5s .5s ease both;
  }
  .score-summary {
    max-width: 520px; margin: 1.25rem auto 2rem; font-size: .92rem;
    color: var(--muted2); line-height: 1.8;
    animation: fadeUp .5s .6s ease both;
  }
  .score-chips { display: flex; gap: .65rem; justify-content: center; flex-wrap: wrap; animation: fadeUp .5s .7s ease both; }
  .score-chip {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; padding: .85rem 1.5rem; text-align: center; min-width: 110px;
  }
  .chip-val {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: 1.4rem; font-weight: 800;
  }
  .chip-val.pot { color: var(--text); }
  .chip-val.gap { color: var(--copper); }
  .chip-lbl { font-size: .62rem; color: var(--muted); margin-top: .2rem; letter-spacing: .08em; text-transform: uppercase; }

  /* score ring (used in header) */
  .ring-wrap { position: relative; width: 180px; height: 180px; margin: 1.5rem auto; }
  .ring-inner {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .ring-num {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: 3rem; font-weight: 800; line-height: 1; color: var(--copper);
  }
  .ring-sub { font-size: .7rem; color: var(--muted); margin-top: .15rem; }

  /* ── SECTION BLOCK ── */
  .sec-block { margin: 3rem 0; }
  .sec-title {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: 1.15rem; font-weight: 700; color: var(--text); margin-bottom: .3rem;
  }
  .sec-sub { font-size: .78rem; color: var(--muted); margin-bottom: 1.5rem; line-height: 1.65; }

  /* ── PERCEPT BARS ── */
  .percept-list { display: flex; flex-direction: column; gap: .8rem; }
  .percept-row-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 1.1rem 1.3rem; transition: border-color .2s;
  }
  .percept-row-card:hover { border-color: var(--bh); }
  .pr-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: .6rem; }
  .pr-left { display: flex; align-items: center; gap: .5rem; }
  .pr-letter { font-size: .58rem; font-weight: 700; letter-spacing: .16em; color: var(--muted); text-transform: uppercase; }
  .pr-name { font-size: .82rem; font-weight: 500; color: var(--text); }
  .pr-score {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: .9rem; font-weight: 700;
  }
  .bar-t { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .bar-f { height: 100%; border-radius: 2px; transform-origin: left; transition: width 1.4s cubic-bezier(.16,1,.3,1); }
  .pr-desc { font-size: .7rem; color: var(--muted); margin-top: .45rem; line-height: 1.6; }

  /* ── INSIGHT CARDS ── */
  .insight-grid { display: flex; flex-direction: column; gap: .55rem; }
  .insight-card {
    display: flex; align-items: flex-start; gap: .7rem;
    padding: .9rem 1.1rem; background: var(--surface);
    border: 1px solid var(--border); border-radius: 13px; transition: border-color .2s;
  }
  .insight-card:hover { border-color: var(--bh); }
  .ic-icon { font-size: .72rem; flex-shrink: 0; margin-top: .14rem; font-weight: 700; }
  .ic-icon.ok   { color: var(--ok); }
  .ic-icon.warn { color: var(--warn); }
  .ic-text { font-size: .82rem; line-height: 1.65; color: var(--muted3); }

  /* ── LOCKED ── */
  .locked-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(235px,1fr)); gap: .85rem; }
  .locked-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 15px; padding: 1.2rem; position: relative;
    overflow: hidden; min-height: 96px;
  }
  .locked-card::before {
    content: ''; position: absolute; inset: 0;
    background: rgba(17,17,17,.74); backdrop-filter: blur(6px);
    border-radius: 15px; z-index: 1;
  }
  .locked-content { filter: blur(2px); user-select: none; }
  .locked-badge {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    display: flex; flex-direction: column; align-items: center; gap: .35rem; z-index: 2;
  }
  .locked-pill {
    font-size: .61rem; letter-spacing: .14em; text-transform: uppercase;
    color: var(--muted3); background: var(--surface2);
    border: 1px solid var(--border); border-radius: 999px;
    padding: .18rem .7rem; white-space: nowrap;
  }
  .lc-title { font-size: .83rem; font-weight: 600; margin-bottom: .3rem; color: var(--text); }
  .lc-desc  { font-size: .74rem; color: var(--muted); line-height: 1.6; }

  /* ── CTA BOX ── */
  .cta-box {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 24px; padding: 3.5rem 2rem; text-align: center;
    margin: 3rem 0; position: relative; overflow: hidden;
  }
  .cta-box::before {
    content: ''; position: absolute; top: -50px; left: 50%; transform: translateX(-50%);
    width: 400px; height: 250px;
    background: radial-gradient(ellipse at center, rgba(224,106,44,.08) 0%, transparent 68%);
    pointer-events: none;
  }
  .cta-box h2 {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800;
    letter-spacing: -.022em; margin-bottom: .75rem; color: var(--text); position: relative;
  }
  .cta-box p {
    color: var(--muted); font-size: .9rem; line-height: 1.75; max-width: 420px;
    margin: 0 auto 1.75rem; position: relative;
  }
  .cta-btns { display: flex; gap: .75rem; justify-content: center; flex-wrap: wrap; position: relative; }

  /* ── SEO SECTIONS ── */
  .seo-wrap { max-width: 800px; margin: 0 auto; padding: 0 2rem 2rem; }
  .seo-sec { padding: 5rem 0; border-bottom: 1px solid var(--border); }
  .seo-sec:last-child { border-bottom: none; }
  .seo-sec h2 {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: clamp(1.4rem, 2.8vw, 1.9rem); font-weight: 800;
    letter-spacing: -.022em; color: var(--text); margin-bottom: 1.1rem; line-height: 1.15;
  }
  .seo-sec h2 em { font-style: normal; color: var(--copper); }
  .seo-sec p { font-size: .94rem; color: var(--muted2); line-height: 1.85; max-width: 630px; }
  .seo-list { margin-top: 1.1rem; padding: 0; list-style: none; display: flex; flex-direction: column; gap: .5rem; }
  .seo-list li {
    display: flex; align-items: center; gap: .55rem;
    font-size: .88rem; color: var(--muted2); line-height: 1.6;
  }
  .seo-list li::before {
    content: ''; display: inline-block; width: 4px; height: 4px;
    background: var(--copper); border-radius: 50%; flex-shrink: 0;
  }

  /* ── FAQ ── */
  .faq-wrap { max-width: 800px; margin: 0 auto; padding: 0 2rem 7rem; }
  .faq-wrap h2 {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: clamp(1.4rem, 2.8vw, 1.9rem); font-weight: 800;
    letter-spacing: -.022em; color: var(--text); margin-bottom: 2.25rem;
  }
  .faq-item { border-top: 1px solid var(--border); padding: 1.5rem 0; }
  .faq-item:last-child { border-bottom: 1px solid var(--border); }
  .faq-q {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: .92rem; font-weight: 700; color: var(--text); margin-bottom: .55rem; line-height: 1.4;
  }
  .faq-a { font-size: .83rem; color: var(--muted2); line-height: 1.82; max-width: 650px; }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--border); padding: 2rem;
    text-align: center; font-size: .72rem; color: var(--muted); line-height: 2; margin-top: auto;
  }
  .footer-logo { display: flex; align-items: center; justify-content: center; gap: .5rem; margin-bottom: .4rem; }
  .footer-tag { color: var(--muted); font-size: .68rem; letter-spacing: .06em; }
  .divider { height: 1px; background: var(--border); }

  /* ── MOBILE ── */
  @media (max-width: 640px) {
    .nav { padding: .9rem 1.1rem; }
    .nav-cta { display: none; }
    .hero-inner { padding: 4rem 1.25rem 3.5rem; }
    .hero-url-bar { flex-direction: column; }
    .hero-url-btn { border-radius: 12px; }
    .stats-bar { flex-direction: column; }
    .stat-item { border-right: none; border-bottom: 1px solid var(--border); padding: 1.5rem; }
    .stat-item:last-child { border-bottom: none; }
    .how-section { padding: 4rem 1.25rem; }
    .form-wrap { padding: 2rem 1.1rem 5rem; }
    .form-card { padding: 1.6rem 1.1rem; }
    .results-wrap { padding: 3rem 1.1rem 5rem; }
    .score-big { font-size: clamp(5rem, 20vw, 7rem); }
    .cta-box { padding: 2.5rem 1.25rem; }
    .seo-wrap { padding: 0 1.1rem 1rem; }
    .seo-sec { padding: 3rem 0; }
    .faq-wrap { padding: 0 1.1rem 4rem; }
  }
`;

/* ─────────────────────────────────────────
   EYE SVG
───────────────────────────────────────── */
function EyeSvg({ width = 64, opacity = 1, copper = "#E06A2C", ivory = "#F5F1E8" }) {
  return (
    <svg width={width} height={width * 0.565} viewBox="0 0 64 36" fill="none" style={{ opacity }}>
      <path d="M32 2C18 2 4 18 4 18C4 18 18 34 32 34C46 34 60 18 60 18C60 18 46 2 32 2Z"
        stroke={ivory} strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <circle cx="32" cy="18" r="9.5" stroke={ivory} strokeWidth="1.8" fill="none"/>
      <circle cx="32" cy="18" r="3.5" fill={copper}/>
      <text x="32" y="21.5" textAnchor="middle"
        fontFamily="'Inter Tight','Inter',system-ui,sans-serif"
        fontWeight="800" fontSize="8.5" fill={copper} letterSpacing="-0.4">PS</text>
    </svg>
  );
}

/* large background eye for hero */
function HeroEye() {
  return (
    <svg viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-eye-bg">
      <path d="M320 20C180 20 40 180 40 180C40 180 180 340 320 340C460 340 600 180 600 180C600 180 460 20 320 20Z"
        stroke="#F5F1E8" strokeWidth="3" fill="none" strokeLinejoin="round"/>
      <circle cx="320" cy="180" r="95" stroke="#F5F1E8" strokeWidth="2.5" fill="none"/>
      <circle cx="320" cy="180" r="38" stroke="#F5F1E8" strokeWidth="2" fill="none"/>
      <circle cx="320" cy="180" r="8" fill="#E06A2C" opacity=".8"/>
      {/* radial tick marks */}
      {Array.from({length: 12}, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r1 = 110, r2 = 120;
        return <line key={i}
          x1={320 + Math.cos(a)*r1} y1={180 + Math.sin(a)*r1}
          x2={320 + Math.cos(a)*r2} y2={180 + Math.sin(a)*r2}
          stroke="#F5F1E8" strokeWidth="1.5" opacity=".5"/>;
      })}
      {Array.from({length: 36}, (_, i) => {
        const a = (i / 36) * Math.PI * 2;
        const r1 = 125, r2 = 129;
        return <line key={i}
          x1={320 + Math.cos(a)*r1} y1={180 + Math.sin(a)*r1}
          x2={320 + Math.cos(a)*r2} y2={180 + Math.sin(a)*r2}
          stroke="#F5F1E8" strokeWidth="1" opacity=".25"/>;
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function gradeLabel(s) {
  if (s >= 90) return "Excellent Perception";
  if (s >= 75) return "Strong Perception";
  if (s >= 60) return "Moderate Perception";
  if (s >= 45) return "Below Average";
  return "Needs Attention";
}
function gradeCaption(s) {
  if (s >= 90) return "Your website communicates strong trust, clarity, and authority.";
  if (s >= 75) return "Your website sends mostly positive perception signals.";
  if (s >= 60) return "Your website has a moderate perception score. There is meaningful room to improve.";
  if (s >= 45) return "Your website may be sending unclear or mixed perception signals.";
  return "Your website is likely reducing trust and conversions. Significant improvements are available.";
}

/* ─────────────────────────────────────────
   SCORE RING (results section)
───────────────────────────────────────── */
function ScoreRing({ score }) {
  const r = 72, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="ring-wrap">
      <svg viewBox="0 0 180 180" style={{ width:"100%", height:"100%", transform:"rotate(-90deg)" }}>
        <defs>
          <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E06A2C"/>
            <stop offset="100%" stopColor="#f09060"/>
          </linearGradient>
        </defs>
        <circle cx="90" cy="90" r={r} fill="none" stroke="#2B2B2B" strokeWidth="8"/>
        <circle cx="90" cy="90" r={r} fill="none" stroke="url(#rg)" strokeWidth="8"
          strokeLinecap="round" strokeDasharray={`${dash} ${circ}`}
          style={{ transition:"stroke-dasharray 1.6s cubic-bezier(.16,1,.3,1)" }}/>
      </svg>
      <div className="ring-inner">
        <div className="ring-num">{score}</div>
        <div className="ring-sub">/ 100</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const QUESTIONS = [
  { id:"type",    label:"What type of business do you have?",        sub:"We calibrate the analysis to your market and industry.",           options:["SaaS","Agency","Personal Brand","Ecommerce","Service Business","Other"] },
  { id:"goal",    label:"What is your primary goal?",                sub:"This shapes how we evaluate your conversion potential.",           options:["Generate leads","Book calls","Sell products","Build authority","Showcase work","Other"] },
  { id:"client",  label:"Who is your ideal client?",                 sub:"Describe the person or company you're trying to attract.",         type:"text", placeholder:"e.g. B2B SaaS founders scaling from $1M to $10M ARR" },
  { id:"value",   label:"What is the average value of your offer?",  sub:"Higher-value offers require stronger trust and authority signals.", options:["Under $500","$500–$2,000","$2,000–$10,000","$10,000+"] },
  { id:"holding", label:"What's holding your website back?",         sub:"Your honest assessment helps us focus on what matters most.",      options:["Doesn't feel premium","Doesn't convert","Message isn't clear","Looks outdated","Not sure"] },
  { id:"url",     label:"Enter your website URL",                    sub:"We read your live content, copy, and perception signals.",         type:"url", placeholder:"https://yourwebsite.com" },
];

const PERCEPT_META = [
  { letter:"P", name:"Positioning",  color:"#E06A2C" },
  { letter:"E", name:"Expertise",    color:"#d4884a" },
  { letter:"R", name:"Relevance",    color:"#c4a070" },
  { letter:"C", name:"Credibility",  color:"#E06A2C" },
  { letter:"E", name:"Experience",   color:"#d4884a" },
  { letter:"P", name:"Premium Feel", color:"#c4a070" },
  { letter:"T", name:"Trust",        color:"#E06A2C" },
];

const LOCKED_CARDS = [
  { title:"Premium Positioning Strategy",  desc:"Step-by-step repositioning framework tailored to your market and price point." },
  { title:"Conversion Flow Analysis",      desc:"Where visitors are dropping off and exactly how to fix each friction point." },
  { title:"Authority Building Roadmap",    desc:"12 specific changes to establish you as the obvious choice in your niche." },
  { title:"High-Ticket Positioning",       desc:"How to restructure your offer and website to attract $10K+ clients." },
  { title:"Trust Optimization Plan",       desc:"The exact trust signals you're missing and the precise places to add them." },
  { title:"Competitor Gap Analysis",       desc:"What your top competitors do better — and a plan to leapfrog them." },
];

const LOAD_MSGS = [
  "Accessing website…",
  "Extracting content and copy…",
  "Analyzing first-impression signals…",
  "Scanning trust indicators…",
  "Evaluating clarity and authority…",
  "Measuring perceived professionalism…",
  "Generating Perception Score…",
];

/* ─────────────────────────────────────────
   NETWORK FUNCTIONS (unchanged)
───────────────────────────────────────── */
async function fetchSiteContent(url) {
  try {
    const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxy, { signal: AbortSignal.timeout(9000) });
    const data = await res.json();
    if (!data.contents) return null;
    const doc = new DOMParser().parseFromString(data.contents, "text/html");
    ["script","style","nav","footer","head"].forEach(t => doc.querySelectorAll(t).forEach(el => el.remove()));
    return {
      title: doc.querySelector("title")?.textContent?.trim() || "",
      meta:  doc.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      h1s:   [...doc.querySelectorAll("h1")].map(el => el.textContent.trim()).filter(Boolean).slice(0,5),
      h2s:   [...doc.querySelectorAll("h2")].map(el => el.textContent.trim()).filter(Boolean).slice(0,8),
      paras: [...doc.querySelectorAll("p")].map(el => el.textContent.trim()).filter(t => t.length > 30).slice(0,8),
      btns:  [...doc.querySelectorAll("a,button")].map(el => el.textContent.trim()).filter(t => t.length > 2 && t.length < 60).slice(0,10),
    };
  } catch { return null; }
}

async function runAnalysis(answers, siteContent) {
  const res = await fetch("/.netlify/functions/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers, siteContent }),
  });
  if (!res.ok) throw new Error(`Analysis failed (${res.status})`);
  return res.json();
}

/* ─────────────────────────────────────────
   APP
───────────────────────────────────────── */
export default function App() {
  const [view,      setView]      = useState("landing");
  const [step,      setStep]      = useState(0);
  const [answers,   setAnswers]   = useState({});
  const [loadStep,  setLoadStep]  = useState(0);
  const [animBars,  setAnimBars]  = useState(false);
  const [report,    setReport]    = useState(null);
  const [error,     setError]     = useState(null);
  const [heroUrl,   setHeroUrl]   = useState("");
  const [displayScore, setDisplayScore] = useState(0);

  /* score count-up */
  const total = report
    ? Math.round([report.scores.Positioning, report.scores.Expertise, report.scores.Relevance,
                  report.scores.Credibility, report.scores.Experience, report.scores.PremiumFeel,
                  report.scores.Trust].reduce((a,b) => a+b, 0) / 7)
    : 0;

  useEffect(() => {
    if (view !== "results" || total === 0) return;
    let start = null;
    const duration = 1400;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplayScore(Math.round(ease * total));
      if (p < 1) requestAnimationFrame(step);
    }
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [view, total]);

  const scores  = report
    ? [report.scores.Positioning, report.scores.Expertise, report.scores.Relevance,
       report.scores.Credibility, report.scores.Experience, report.scores.PremiumFeel, report.scores.Trust]
    : Array(7).fill(0);
  const potential = Math.min(97, total + 22);
  const gap       = potential - total;
  const descs     = report?.percept_descriptions ? Object.values(report.percept_descriptions) : Array(7).fill("");

  /* analysis trigger */
  const startAnalysis = async (ans) => {
    setView("loading"); setLoadStep(0); setError(null); setDisplayScore(0);
    const timer = setInterval(() => setLoadStep(s => Math.min(s + 1, LOAD_MSGS.length - 2)), 1500);
    try {
      const siteContent = await fetchSiteContent(ans.url);
      const result = await runAnalysis(ans, siteContent);
      clearInterval(timer);
      setLoadStep(LOAD_MSGS.length - 1);
      setReport({ ...result, siteContent });
      setTimeout(() => { setView("results"); setTimeout(() => setAnimBars(true), 500); }, 700);
    } catch (e) {
      clearInterval(timer);
      setError(e.message || "Analysis could not be completed. Check the URL and try again.");
      setView("form"); setStep(5);
    }
  };

  const handleOption = (val) => {
    const updated = { ...answers, [QUESTIONS[step].id]: val };
    setAnswers(updated);
    if (step < QUESTIONS.length - 1) setTimeout(() => setStep(s => s + 1), 160);
  };

  const reset = () => {
    setView("landing"); setStep(0); setAnswers({});
    setAnimBars(false); setReport(null); setError(null);
    setDisplayScore(0); setHeroUrl("");
  };

  /* hero URL quick-start — pre-fills url, goes to form step 0 */
  const heroSubmit = () => {
    if (!heroUrl.trim()) return;
    setAnswers(a => ({ ...a, url: heroUrl.trim() }));
    setStep(0);
    setView("form");
  };

  const q = QUESTIONS[step];

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* ── NAV ── */}
        <nav className="nav">
          <div className="nav-logo" onClick={reset}>
            <EyeSvg width={38}/>
            <span className="nav-logo-text">Perception Score</span>
          </div>
          <div className="nav-right">
            <div className="nav-badge">Beta</div>
            {view !== "form" && (
              <button className="nav-cta" onClick={() => setView("form")}>Analyze Website</button>
            )}
          </div>
        </nav>

        {/* ══════════════ LANDING ══════════════ */}
        {view === "landing" && (
          <>
            {/* HERO */}
            <div className="hero-wrap">
              <div className="hero-glow"/>
              <HeroEye/>
              <div className="hero-inner">
                <div className="eyebrow">
                  <div className="eyebrow-dot"/>
                  Perception Intelligence Platform
                </div>
                <h1>
                  Your website is being<br/>
                  judged before it is<br/>
                  <em>ever read.</em>
                </h1>
                <p className="hero-sub">
                  Measure the trust, clarity, authority, and first-impression signals
                  your website communicates in seconds.
                </p>
                <div className="hero-url-bar">
                  <input
                    className="hero-url-input"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={heroUrl}
                    onChange={e => setHeroUrl(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && heroSubmit()}
                  />
                  <button className="hero-url-btn" onClick={heroSubmit} disabled={!heroUrl.trim()}>
                    Analyze Perception
                  </button>
                </div>
                <p className="hero-alt">
                  or{" "}
                  <button onClick={() => setView("form")}>start with a quick 30-second context survey</button>
                </p>
              </div>
            </div>

            {/* STATS */}
            <div className="divider"/>
            <div className="stats-bar">
              {[
                ["P.E.R.C.E.P.T.", "Proprietary framework"],
                ["7", "Perception dimensions"],
                ["~30s", "Analysis time"],
                ["Live", "Real site content"],
              ].map(([v, l]) => (
                <div key={l} className="stat-item">
                  <div className="stat-val">{v}</div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </div>
            <div className="divider"/>

            {/* HOW IT WORKS */}
            <section className="how-section">
              <div className="section-eyebrow">How it works</div>
              <div className="section-heading">First impressions<br/>are measurable.</div>
              <div className="step-grid">
                {[
                  ["Context", "Share your business type and goals so we can calibrate the analysis to your market."],
                  ["URL", "Paste your website. We read your live content — copy, headings, CTAs, structure."],
                  ["Analysis", "Our engine scores 7 perception dimensions from your real site data."],
                  ["Insights", "Receive specific, actionable findings. Not generic advice. Not SEO output."],
                ].map(([t, d], i) => (
                  <div className="step-card" key={i}>
                    <div className="step-n">0{i+1}</div>
                    <div className="step-t">{t}</div>
                    <div className="step-d">{d}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* SEO CONTENT */}
            <div className="divider"/>
            <div className="seo-wrap">
              <section className="seo-sec">
                <h2>What Is <em>Website Perception?</em></h2>
                <p>Website perception is the impression visitors form within seconds of landing on your website. Trust, authority, clarity, design quality, and messaging all influence whether users stay, engage, or leave. Before a visitor reads a single sentence, they have already judged whether your business is credible, premium, and worth their time.</p>
              </section>
              <section className="seo-sec">
                <h2>Why First Impressions Matter</h2>
                <p>Most visitors decide whether they trust a business before reading the entire page. Small perception signals — typography, spacing, copy clarity, visual hierarchy — can significantly impact conversions, lead quality, and overall business growth. A website that fails to communicate authority and credibility loses potential clients before the conversation even starts.</p>
              </section>
              <section className="seo-sec">
                <h2>How Perception Score Works</h2>
                <p>Perception Score evaluates the visual, structural, and communication signals that influence how your website is perceived by potential customers. The platform reads your live site content and scores seven perception dimensions.</p>
                <ul className="seo-list">
                  <li>Trust Signals</li>
                  <li>Authority Signals</li>
                  <li>Message Clarity</li>
                  <li>Positioning Strength</li>
                  <li>Credibility Indicators</li>
                  <li>User Experience Quality</li>
                  <li>Premium Feel &amp; Design Professionalism</li>
                </ul>
              </section>
            </div>

            {/* FAQ */}
            <section className="faq-wrap">
              <h2>Frequently Asked Questions</h2>
              {[
                ["What is a perception score?",
                 "A perception score is a quantitative measurement of how your website is perceived by potential customers. It evaluates trust signals, authority indicators, clarity of messaging, credibility, design quality, and overall professional impression across seven dimensions using the P.E.R.C.E.P.T. framework."],
                ["How do users judge a website?",
                 "Users form a first impression within 50 milliseconds of landing on a website. They judge based on visual design quality, clarity of messaging, trust signals, authority indicators, and how well the site communicates value. These signals determine whether a visitor stays, engages, or leaves."],
                ["Why does website trust matter?",
                 "Website trust directly affects conversion rates, lead quality, and revenue. Visitors who don't trust a website won't submit forms, make purchases, or book calls — regardless of how good the underlying product is. Building trust through clear signals is one of the highest-leverage improvements a business can make."],
                ["What makes a website look professional?",
                 "A professional website communicates clarity, competence, and consistency. Key factors include intentional typography, clear and specific messaging, social proof, a coherent visual identity, and copy that speaks directly to the target audience's problem and desired outcome."],
                ["How can I improve my website's credibility?",
                 "Focus on specific and outcome-oriented copy, visible social proof, a clear and professional visual identity, a well-defined value proposition above the fold, and trust signals like guarantees, credentials, or client results."],
                ["How is Perception Score different from SEO tools?",
                 "Perception Score is not an SEO tool. SEO tools measure technical signals for search engines. Perception Score measures human signals — how real visitors perceive and judge your website. It evaluates trust, authority, credibility, clarity, and premium feel: the factors that determine whether a visitor converts."],
              ].map(([fq, fa], i) => (
                <div key={i} className="faq-item">
                  <div className="faq-q">{fq}</div>
                  <div className="faq-a">{fa}</div>
                </div>
              ))}
            </section>
          </>
        )}

        {/* ══════════════ FORM ══════════════ */}
        {view === "form" && (
          <div className="form-wrap">
            <div className="form-card">
              <div className="form-progress">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className={`p-dot ${i < step ? "done" : i === step ? "active" : ""}`}/>
                ))}
              </div>

              <div className="q-label">{q.label}</div>
              <div className="q-sub">{q.sub}</div>

              {q.type === "text" && (
                <>
                  <textarea className="text-inp" rows={3} placeholder={q.placeholder}
                    value={answers[q.id] || ""}
                    onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}/>
                  <div className="form-nav">
                    {step > 0
                      ? <button className="back-btn" onClick={() => setStep(s => s-1)}>← Back</button>
                      : <span/>}
                    <button className="btn-primary" onClick={() => setStep(s => s+1)} disabled={!answers[q.id]}>
                      Continue →
                    </button>
                  </div>
                </>
              )}

              {q.type === "url" && (
                <>
                  <input className="url-inp" type="url" placeholder={q.placeholder}
                    value={answers.url || ""}
                    onChange={e => setAnswers(a => ({ ...a, url: e.target.value }))}/>
                  {error && <div className="err-box">⚠ {error}</div>}
                  <div className="form-nav">
                    <button className="back-btn" onClick={() => setStep(s => s-1)}>← Back</button>
                    <button className="btn-primary" onClick={() => startAnalysis(answers)} disabled={!answers.url}>
                      Run Analysis →
                    </button>
                  </div>
                </>
              )}

              {!q.type && (
                <div className="opt-grid">
                  {q.options.map(opt => (
                    <button key={opt}
                      className={`opt-btn ${answers[q.id] === opt ? "sel" : ""}`}
                      onClick={() => handleOption(opt)}>{opt}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════ LOADING ══════════════ */}
        {view === "loading" && (
          <div className="loading-wrap">
            <div className="load-glow"/>

            {/* animated eye */}
            <div className="load-eye-wrap">
              <div className="load-scan-ring"/>
              <div className="load-scan-ring2"/>
              <div className="load-eye-svg">
                <EyeSvg width={72}/>
              </div>
            </div>

            {/* message */}
            <div className="load-msg-wrap">
              <div className="load-msg" key={loadStep}>{LOAD_MSGS[loadStep]}</div>
              <div className="load-url">Analyzing {answers.url}</div>
            </div>

            {/* step list */}
            <div className="load-steps">
              {LOAD_MSGS.map((s, i) => (
                <div key={i} className={`ls ${i < loadStep ? "done" : i === loadStep ? "cur" : ""}`}>
                  <div className="ls-dot">{i < loadStep ? "✓" : ""}</div>
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════ RESULTS ══════════════ */}
        {view === "results" && report && (
          <div className="results-wrap">

            {/* SCORE HERO */}
            <div className="score-hero">
              <div className="score-eyebrow">{answers.url} · {answers.type} · {answers.value}</div>
              <div className="score-big">{displayScore}</div>
              <div className="score-grade-label">{gradeLabel(total)}</div>
              <p className="score-summary">{gradeCaption(total)}</p>
              <div className="score-chips">
                <div className="score-chip">
                  <div className="chip-val pot">{potential}</div>
                  <div className="chip-lbl">Potential Score</div>
                </div>
                <div className="score-chip">
                  <div className="chip-val gap">+{gap} pts</div>
                  <div className="chip-lbl">Opportunity Gap</div>
                </div>
              </div>
            </div>

            {/* FIRST IMPRESSION SUMMARY */}
            <div className="sec-block reveal-1">
              <div className="sec-title">First Impression Summary</div>
              <div className="sec-sub">How your website is likely perceived by potential customers</div>
              <div style={{
                background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16,
                padding:"1.4rem 1.6rem", fontSize:".9rem", color:"var(--muted3)", lineHeight:1.82
              }}>
                {report.summary}
              </div>
            </div>

            {/* PERCEPT FRAMEWORK */}
            <div className="sec-block reveal-2">
              <div className="sec-title">P.E.R.C.E.P.T. Framework</div>
              <div className="sec-sub">Seven perception dimensions scored from your live site content</div>
              <div className="percept-list">
                {PERCEPT_META.map((item, i) => (
                  <div key={i} className="percept-row-card">
                    <div className="pr-top">
                      <div className="pr-left">
                        <span className="pr-letter">{item.letter}</span>
                        <span className="pr-name">{item.name}</span>
                      </div>
                      <span className="pr-score" style={{ color: item.color }}>{scores[i]}</span>
                    </div>
                    <div className="bar-t">
                      <div className="bar-f" style={{
                        width: animBars ? `${scores[i]}%` : "0%",
                        background: `linear-gradient(90deg, ${item.color}55, ${item.color})`,
                      }}/>
                    </div>
                    {descs[i] && <div className="pr-desc">{descs[i]}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* STRONGEST / WEAKEST SIGNALS */}
            <div className="sec-block reveal-3">
              <div className="sec-title">Perception Signals Detected</div>
              <div className="sec-sub">Based on direct analysis of your site's content, copy and structure</div>
              <div className="insight-grid">
                {(report.insights || []).map((ins, i) => (
                  <div key={i} className="insight-card">
                    <span className={`ic-icon ${ins.ok ? "ok" : "warn"}`}>{ins.ok ? "✓" : "⚠"}</span>
                    <span className="ic-text" style={{ color: ins.ok ? "var(--muted3)" : "var(--muted2)" }}>{ins.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LOCKED RECOMMENDATIONS */}
            <div className="sec-block reveal-4">
              <div className="sec-title">Strategic Recommendations</div>
              <div className="sec-sub">Unlock the full report for your complete perception improvement plan</div>
              <div className="locked-grid">
                {LOCKED_CARDS.map((c, i) => (
                  <div key={i} className="locked-card">
                    <div className="locked-content">
                      <div className="lc-title">{c.title}</div>
                      <div className="lc-desc">{c.desc}</div>
                    </div>
                    <div className="locked-badge">
                      <span style={{fontSize:"1rem"}}>🔒</span>
                      <div className="locked-pill">Locked</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="cta-box reveal-5">
              <h2>Perception drives conversion.</h2>
              <p>Get a personalized review and discover exactly how to improve the signals that influence trust, authority, and perceived value.</p>
              <div className="cta-btns">
                <button className="btn-primary">Book a Free Review Call</button>
                <button className="btn-secondary">Unlock Full Report</button>
              </div>
            </div>

            <div style={{ textAlign:"center", marginTop:"1.5rem" }}>
              <button className="btn-secondary" onClick={reset}>← Analyze Another Website</button>
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-logo">
            <EyeSvg width={26}/>
            <span style={{ fontFamily:"'Inter Tight','Inter',sans-serif", fontWeight:700, fontSize:".8rem", color:"var(--muted3)" }}>
              Perception Score
            </span>
          </div>
          <div className="footer-tag">Understand How You Are Perceived</div>
          <div style={{ marginTop:".4rem" }}>© 2025 Perception Score · Perception drives conversion.</div>
        </footer>

      </div>
    </>
  );
}
