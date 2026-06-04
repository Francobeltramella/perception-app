import { useState, useEffect } from "react";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter+Tight:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #0D0D0D; color: #F5F1E8;
    -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
  }
  :root {
    --bg:      #0D0D0D;
    --bg2:     #111111;
    --surface: #191919;
    --surface2:#1F1F1F;
    --border:  #282828;
    --bh:      #383838;
    --text:    #F5F1E8;
    --muted:   #666666;
    --muted2:  #999999;
    --muted3:  #BBBBBB;
    --copper:  #E06A2C;
    --copper-l:#f07a3a;
    --copper-d:rgba(224,106,44,0.13);
    --copper-g:rgba(224,106,44,0.18);
    --ok:      #4CAF82;
    --warn:    #E0A52C;
    --danger:  #E05252;
  }
  .app { min-height: 100vh; display: flex; flex-direction: column; }
  ::selection { background: rgba(224,106,44,0.28); }

  /* ── KEYFRAMES ── */
  @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes scalePop { 0%{transform:scale(.88);opacity:0} 60%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }
  @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.6)} }
  @keyframes scanRot  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes pRing    { 0%,100%{box-shadow:0 0 0 0 rgba(224,106,44,.34)} 50%{box-shadow:0 0 0 6px transparent} }
  @keyframes slideIn  { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
  @keyframes orbitDot { from{transform:rotate(0deg) translateX(200px) rotate(0deg)} to{transform:rotate(360deg) translateX(200px) rotate(-360deg)} }
  @keyframes orbitDot2{ from{transform:rotate(195deg) translateX(200px) rotate(-195deg)} to{transform:rotate(555deg) translateX(200px) rotate(-555deg)} }
  @keyframes breathe  { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:.85;transform:scale(1.015)} }

  .reveal-1 { animation: fadeUp .5s ease both; }
  .reveal-2 { animation: fadeUp .5s .09s ease both; }
  .reveal-3 { animation: fadeUp .5s .18s ease both; }
  .reveal-4 { animation: fadeUp .5s .27s ease both; }
  .reveal-5 { animation: fadeUp .5s .36s ease both; }

  /* ── NAV ── */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 68px;
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 200;
    background: rgba(13,13,13,.96); backdrop-filter: blur(20px) saturate(1.5);
  }
  .nav-brand { display: flex; align-items: center; gap: .75rem; cursor: pointer; user-select: none; flex-shrink: 0; }
  .nav-brand-text { display: flex; flex-direction: column; }
  .nav-brand-name {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-weight: 700; font-size: .82rem; letter-spacing: .06em;
    text-transform: uppercase; color: var(--text); line-height: 1.2;
  }
  .nav-brand-tag { font-size: .62rem; color: var(--muted2); letter-spacing: .02em; }

  .nav-links { display: flex; align-items: center; gap: 0; }
  .nav-link {
    background: none; border: none; color: var(--muted2); font-family: inherit;
    font-size: .83rem; font-weight: 400; padding: .5rem 1.1rem; cursor: pointer;
    transition: color .15s; letter-spacing: -.005em;
  }
  .nav-link:hover { color: var(--text); }

  .nav-cta {
    background: var(--copper); color: #0D0D0D;
    border: none; border-radius: 10px;
    padding: .6rem 1.3rem; font-size: .83rem; font-weight: 700;
    cursor: pointer; font-family: inherit; transition: all .15s;
    display: flex; align-items: center; gap: .4rem; white-space: nowrap;
  }
  .nav-cta:hover { background: var(--copper-l); transform: translateY(-1px); }

  /* ── HERO (two column) ── */
  .hero-section {
    position: relative; overflow: hidden;
    min-height: calc(100vh - 68px);
    display: flex; align-items: center;
  }
  .hero-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 70% at 72% 50%, rgba(224,106,44,.06) 0%, transparent 65%);
    pointer-events: none;
  }
  .hero-grid {
    max-width: 1180px; width: 100%; margin: 0 auto;
    padding: 5rem 3rem;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: center; position: relative; z-index: 1;
  }

  /* left column */
  .hero-left {}
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: .45rem;
    font-size: .65rem; letter-spacing: .16em; text-transform: uppercase;
    color: var(--copper); margin-bottom: 1.75rem;
    animation: fadeIn .6s ease both;
  }
  .hero-eyebrow-dot { width: 4px; height: 4px; background: var(--copper); border-radius: 50%; animation: pulse 2.2s ease-in-out infinite; }

  .hero-h1 {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: clamp(2.6rem, 4.2vw, 3.8rem);
    font-weight: 700; line-height: 1.07; letter-spacing: -.03em;
    color: var(--text); margin-bottom: 1.35rem;
    animation: fadeUp .6s .08s ease both;
  }
  .hero-h1 em {
    font-style: italic; color: var(--copper);
    font-weight: 700;
  }
  .hero-p {
    font-size: .98rem; color: var(--muted2); line-height: 1.8;
    max-width: 440px; margin-bottom: 2.25rem; font-weight: 400;
    animation: fadeUp .6s .16s ease both;
  }
  .hero-p em { font-style: normal; color: var(--copper); }

  /* url bar */
  .url-bar {
    display: flex; gap: 0; margin-bottom: 1.1rem;
    animation: fadeUp .6s .24s ease both;
    border: 1px solid var(--border); border-radius: 12px; overflow: hidden;
    background: var(--surface); transition: border-color .2s;
    max-width: 480px;
  }
  .url-bar:focus-within { border-color: rgba(224,106,44,.4); }
  .url-bar-icon {
    display: flex; align-items: center; justify-content: center;
    padding: 0 1rem; color: var(--muted); flex-shrink: 0;
  }
  .url-bar-input {
    flex: 1; background: transparent; border: none; outline: none;
    padding: .9rem .5rem .9rem 0; font-size: .9rem; color: var(--text);
    font-family: inherit;
  }
  .url-bar-input::placeholder { color: var(--muted); }
  .url-bar-btn {
    background: var(--copper); color: #0D0D0D; border: none;
    padding: 0 1.4rem; font-size: .86rem; font-weight: 700;
    cursor: pointer; font-family: inherit; transition: background .15s;
    display: flex; align-items: center; gap: .35rem; white-space: nowrap;
    border-radius: 0 10px 10px 0; flex-shrink: 0;
  }
  .url-bar-btn:hover { background: var(--copper-l); }
  .url-bar-btn:disabled { opacity: .4; cursor: not-allowed; }

  .hero-trust {
    display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;
    animation: fadeUp .6s .32s ease both;
  }
  .trust-item {
    display: flex; align-items: center; gap: .4rem;
    font-size: .76rem; color: var(--muted2);
  }
  .trust-check {
    width: 16px; height: 16px; border-radius: 50%; border: 1px solid rgba(224,106,44,.45);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .trust-check svg { color: var(--copper); }

  /* right column — score preview */
  .hero-right {
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn .8s .2s ease both;
  }
  .score-preview { position: relative; width: 420px; height: 420px; flex-shrink: 0; }
  .score-preview svg { width: 100%; height: 100%; overflow: visible; }
  /* orbit dots */
  .orbit-dot1 {
    position: absolute; top: 50%; left: 50%; width: 7px; height: 7px;
    background: var(--copper); border-radius: 50%; margin: -3.5px;
    animation: orbitDot 18s linear infinite;
  }
  .orbit-dot2 {
    position: absolute; top: 50%; left: 50%; width: 5px; height: 5px;
    background: rgba(224,106,44,.55); border-radius: 50%; margin: -2.5px;
    animation: orbitDot2 18s linear infinite;
  }
  .score-preview-inner {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
  }
  .spi-label {
    font-size: .62rem; letter-spacing: .16em; text-transform: uppercase;
    color: var(--muted2); margin-bottom: .5rem;
  }
  .spi-num {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: 6.5rem; font-weight: 800; line-height: 1;
    color: var(--copper); letter-spacing: -.04em;
  }
  .spi-grade {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: 1.3rem; font-weight: 600; color: var(--text); margin-top: .25rem;
  }
  .spi-caption { font-size: .75rem; color: var(--muted2); margin-top: .4rem; max-width: 160px; line-height: 1.55; }

  /* ── SOCIAL PROOF BAR ── */
  .social-bar {
    border-top: 1px solid var(--border); padding: 2.25rem 3rem;
    text-align: center;
  }
  .social-bar-label {
    font-size: .63rem; letter-spacing: .16em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 1.5rem;
  }
  .logo-strip {
    display: flex; align-items: center; justify-content: center;
    gap: 3rem; flex-wrap: wrap;
  }
  .logo-item {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: .82rem; font-weight: 600; letter-spacing: .02em;
    color: var(--muted); display: flex; align-items: center; gap: .4rem;
    transition: color .2s;
  }
  .logo-item:hover { color: var(--muted3); }
  .logo-dot { width: 6px; height: 6px; background: var(--muted); border-radius: 50%; opacity: .5; }

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
    font-size: 1.55rem; font-weight: 800; color: var(--text); line-height: 1;
  }
  .stat-lbl { font-size: .68rem; color: var(--muted); margin-top: .3rem; letter-spacing: .04em; }

  /* ── HOW SECTION ── */
  .how-section { max-width: 1100px; margin: 0 auto; padding: 7rem 3rem; }
  .section-eyebrow { font-size: .64rem; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-bottom: .75rem; }
  .section-heading {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 800;
    letter-spacing: -.025em; color: var(--text); margin-bottom: 2.75rem; line-height: 1.1;
  }
  .step-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px,1fr)); gap: 1rem; }
  .step-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 18px; padding: 1.6rem; position: relative; overflow: hidden;
    transition: border-color .2s, transform .2s;
  }
  .step-card:hover { border-color: var(--bh); transform: translateY(-2px); }
  .step-n {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: 2.4rem; font-weight: 800; color: rgba(224,106,44,.12); line-height: 1; margin-bottom: 1rem;
  }
  .step-t { font-size: .84rem; font-weight: 600; color: var(--text); margin-bottom: .35rem; }
  .step-d { font-size: .77rem; color: var(--muted); line-height: 1.72; }

  /* ── FORM ── */
  .form-wrap { flex: 1; display: flex; align-items: flex-start; justify-content: center; padding: 4rem 2rem 7rem; }
  .form-card {
    width: 100%; max-width: 540px; background: var(--surface);
    border: 1px solid var(--border); border-radius: 22px; padding: 2.5rem;
    animation: fadeUp .4s ease both;
  }
  .form-progress { display: flex; gap: .3rem; margin-bottom: 2.25rem; }
  .p-dot { flex: 1; height: 2px; border-radius: 1px; background: var(--border); transition: background .3s; }
  .p-dot.active { background: var(--copper); }
  .p-dot.done { background: rgba(224,106,44,.38); }
  .q-label {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: 1.2rem; font-weight: 700; margin-bottom: .4rem;
    letter-spacing: -.015em; line-height: 1.3; color: var(--text);
  }
  .q-sub { font-size: .79rem; color: var(--muted); margin-bottom: 1.6rem; line-height: 1.65; }
  .opt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(138px,1fr)); gap: .5rem; margin-bottom: 1.75rem; }
  .opt-btn {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 10px; padding: .72rem .9rem; font-size: .8rem;
    color: var(--muted3); cursor: pointer; font-family: inherit;
    text-align: left; transition: all .14s; line-height: 1.4;
  }
  .opt-btn:hover { border-color: var(--bh); color: var(--text); }
  .opt-btn.sel { border-color: var(--copper); color: var(--copper); background: var(--copper-d); }
  .text-inp {
    width: 100%; background: var(--bg2); border: 1px solid var(--border);
    border-radius: 10px; padding: .78rem 1rem; font-size: .86rem;
    color: var(--text); font-family: inherit; outline: none;
    transition: border .2s, box-shadow .2s; margin-bottom: 1.75rem;
    resize: none; line-height: 1.6;
  }
  .text-inp:focus { border-color: var(--copper); box-shadow: 0 0 0 3px var(--copper-g); }
  .text-inp::placeholder { color: var(--muted); }
  .url-inp {
    width: 100%; background: var(--bg2); border: 1px solid var(--border);
    border-radius: 10px; padding: .78rem 1rem; font-size: .88rem;
    color: var(--text); font-family: inherit; outline: none;
    transition: border .2s, box-shadow .2s; margin-bottom: 1rem;
  }
  .url-inp:focus { border-color: var(--copper); box-shadow: 0 0 0 3px var(--copper-g); }
  .url-inp::placeholder { color: var(--muted); }
  .form-nav { display: flex; justify-content: space-between; align-items: center; }
  .back-btn {
    background: none; border: none; color: var(--muted); font-family: inherit;
    font-size: .8rem; cursor: pointer; padding: .4rem 0; transition: color .14s;
  }
  .back-btn:hover { color: var(--text); }
  .err-box {
    background: rgba(224,82,82,.07); border: 1px solid rgba(224,82,82,.2);
    border-radius: 9px; padding: .8rem .95rem; margin-bottom: .9rem;
    font-size: .79rem; color: #f4a0a0; line-height: 1.6;
  }
  .btn-primary {
    background: var(--copper); color: #0D0D0D; border: none; border-radius: 999px;
    padding: .78rem 1.7rem; font-size: .86rem; font-weight: 700;
    cursor: pointer; font-family: inherit; transition: all .15s; letter-spacing: -.01em;
  }
  .btn-primary:hover { background: var(--copper-l); transform: translateY(-1px); box-shadow: 0 5px 20px var(--copper-g); }
  .btn-primary:active { transform: none; box-shadow: none; }
  .btn-primary:disabled { opacity: .38; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn-secondary {
    background: transparent; color: var(--muted3);
    border: 1px solid var(--border); border-radius: 999px;
    padding: .78rem 1.7rem; font-size: .86rem; font-weight: 500;
    cursor: pointer; font-family: inherit; transition: all .15s;
  }
  .btn-secondary:hover { border-color: var(--bh); color: var(--text); }

  /* ── LOADING ── */
  .loading-wrap {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    justify-content: center; min-height: calc(100vh - 68px);
    padding: 2rem; text-align: center; position: relative; overflow: hidden;
  }
  .load-glow {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    width: 600px; height: 400px;
    background: radial-gradient(ellipse at center, rgba(224,106,44,.055) 0%, transparent 68%);
    pointer-events: none;
  }
  .load-eye-wrap { position: relative; width: 110px; height: 110px; margin-bottom: 2.5rem; flex-shrink: 0; }
  .load-ring1 {
    position: absolute; inset: -14px; border-radius: 50%;
    border: 1.5px solid transparent; border-top-color: var(--copper);
    border-right-color: rgba(224,106,44,.25);
    animation: scanRot 1.7s linear infinite;
  }
  .load-ring2 {
    position: absolute; inset: -26px; border-radius: 50%;
    border: 1px solid transparent; border-bottom-color: rgba(224,106,44,.15);
    animation: scanRot 3s linear infinite reverse;
  }
  .load-eye-center {
    position: absolute; inset: 0; display: flex; align-items: center;
    justify-content: center; animation: breathe 2.6s ease-in-out infinite;
  }
  .load-msg-area { margin-bottom: 2.5rem; position: relative; z-index: 1; }
  .load-msg {
    font-family: 'Inter Tight','Inter',sans-serif; font-size: 1.05rem;
    font-weight: 700; color: var(--text); margin-bottom: .4rem;
    animation: slideIn .3s ease both; key: inherit;
  }
  .load-url { font-size: .74rem; color: var(--muted); }
  .load-steps { display: flex; flex-direction: column; gap: .42rem; width: 100%; max-width: 255px; z-index: 1; }
  .ls { display: flex; align-items: center; gap: .55rem; font-size: .74rem; color: var(--muted); transition: color .3s; }
  .ls.done { color: var(--ok); }
  .ls.cur  { color: var(--text); }
  .ls-dot {
    width: 13px; height: 13px; border-radius: 50%; border: 1px solid var(--border);
    flex-shrink: 0; transition: all .3s; display: flex; align-items: center;
    justify-content: center; font-size: 7px;
  }
  .ls.done .ls-dot { background: var(--ok); border-color: var(--ok); color: #0D0D0D; }
  .ls.cur  .ls-dot { border-color: var(--copper); animation: pRing 1.1s ease-in-out infinite; }

  /* ── RESULTS ── */
  .results-wrap { max-width: 860px; margin: 0 auto; padding: 4rem 2.5rem 7rem; }
  .score-hero {
    text-align: center; padding: 4rem 2rem 3.5rem;
    border-bottom: 1px solid var(--border); margin-bottom: 3.5rem;
    position: relative;
  }
  .score-hero::before {
    content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 500px; height: 320px;
    background: radial-gradient(ellipse at center, rgba(224,106,44,.065) 0%, transparent 68%);
    pointer-events: none;
  }
  .score-eyebrow { font-size: .64rem; letter-spacing: .13em; text-transform: uppercase; color: var(--muted); margin-bottom: 1.5rem; }
  .score-big {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: clamp(5.5rem, 14vw, 9rem); font-weight: 800;
    line-height: 1; color: var(--copper); letter-spacing: -.05em;
    animation: scalePop .7s .1s ease both;
  }
  .score-grade {
    font-family: 'Inter Tight','Inter',sans-serif;
    font-size: clamp(1rem, 2.2vw, 1.4rem); font-weight: 700;
    color: var(--text); margin-top: .5rem; animation: fadeUp .5s .5s ease both;
  }
  .score-caption {
    max-width: 500px; margin: 1rem auto 2rem; font-size: .9rem;
    color: var(--muted2); line-height: 1.8; animation: fadeUp .5s .6s ease both;
  }
  .score-chips { display: flex; gap: .6rem; justify-content: center; flex-wrap: wrap; animation: fadeUp .5s .7s ease both; }
  .chip {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: .8rem 1.5rem; text-align: center; min-width: 108px;
  }
  .chip-val { font-family:'Inter Tight','Inter',sans-serif; font-size: 1.35rem; font-weight: 800; }
  .chip-val.pot { color: var(--text); }
  .chip-val.gap { color: var(--copper); }
  .chip-lbl { font-size: .6rem; color: var(--muted); margin-top: .2rem; letter-spacing: .08em; text-transform: uppercase; }

  /* blocks */
  .sec-block { margin: 3rem 0; }
  .sec-title { font-family:'Inter Tight','Inter',sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--text); margin-bottom: .3rem; }
  .sec-sub { font-size: .77rem; color: var(--muted); margin-bottom: 1.5rem; line-height: 1.65; }

  .percept-list { display: flex; flex-direction: column; gap: .75rem; }
  .percept-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; padding: 1.05rem 1.25rem; transition: border-color .2s;
  }
  .percept-card:hover { border-color: var(--bh); }
  .pc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: .55rem; }
  .pc-left { display: flex; align-items: center; gap: .45rem; }
  .pc-letter { font-size: .57rem; font-weight: 700; letter-spacing: .16em; color: var(--muted); text-transform: uppercase; }
  .pc-name { font-size: .8rem; font-weight: 500; color: var(--text); }
  .pc-score { font-family:'Inter Tight','Inter',sans-serif; font-size: .88rem; font-weight: 700; }
  .bar-t { height: 2.5px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .bar-f { height: 100%; border-radius: 2px; transition: width 1.4s cubic-bezier(.16,1,.3,1); }
  .pc-desc { font-size: .7rem; color: var(--muted); margin-top: .42rem; line-height: 1.6; }

  .insight-grid { display: flex; flex-direction: column; gap: .5rem; }
  .insight-card {
    display: flex; align-items: flex-start; gap: .65rem;
    padding: .85rem 1.05rem; background: var(--surface);
    border: 1px solid var(--border); border-radius: 12px; transition: border-color .2s;
  }
  .insight-card:hover { border-color: var(--bh); }
  .ic-icon { font-size: .7rem; flex-shrink: 0; margin-top: .13rem; font-weight: 700; }
  .ic-icon.ok   { color: var(--ok); }
  .ic-icon.warn { color: var(--warn); }
  .ic-text { font-size: .8rem; line-height: 1.65; color: var(--muted3); }

  .locked-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px,1fr)); gap: .8rem; }
  .locked-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; padding: 1.15rem; position: relative; overflow: hidden; min-height: 92px;
  }
  .locked-card::before {
    content: ''; position: absolute; inset: 0;
    background: rgba(13,13,13,.76); backdrop-filter: blur(6px); border-radius: 14px; z-index: 1;
  }
  .locked-content { filter: blur(2px); user-select: none; }
  .locked-badge {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    display: flex; flex-direction: column; align-items: center; gap: .32rem; z-index: 2;
  }
  .locked-pill {
    font-size: .6rem; letter-spacing: .14em; text-transform: uppercase;
    color: var(--muted3); background: var(--surface2);
    border: 1px solid var(--border); border-radius: 999px;
    padding: .17rem .65rem; white-space: nowrap;
  }
  .lc-t { font-size: .82rem; font-weight: 600; margin-bottom: .28rem; color: var(--text); }
  .lc-d { font-size: .72rem; color: var(--muted); line-height: 1.6; }

  .cta-box {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 22px; padding: 3.5rem 2rem; text-align: center;
    margin: 3rem 0; position: relative; overflow: hidden;
  }
  .cta-box::before {
    content: ''; position: absolute; top: -50px; left: 50%; transform: translateX(-50%);
    width: 380px; height: 240px;
    background: radial-gradient(ellipse at center, rgba(224,106,44,.075) 0%, transparent 68%);
    pointer-events: none;
  }
  .cta-box h2 {
    font-family:'Inter Tight','Inter',sans-serif; font-size: clamp(1.4rem,2.8vw,1.9rem);
    font-weight: 800; letter-spacing: -.022em; margin-bottom: .7rem; color: var(--text); position: relative;
  }
  .cta-box p { color: var(--muted); font-size: .88rem; line-height: 1.75; max-width: 400px; margin: 0 auto 1.7rem; position: relative; }
  .cta-btns { display: flex; gap: .7rem; justify-content: center; flex-wrap: wrap; position: relative; }

  /* SEO / FAQ */
  .seo-wrap { max-width: 900px; margin: 0 auto; padding: 0 3rem 2rem; }
  .seo-sec { padding: 4.5rem 0; border-bottom: 1px solid var(--border); }
  .seo-sec:last-child { border-bottom: none; }
  .seo-sec h2 {
    font-family:'Inter Tight','Inter',sans-serif; font-size: clamp(1.35rem,2.5vw,1.8rem);
    font-weight: 800; letter-spacing: -.022em; color: var(--text); margin-bottom: 1rem; line-height: 1.15;
  }
  .seo-sec h2 em { font-style: normal; color: var(--copper); }
  .seo-sec p { font-size: .92rem; color: var(--muted2); line-height: 1.85; max-width: 620px; }
  .seo-list { margin-top: 1rem; padding: 0; list-style: none; display: flex; flex-direction: column; gap: .45rem; }
  .seo-list li { display: flex; align-items: center; gap: .5rem; font-size: .86rem; color: var(--muted2); line-height: 1.6; }
  .seo-list li::before { content:''; display:inline-block; width:4px; height:4px; background:var(--copper); border-radius:50%; flex-shrink:0; }

  .faq-wrap { max-width: 900px; margin: 0 auto; padding: 0 3rem 7rem; }
  .faq-wrap h2 {
    font-family:'Inter Tight','Inter',sans-serif; font-size: clamp(1.35rem,2.5vw,1.8rem);
    font-weight: 800; letter-spacing: -.022em; color: var(--text); margin-bottom: 2rem;
  }
  .faq-item { border-top: 1px solid var(--border); padding: 1.4rem 0; }
  .faq-item:last-child { border-bottom: 1px solid var(--border); }
  .faq-q { font-family:'Inter Tight','Inter',sans-serif; font-size: .9rem; font-weight: 700; color: var(--text); margin-bottom: .5rem; line-height: 1.4; }
  .faq-a { font-size: .81rem; color: var(--muted2); line-height: 1.82; max-width: 640px; }

  /* FOOTER */
  .footer {
    border-top: 1px solid var(--border); padding: 1.75rem 2.5rem;
    text-align: center; font-size: .71rem; color: var(--muted); line-height: 1.9; margin-top: auto;
  }
  .footer-logo { display: flex; align-items: center; justify-content: center; gap: .5rem; margin-bottom: .35rem; }
  .footer-logo-name { font-family:'Inter Tight','Inter',sans-serif; font-weight: 700; font-size: .78rem; color: var(--muted3); }
  .divider { height: 1px; background: var(--border); }

  /* ── MOBILE ── */
  @media (max-width: 860px) {
    .nav { padding: 0 1.25rem; }
    .nav-links { display: none; }
    .hero-grid { grid-template-columns: 1fr; gap: 3rem; padding: 3.5rem 1.5rem 4rem; }
    .hero-right { order: -1; }
    .score-preview { width: 280px; height: 280px; }
    .spi-num { font-size: 4.5rem; }
    .spi-grade { font-size: 1rem; }
    .social-bar { padding: 2rem 1.5rem; }
    .logo-strip { gap: 1.5rem; }
    .how-section { padding: 4rem 1.5rem; }
    .seo-wrap { padding: 0 1.5rem 1rem; }
    .faq-wrap { padding: 0 1.5rem 4rem; }
    .results-wrap { padding: 3rem 1.25rem 5rem; }
    .cta-box { padding: 2.5rem 1.25rem; }
  }
  @media (max-width: 480px) {
    .url-bar { flex-direction: column; }
    .url-bar-btn { border-radius: 0 0 10px 10px; padding: .8rem; justify-content: center; }
    .hero-trust { flex-direction: column; align-items: flex-start; gap: .6rem; }
  }
`;

/* ─────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────── */
function EyeSvg({ width = 44, ivory = "#F5F1E8", copper = "#E06A2C" }) {
  return (
    <svg width={width} height={width * 0.565} viewBox="0 0 64 36" fill="none">
      <path d="M32 2C18 2 4 18 4 18C4 18 18 34 32 34C46 34 60 18 60 18C60 18 46 2 32 2Z"
        stroke={ivory} strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
      <circle cx="32" cy="18" r="9.5" stroke={ivory} strokeWidth="1.8" fill="none"/>
      <circle cx="32" cy="18" r="3" fill={copper}/>
    </svg>
  );
}

/* Hero score preview — right column */
function ScorePreview() {
  const cx = 210, cy = 210, R = 200;
  /* dashed outer circle + eye shape */
  return (
    <div className="score-preview">
      <svg viewBox="0 0 420 420" fill="none">
        {/* outer dashed circle */}
        <circle cx={cx} cy={cy} r={R} stroke="rgba(224,106,44,0.18)"
          strokeWidth="1" strokeDasharray="3 6"/>
        {/* tick marks */}
        {Array.from({length:36},(_,i) => {
          const a = (i/36)*Math.PI*2;
          const r1 = R-1, r2 = R + (i%3===0 ? 8 : 4);
          return <line key={i}
            x1={cx+Math.cos(a)*r1} y1={cy+Math.sin(a)*r1}
            x2={cx+Math.cos(a)*r2} y2={cy+Math.sin(a)*r2}
            stroke="rgba(224,106,44,0.22)" strokeWidth={i%3===0?1.2:.7}/>;
        })}
        {/* eye shape — two bezier arcs */}
        <path d={`M ${cx-R*.72} ${cy} Q ${cx} ${cy-R*.55} ${cx+R*.72} ${cy} Q ${cx} ${cy+R*.55} ${cx-R*.72} ${cy} Z`}
          stroke="rgba(224,106,44,0.35)" strokeWidth="1.2" fill="none"/>
        {/* iris ring */}
        <circle cx={cx} cy={cy} r={R*.32} stroke="rgba(224,106,44,0.3)"
          strokeWidth="1" strokeDasharray="4 5"/>
        {/* pupil */}
        <circle cx={cx} cy={cy} r={R*.08} fill="rgba(224,106,44,0.5)"/>
      </svg>
      {/* orbit dots */}
      <div className="orbit-dot1"/>
      <div className="orbit-dot2"/>
      {/* centered content */}
      <div className="score-preview-inner">
        <div className="spi-label">Perception Score</div>
        <div className="spi-num">87</div>
        <div className="spi-grade">Excellent</div>
        <div className="spi-caption">Your website communicates strong trust and credibility.</div>
      </div>
    </div>
  );
}

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
  if (s >= 60) return "There is meaningful room to improve your perception signals.";
  if (s >= 45) return "Your website may be sending unclear or mixed perception signals.";
  return "Your website is likely reducing trust and conversions.";
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

const SOCIAL_LOGOS = [
  "Creative People", "Brikl", "Untitled Studio", "Northbeam", "Layer", "Semplice",
];

/* ─────────────────────────────────────────
   NETWORK (unchanged)
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
  const [view,     setView]     = useState("landing");
  const [step,     setStep]     = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [loadStep, setLoadStep] = useState(0);
  const [animBars, setAnimBars] = useState(false);
  const [report,   setReport]   = useState(null);
  const [error,    setError]    = useState(null);
  const [heroUrl,  setHeroUrl]  = useState("");
  const [displayScore, setDisplayScore] = useState(0);

  const total = report
    ? Math.round([report.scores.Positioning, report.scores.Expertise, report.scores.Relevance,
                  report.scores.Credibility, report.scores.Experience, report.scores.PremiumFeel,
                  report.scores.Trust].reduce((a,b) => a+b, 0) / 7)
    : 0;

  /* count-up animation */
  useEffect(() => {
    if (view !== "results" || total === 0) return;
    let start = null;
    const dur = 1500;
    function tick(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setDisplayScore(Math.round((1 - Math.pow(1-p, 3)) * total));
      if (p < 1) requestAnimationFrame(tick);
    }
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [view, total]);

  const scores    = report
    ? [report.scores.Positioning, report.scores.Expertise, report.scores.Relevance,
       report.scores.Credibility, report.scores.Experience, report.scores.PremiumFeel, report.scores.Trust]
    : Array(7).fill(0);
  const potential = Math.min(97, total + 22);
  const gap       = potential - total;
  const descs     = report?.percept_descriptions ? Object.values(report.percept_descriptions) : Array(7).fill("");

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

  /* hero quick-start */
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
          <div className="nav-brand" onClick={reset}>
            <EyeSvg width={42}/>
            <div className="nav-brand-text">
              <span className="nav-brand-name">Perception Score</span>
              <span className="nav-brand-tag">Understand How You Are Perceived</span>
            </div>
          </div>

          <div className="nav-links">
            {["How It Works","What We Measure","Examples","Pricing","About"].map(l => (
              <button key={l} className="nav-link">{l}</button>
            ))}
          </div>

          <button className="nav-cta" onClick={() => setView("form")}>
            Analyze My Website &nbsp;→
          </button>
        </nav>

        {/* ══════════════ LANDING ══════════════ */}
        {view === "landing" && (
          <>
            {/* HERO — two column */}
            <section className="hero-section">
              <div className="hero-grid">
                {/* LEFT */}
                <div className="hero-left">
                  <div className="hero-eyebrow">
                    <div className="hero-eyebrow-dot"/>
                    Website Perception Intelligence
                  </div>

                  <h1 className="hero-h1">
                    Your website is<br/>
                    being judged<br/>
                    <em>before it is being read.</em>
                  </h1>

                  <p className="hero-p">
                    Measure the signals that influence trust, authority,
                    clarity, and conversion—within <em>seconds</em>.
                  </p>

                  {/* URL bar */}
                  <div className="url-bar">
                    <div className="url-bar-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
                        <ellipse cx="8" cy="8" rx="2.5" ry="6.5" stroke="currentColor" strokeWidth="1.2"/>
                        <line x1="1.5" y1="8" x2="14.5" y2="8" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                    </div>
                    <input
                      className="url-bar-input"
                      type="url"
                      placeholder="Enter your website URL"
                      value={heroUrl}
                      onChange={e => setHeroUrl(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && heroSubmit()}
                    />
                    <button className="url-bar-btn" onClick={heroSubmit} disabled={!heroUrl.trim()}>
                      Analyze Perception &nbsp;→
                    </button>
                  </div>

                  {/* trust signals */}
                  <div className="hero-trust">
                    {["No sign-up required", "Get results in under 60 seconds"].map(t => (
                      <div key={t} className="trust-item">
                        <div className="trust-check">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4L3.5 6L6.5 2" stroke="#E06A2C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — score preview */}
                <div className="hero-right">
                  <ScorePreview/>
                </div>
              </div>
            </section>

            {/* SOCIAL PROOF BAR */}
            <div className="divider"/>
            <div className="social-bar">
              <div className="social-bar-label">Trusted by founders, freelancers &amp; growing brands</div>
              <div className="logo-strip">
                {SOCIAL_LOGOS.map(name => (
                  <div key={name} className="logo-item">
                    <div className="logo-dot"/>
                    {name}
                  </div>
                ))}
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
                <p>Most visitors decide whether they trust a business before reading the entire page. Small perception signals — typography, spacing, copy clarity, visual hierarchy — can significantly impact conversions, lead quality, and overall business growth.</p>
              </section>
              <section className="seo-sec">
                <h2>How Perception Score Works</h2>
                <p>Perception Score evaluates the visual, structural, and communication signals that influence how your website is perceived by potential customers. The platform reads your live site content and scores seven perception dimensions.</p>
                <ul className="seo-list">
                  {["Trust Signals","Authority Signals","Message Clarity","Positioning Strength","Credibility Indicators","User Experience Quality","Premium Feel & Design Professionalism"].map(i => <li key={i}>{i}</li>)}
                </ul>
              </section>
            </div>

            {/* FAQ */}
            <section className="faq-wrap">
              <h2>Frequently Asked Questions</h2>
              {[
                ["What is a perception score?","A perception score is a quantitative measurement of how your website is perceived by potential customers. It evaluates trust signals, authority indicators, clarity of messaging, credibility, and design quality across seven dimensions using the P.E.R.C.E.P.T. framework."],
                ["How do users judge a website?","Users form a first impression within 50 milliseconds. They judge based on visual design quality, clarity of messaging, trust signals, authority indicators, and how well the site communicates value — before reading a word."],
                ["Why does website trust matter?","Website trust directly affects conversion rates, lead quality, and revenue. Visitors who don't trust a website won't submit forms, make purchases, or book calls — regardless of how good the underlying product is."],
                ["What makes a website look professional?","A professional website communicates clarity, competence, and consistency. Key factors include intentional typography, clear and specific messaging, social proof, a coherent visual identity, and copy that speaks to the target audience's problem."],
                ["How can I improve my website's credibility?","Focus on specific outcome-oriented copy, visible social proof, a clear and professional visual identity, a well-defined value proposition above the fold, and trust signals like guarantees, credentials, or client results."],
                ["How is Perception Score different from SEO tools?","Perception Score is not an SEO tool. SEO tools measure signals for search engines. Perception Score measures human signals — how real visitors perceive and judge your website. It evaluates trust, authority, credibility, clarity, and premium feel."],
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
                    {step > 0 ? <button className="back-btn" onClick={() => setStep(s => s-1)}>← Back</button> : <span/>}
                    <button className="btn-primary" onClick={() => setStep(s => s+1)} disabled={!answers[q.id]}>Continue →</button>
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
                    <button className="btn-primary" onClick={() => startAnalysis(answers)} disabled={!answers.url}>Run Analysis →</button>
                  </div>
                </>
              )}

              {!q.type && (
                <div className="opt-grid">
                  {q.options.map(opt => (
                    <button key={opt} className={`opt-btn ${answers[q.id] === opt ? "sel" : ""}`}
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
            <div className="load-eye-wrap">
              <div className="load-ring1"/>
              <div className="load-ring2"/>
              <div className="load-eye-center"><EyeSvg width={68}/></div>
            </div>
            <div className="load-msg-area">
              <div className="load-msg" key={loadStep}>{LOAD_MSGS[loadStep]}</div>
              <div className="load-url">Analyzing {answers.url}</div>
            </div>
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
            <div className="score-hero">
              <div className="score-eyebrow">{answers.url} · {answers.type} · {answers.value}</div>
              <div className="score-big">{displayScore}</div>
              <div className="score-grade">{gradeLabel(total)}</div>
              <p className="score-caption">{gradeCaption(total)}</p>
              <div className="score-chips">
                <div className="chip"><div className="chip-val pot">{potential}</div><div className="chip-lbl">Potential Score</div></div>
                <div className="chip"><div className="chip-val gap">+{gap} pts</div><div className="chip-lbl">Opportunity Gap</div></div>
              </div>
            </div>

            <div className="sec-block reveal-1">
              <div className="sec-title">First Impression Summary</div>
              <div className="sec-sub">How your website is likely perceived by potential customers</div>
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:14, padding:"1.3rem 1.5rem", fontSize:".88rem", color:"var(--muted3)", lineHeight:1.82 }}>
                {report.summary}
              </div>
            </div>

            <div className="sec-block reveal-2">
              <div className="sec-title">P.E.R.C.E.P.T. Framework</div>
              <div className="sec-sub">Seven perception dimensions scored from your live site content</div>
              <div className="percept-list">
                {PERCEPT_META.map((item, i) => (
                  <div key={i} className="percept-card">
                    <div className="pc-top">
                      <div className="pc-left">
                        <span className="pc-letter">{item.letter}</span>
                        <span className="pc-name">{item.name}</span>
                      </div>
                      <span className="pc-score" style={{color:item.color}}>{scores[i]}</span>
                    </div>
                    <div className="bar-t">
                      <div className="bar-f" style={{ width: animBars ? `${scores[i]}%` : "0%", background:`linear-gradient(90deg,${item.color}50,${item.color})` }}/>
                    </div>
                    {descs[i] && <div className="pc-desc">{descs[i]}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="sec-block reveal-3">
              <div className="sec-title">Perception Signals Detected</div>
              <div className="sec-sub">Based on direct analysis of your site's content, copy and structure</div>
              <div className="insight-grid">
                {(report.insights || []).map((ins, i) => (
                  <div key={i} className="insight-card">
                    <span className={`ic-icon ${ins.ok ? "ok" : "warn"}`}>{ins.ok ? "✓" : "⚠"}</span>
                    <span className="ic-text" style={{color: ins.ok ? "var(--muted3)" : "var(--muted2)"}}>{ins.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sec-block reveal-4">
              <div className="sec-title">Strategic Recommendations</div>
              <div className="sec-sub">Unlock the full report for your complete perception improvement plan</div>
              <div className="locked-grid">
                {LOCKED_CARDS.map((c, i) => (
                  <div key={i} className="locked-card">
                    <div className="locked-content">
                      <div className="lc-t">{c.title}</div>
                      <div className="lc-d">{c.desc}</div>
                    </div>
                    <div className="locked-badge">
                      <span style={{fontSize:".95rem"}}>🔒</span>
                      <div className="locked-pill">Locked</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cta-box reveal-5">
              <h2>Perception drives conversion.</h2>
              <p>Get a personalized review and discover exactly how to improve the signals that influence trust, authority, and perceived value.</p>
              <div className="cta-btns">
                <button className="btn-primary">Book a Free Review Call</button>
                <button className="btn-secondary">Unlock Full Report</button>
              </div>
            </div>

            <div style={{textAlign:"center",marginTop:"1.5rem"}}>
              <button className="btn-secondary" onClick={reset}>← Analyze Another Website</button>
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-logo">
            <EyeSvg width={26}/>
            <span className="footer-logo-name">Perception Score</span>
          </div>
          <div>Understand How You Are Perceived</div>
          <div style={{marginTop:".3rem"}}>© 2025 Perception Score · Perception drives conversion.</div>
        </footer>

      </div>
    </>
  );
}
