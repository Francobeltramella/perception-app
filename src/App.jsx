import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Inter+Tight:wght@600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', system-ui, sans-serif; background: #111111; color: #F5F1E8; -webkit-font-smoothing: antialiased; }
  :root {
    --bg: #111111;
    --surface: #1C1C1C;
    --surface2: #222222;
    --border: #2B2B2B;
    --border-hover: #3a3a3a;
    --text: #F5F1E8;
    --muted: #A0A0A0;
    --muted2: #C8C4BC;
    --copper: #E06A2C;
    --copper-dim: rgba(224,106,44,0.12);
    --copper-glow: rgba(224,106,44,0.22);
    --success: #4CAF82;
    --warn: #E0A52C;
    --danger: #E05252;
  }
  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* ── NAV ── */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.1rem 2rem;
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 100;
    background: rgba(17,17,17,0.94);
    backdrop-filter: blur(16px);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 0.65rem;
    cursor: pointer; text-decoration: none;
  }
  .nav-logo-text {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-weight: 700; font-size: 0.95rem;
    letter-spacing: -0.01em; color: var(--text);
  }
  .nav-badge {
    font-size: 0.64rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--copper); border: 1px solid rgba(224,106,44,0.3);
    border-radius: 999px; padding: 0.22rem 0.75rem;
  }

  /* ── EYE LOGO ── */
  .eye-logo { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  /* ── HERO ── */
  .hero {
    max-width: 820px; margin: 0 auto;
    padding: 7rem 2rem 5rem; text-align: center; position: relative;
  }
  .hero::before {
    content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 600px; height: 420px;
    background: radial-gradient(ellipse at center, rgba(224,106,44,0.06) 0%, transparent 68%);
    pointer-events: none;
  }
  .eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--copper); border: 1px solid rgba(224,106,44,0.22);
    border-radius: 999px; padding: 0.35rem 1rem; margin-bottom: 2.25rem;
  }
  .eyebrow-dot {
    width: 5px; height: 5px; background: var(--copper); border-radius: 50%;
    animation: pulse-dot 2.2s ease-in-out infinite; flex-shrink: 0;
  }
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.65)} }

  .hero h1 {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: clamp(2.6rem, 5.8vw, 4.4rem);
    font-weight: 800; line-height: 1.06; letter-spacing: -0.03em;
    margin-bottom: 1.5rem; color: var(--text);
  }
  .hero h1 em { font-style: normal; color: var(--copper); }
  .hero-sub {
    font-size: 1.1rem; color: var(--muted); line-height: 1.8;
    max-width: 520px; margin: 0 auto 2.75rem; font-weight: 400;
  }
  .hero-tagline {
    font-size: 0.78rem; color: var(--muted); letter-spacing: 0.08em;
    text-transform: uppercase; margin-top: 2rem;
  }
  .cta-group { display: flex; gap: 0.85rem; justify-content: center; flex-wrap: wrap; }

  /* ── BUTTONS ── */
  .btn-primary {
    background: var(--copper); color: #111111;
    border: none; border-radius: 999px;
    padding: 0.85rem 2rem; font-size: 0.9rem; font-weight: 600;
    cursor: pointer; font-family: inherit;
    transition: all 0.18s; letter-spacing: -0.01em;
  }
  .btn-primary:hover { background: #f07a3c; transform: translateY(-1px); box-shadow: 0 8px 28px var(--copper-glow); }
  .btn-primary:active { transform: translateY(0); box-shadow: none; }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }

  .btn-secondary {
    background: transparent; color: var(--muted2);
    border: 1px solid var(--border); border-radius: 999px;
    padding: 0.85rem 2rem; font-size: 0.9rem; font-weight: 500;
    cursor: pointer; font-family: inherit; transition: all 0.18s;
  }
  .btn-secondary:hover { border-color: var(--border-hover); color: var(--text); background: rgba(255,255,255,0.03); }

  /* ── STATS ── */
  .stats-row {
    display: flex; justify-content: center;
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    flex-wrap: wrap;
  }
  .stat { text-align: center; padding: 2.25rem 2.75rem; border-right: 1px solid var(--border); flex: 1; min-width: 140px; }
  .stat:last-child { border-right: none; }
  .stat-num {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: 1.7rem; font-weight: 800; color: var(--text);
  }
  .stat-label { font-size: 0.72rem; color: var(--muted); margin-top: 0.3rem; letter-spacing: 0.04em; }

  /* ── HOW ── */
  .how { max-width: 920px; margin: 0 auto; padding: 7rem 2rem; }
  .section-label { font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.9rem; }
  .section-title {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 800;
    margin-bottom: 3rem; letter-spacing: -0.025em; color: var(--text);
  }
  .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; }
  .step {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 20px; padding: 1.75rem; position: relative; overflow: hidden;
    transition: border-color 0.2s;
  }
  .step:hover { border-color: var(--border-hover); }
  .step-num {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: 2.8rem; font-weight: 800; color: rgba(224,106,44,0.12);
    line-height: 1; margin-bottom: 1.25rem;
  }
  .step-title { font-size: 0.88rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text); }
  .step-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.7; }

  /* ── FORM ── */
  .form-section { max-width: 600px; margin: 0 auto; padding: 4rem 2rem 7rem; flex: 1; }
  .form-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 2.5rem; }
  .form-progress { display: flex; gap: 0.3rem; margin-bottom: 2.5rem; }
  .progress-dot { flex: 1; height: 2px; border-radius: 1px; background: var(--border); transition: background 0.3s; }
  .progress-dot.active { background: var(--copper); }
  .progress-dot.done { background: rgba(224,106,44,0.4); }
  .question-label {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: 1.3rem; font-weight: 700; margin-bottom: 0.45rem;
    letter-spacing: -0.015em; line-height: 1.3; color: var(--text);
  }
  .question-sub { font-size: 0.82rem; color: var(--muted); margin-bottom: 1.75rem; line-height: 1.65; }
  .option-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.6rem; margin-bottom: 2rem; }
  .option-btn {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 12px; padding: 0.8rem 1rem; font-size: 0.83rem;
    color: var(--muted2); cursor: pointer; font-family: inherit;
    text-align: left; transition: all 0.15s; line-height: 1.4;
  }
  .option-btn:hover { border-color: var(--border-hover); color: var(--text); }
  .option-btn.selected { border-color: var(--copper); color: var(--copper); background: var(--copper-dim); }
  .text-input {
    width: 100%; background: var(--bg); border: 1px solid var(--border);
    border-radius: 12px; padding: 0.85rem 1.1rem; font-size: 0.88rem;
    color: var(--text); font-family: inherit; outline: none;
    transition: border 0.2s, box-shadow 0.2s; margin-bottom: 2rem;
    resize: none; line-height: 1.6;
  }
  .text-input:focus { border-color: var(--copper); box-shadow: 0 0 0 3px var(--copper-glow); }
  .text-input::placeholder { color: var(--muted); }
  .url-input {
    width: 100%; background: var(--bg); border: 1px solid var(--border);
    border-radius: 12px; padding: 0.85rem 1.1rem; font-size: 0.9rem;
    color: var(--text); font-family: inherit; outline: none;
    transition: border 0.2s, box-shadow 0.2s; margin-bottom: 1.25rem;
  }
  .url-input:focus { border-color: var(--copper); box-shadow: 0 0 0 3px var(--copper-glow); }
  .url-input::placeholder { color: var(--muted); }
  .form-nav { display: flex; justify-content: space-between; align-items: center; }
  .form-nav-back {
    background: none; border: none; color: var(--muted);
    font-family: inherit; font-size: 0.84rem; cursor: pointer;
    padding: 0.5rem 0; transition: color 0.15s;
  }
  .form-nav-back:hover { color: var(--text); }
  .error-box {
    background: rgba(224,82,82,0.07); border: 1px solid rgba(224,82,82,0.2);
    border-radius: 10px; padding: 0.9rem 1.1rem; margin-bottom: 1.1rem;
    font-size: 0.82rem; color: #f4a0a0; line-height: 1.6;
  }

  /* ── LOADING ── */
  .loading-screen {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; min-height: 85vh; padding: 2rem; text-align: center;
  }
  .loading-eye { margin-bottom: 2.5rem; opacity: 0.9; }
  .loading-eye svg { animation: breathe 2.4s ease-in-out infinite; }
  @keyframes breathe { 0%,100%{transform:scale(1);opacity:0.85} 50%{transform:scale(1.06);opacity:1} }
  .loading-msg {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: 1.15rem; font-weight: 700; margin-bottom: 0.55rem; color: var(--text);
  }
  .loading-sub { font-size: 0.82rem; color: var(--muted); max-width: 360px; line-height: 1.65; }
  .loading-steps {
    display: flex; flex-direction: column; gap: 0.5rem;
    margin-top: 2.5rem; text-align: left; width: 100%; max-width: 280px;
  }
  .ls-item { display: flex; align-items: center; gap: 0.7rem; font-size: 0.79rem; color: var(--muted); transition: color 0.3s; }
  .ls-item.done { color: var(--success); }
  .ls-item.active { color: var(--text); }
  .ls-check {
    width: 15px; height: 15px; border-radius: 50%; border: 1px solid var(--border);
    flex-shrink: 0; transition: all 0.3s; display: flex; align-items: center;
    justify-content: center; font-size: 8px;
  }
  .ls-item.done .ls-check { background: var(--success); border-color: var(--success); color: #111; }
  .ls-item.active .ls-check { border-color: var(--copper); animation: pulse-ring 1.1s ease-in-out infinite; }
  @keyframes pulse-ring { 0%,100%{box-shadow:0 0 0 0 rgba(224,106,44,0.38)} 50%{box-shadow:0 0 0 5px transparent} }

  /* ── RESULTS ── */
  .results { max-width: 900px; margin: 0 auto; padding: 4rem 2rem 7rem; }
  .results-header { text-align: center; margin-bottom: 4rem; }
  .url-meta {
    font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 2rem;
  }

  /* score ring */
  .score-ring-wrap { position: relative; width: 200px; height: 200px; margin: 0 auto 1.5rem; }
  .score-ring-inner {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .score-number {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: 3.5rem; font-weight: 800; line-height: 1; color: var(--copper);
  }
  .score-denom { font-size: 0.75rem; color: var(--muted); margin-top: 0.2rem; }
  .score-label {
    font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted); margin-top: 0.4rem;
  }
  .score-grade {
    font-size: 0.78rem; font-weight: 600; color: var(--text);
    margin-top: 0.2rem; letter-spacing: 0.02em;
  }

  .opportunity-row { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin: 1.5rem 0; }
  .opp-chip {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 1rem 1.75rem; text-align: center;
    min-width: 130px;
  }
  .opp-val {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: 1.55rem; font-weight: 800;
  }
  .opp-val.potential { color: var(--text); }
  .opp-val.gap { color: var(--copper); }
  .opp-label { font-size: 0.66rem; color: var(--muted); margin-top: 0.25rem; letter-spacing: 0.08em; text-transform: uppercase; }
  .results-summary { max-width: 560px; margin: 0 auto; font-size: 0.95rem; color: var(--muted2); line-height: 1.8; }

  /* ── PERCEPT ── */
  .section-block { margin: 3rem 0; }
  .block-title {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: 1.2rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--text);
  }
  .block-sub { font-size: 0.8rem; color: var(--muted); margin-bottom: 1.75rem; line-height: 1.65; }
  .percept-items { display: flex; flex-direction: column; gap: 0.9rem; }
  .percept-item {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 1.2rem 1.4rem; transition: border-color 0.2s;
  }
  .percept-item:hover { border-color: var(--border-hover); }
  .percept-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem; }
  .percept-left { display: flex; align-items: center; gap: 0.55rem; }
  .percept-letter {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.16em;
    color: var(--muted); text-transform: uppercase;
  }
  .percept-name { font-size: 0.84rem; font-weight: 500; color: var(--text); }
  .bar-track { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 2px; transition: width 1.4s cubic-bezier(0.16,1,0.3,1); }
  .percept-desc { font-size: 0.72rem; color: var(--muted); margin-top: 0.5rem; line-height: 1.6; }

  /* ── INSIGHTS ── */
  .insight-list { display: flex; flex-direction: column; gap: 0.6rem; }
  .insight-item {
    display: flex; align-items: flex-start; gap: 0.75rem;
    padding: 0.95rem 1.2rem; background: var(--surface);
    border: 1px solid var(--border); border-radius: 14px;
  }
  .insight-icon { font-size: 0.75rem; flex-shrink: 0; margin-top: 0.12rem; font-weight: 700; }
  .insight-icon.ok { color: var(--success); }
  .insight-icon.warn { color: var(--warn); }
  .insight-text { font-size: 0.84rem; line-height: 1.65; }

  /* ── LOCKED ── */
  .locked-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.9rem; }
  .locked-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 1.3rem; position: relative;
    overflow: hidden; min-height: 100px;
  }
  .locked-card::before {
    content: ''; position: absolute; inset: 0;
    background: rgba(17,17,17,0.72); backdrop-filter: blur(5px);
    border-radius: 16px; z-index: 1;
  }
  .locked-content { filter: blur(2px); user-select: none; }
  .locked-badge {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.4rem; z-index: 2;
  }
  .locked-pill {
    font-size: 0.64rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted2); background: var(--surface2);
    border: 1px solid var(--border); border-radius: 999px;
    padding: 0.2rem 0.75rem; white-space: nowrap;
  }
  .locked-card-title { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem; color: var(--text); }
  .locked-card-desc { font-size: 0.76rem; color: var(--muted); line-height: 1.6; }

  /* ── CTA ── */
  .cta-box {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 24px; padding: 3.5rem 2rem; text-align: center;
    margin: 3rem 0; position: relative; overflow: hidden;
  }
  .cta-box::before {
    content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
    width: 400px; height: 280px;
    background: radial-gradient(ellipse at center, rgba(224,106,44,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-box h2 {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: clamp(1.6rem, 3vw, 2rem); font-weight: 800;
    margin-bottom: 0.8rem; letter-spacing: -0.02em;
    position: relative; color: var(--text);
  }
  .cta-box p {
    color: var(--muted); margin-bottom: 2rem; max-width: 440px;
    margin-left: auto; margin-right: auto; font-size: 0.92rem;
    line-height: 1.75; position: relative;
  }
  .cta-btns { display: flex; gap: 0.85rem; justify-content: center; flex-wrap: wrap; position: relative; }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--border); padding: 2rem 2rem;
    text-align: center; font-size: 0.74rem; color: var(--muted); line-height: 2;
    margin-top: auto;
  }
  .footer-logo { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.5rem; }
  .footer-tagline { color: var(--muted); font-size: 0.7rem; letter-spacing: 0.06em; }

  /* ── DIVIDER ── */
  .divider { height: 1px; background: var(--border); margin: 0; }

  /* ── SEO CONTENT SECTIONS ── */
  .seo-sections { max-width: 820px; margin: 0 auto; padding: 0 2rem 2rem; }
  .seo-section { padding: 5rem 0; border-bottom: 1px solid var(--border); }
  .seo-section:last-child { border-bottom: none; }
  .seo-section h2 {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: clamp(1.5rem, 2.8vw, 2rem); font-weight: 800;
    letter-spacing: -0.025em; color: var(--text);
    margin-bottom: 1.25rem; line-height: 1.15;
  }
  .seo-section h2 em { font-style: normal; color: var(--copper); }
  .seo-section p { font-size: 0.97rem; color: var(--muted2); line-height: 1.85; max-width: 640px; }
  .seo-section ul { margin-top: 1.25rem; padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
  .seo-section ul li {
    display: flex; align-items: center; gap: 0.6rem;
    font-size: 0.9rem; color: var(--muted2); line-height: 1.6;
  }
  .seo-section ul li::before {
    content: ''; display: inline-block; width: 5px; height: 5px;
    background: var(--copper); border-radius: 50%; flex-shrink: 0;
  }

  /* ── FAQ ── */
  .faq-section { max-width: 820px; margin: 0 auto; padding: 0 2rem 6rem; }
  .faq-section h2 {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: clamp(1.5rem, 2.8vw, 2rem); font-weight: 800;
    letter-spacing: -0.025em; color: var(--text);
    margin-bottom: 2.5rem; line-height: 1.15;
  }
  .faq-list { display: flex; flex-direction: column; gap: 0; }
  .faq-item { border-top: 1px solid var(--border); padding: 1.6rem 0; }
  .faq-item:last-child { border-bottom: 1px solid var(--border); }
  .faq-q {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    font-size: 0.95rem; font-weight: 700; color: var(--text);
    margin-bottom: 0.65rem; line-height: 1.4;
  }
  .faq-a { font-size: 0.86rem; color: var(--muted2); line-height: 1.8; max-width: 660px; }

  @media (max-width: 600px) {
    .seo-sections { padding: 0 1.25rem 1rem; }
    .seo-section { padding: 3.5rem 0; }
    .faq-section { padding: 0 1.25rem 4rem; }
  }

  /* ── MOBILE ── */
  @media (max-width: 600px) {
    .nav { padding: 1rem 1.25rem; }
    .hero { padding: 5rem 1.25rem 3.5rem; }
    .stats-row { flex-direction: column; }
    .stat { border-right: none; border-bottom: 1px solid var(--border); }
    .stat:last-child { border-bottom: none; }
    .how { padding: 4rem 1.25rem; }
    .form-section { padding: 2.5rem 1.25rem 5rem; }
    .form-card { padding: 1.75rem 1.25rem; }
    .results { padding: 3rem 1.25rem 5rem; }
    .cta-box { padding: 2.5rem 1.25rem; }
  }
`;

/* ── Eye SVG logo component ── */
function EyeLogo({ size = 36 }) {
  const s = size;
  return (
    <svg width={s} height={s * 0.56} viewBox="0 0 64 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* eye outline */}
      <path
        d="M32 2C18 2 4 18 4 18C4 18 18 34 32 34C46 34 60 18 60 18C60 18 46 2 32 2Z"
        stroke="#F5F1E8" strokeWidth="2.2" fill="none" strokeLinejoin="round"
      />
      {/* iris circle */}
      <circle cx="32" cy="18" r="9" stroke="#F5F1E8" strokeWidth="2" fill="none"/>
      {/* PS text */}
      <text x="32" y="22.5" textAnchor="middle"
        fontFamily="'Inter Tight','Inter',sans-serif" fontWeight="800"
        fontSize="9" fill="#E06A2C" letterSpacing="-0.5">PS</text>
    </svg>
  );
}

/* ── Score grade label ── */
function gradeLabel(score) {
  if (score >= 90) return "Excellent Perception";
  if (score >= 75) return "Good Perception";
  if (score >= 60) return "Moderate Perception";
  if (score >= 45) return "Below Average";
  return "Needs Attention";
}

/* ── Score Ring ── */
function ScoreRing({ score }) {
  const r = 80, circ = 2 * Math.PI * r, dash = (score / 100) * circ;
  return (
    <div className="score-ring-wrap">
      <svg viewBox="0 0 200 200" style={{ width:"100%", height:"100%", transform:"rotate(-90deg)" }}>
        <defs>
          <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E06A2C"/>
            <stop offset="100%" stopColor="#f0a070"/>
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={r} fill="none" stroke="#2B2B2B" strokeWidth={10}/>
        <circle cx="100" cy="100" r={r} fill="none" stroke="url(#sg)" strokeWidth={10}
          strokeLinecap="round" strokeDasharray={`${dash} ${circ}`}
          style={{ transition:"stroke-dasharray 1.6s cubic-bezier(0.16,1,0.3,1)" }}/>
      </svg>
      <div className="score-ring-inner">
        <div className="score-number">{score}</div>
        <div className="score-denom">/ 100</div>
        <div className="score-label">Perception Score</div>
        <div className="score-grade">{gradeLabel(score)}</div>
      </div>
    </div>
  );
}

const QUESTIONS = [
  { id:"type",    label:"What type of business do you have?",       sub:"We calibrate the analysis to your market and industry.",          options:["SaaS","Agency","Personal Brand","Ecommerce","Service Business","Other"] },
  { id:"goal",    label:"What is your primary goal?",               sub:"This shapes how we evaluate your conversion potential.",          options:["Generate leads","Book calls","Sell products","Build authority","Showcase work","Other"] },
  { id:"client",  label:"Who is your ideal client?",                sub:"Describe the person or company you're trying to attract.",        type:"text", placeholder:"e.g. B2B SaaS founders scaling from $1M to $10M ARR" },
  { id:"value",   label:"What is the average value of your offer?", sub:"Higher-value offers require stronger trust and authority signals.", options:["Under $500","$500–$2,000","$2,000–$10,000","$10,000+"] },
  { id:"holding", label:"What's holding your website back?",        sub:"Your honest assessment helps us focus on what matters most.",     options:["Doesn't feel premium","Doesn't convert","Message isn't clear","Looks outdated","Not sure"] },
  { id:"url",     label:"Enter your website URL",                   sub:"We'll read your live content, copy, and perception signals.",    type:"url", placeholder:"https://yourwebsite.com" },
];

const PERCEPT_META = [
  { letter:"P", name:"Positioning",  color:"#E06A2C" },
  { letter:"E", name:"Expertise",    color:"#d4884a" },
  { letter:"R", name:"Relevance",    color:"#c9a87c" },
  { letter:"C", name:"Credibility",  color:"#E06A2C" },
  { letter:"E", name:"Experience",   color:"#d4884a" },
  { letter:"P", name:"Premium Feel", color:"#c9a87c" },
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

const LOADING_STEPS = [
  "Accessing website",
  "Extracting content and copy",
  "Analyzing positioning signals",
  "Evaluating trust indicators",
  "Measuring premium perception",
  "Calculating P.E.R.C.E.P.T. scores",
  "Generating personalized insights",
];

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

export default function App() {
  const [view,     setView]     = useState("landing");
  const [step,     setStep]     = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [loadStep, setLoadStep] = useState(0);
  const [animBars, setAnimBars] = useState(false);
  const [report,   setReport]   = useState(null);
  const [error,    setError]    = useState(null);

  const startAnalysis = async (ans) => {
    setView("loading"); setLoadStep(0); setError(null);
    const timer = setInterval(() => setLoadStep(s => Math.min(s + 1, LOADING_STEPS.length - 2)), 1500);
    try {
      const siteContent = await fetchSiteContent(ans.url);
      const result = await runAnalysis(ans, siteContent);
      clearInterval(timer);
      setLoadStep(LOADING_STEPS.length - 1);
      setReport({ ...result, siteContent });
      setTimeout(() => { setView("results"); setTimeout(() => setAnimBars(true), 400); }, 700);
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

  const reset = () => { setView("landing"); setStep(0); setAnswers({}); setAnimBars(false); setReport(null); setError(null); };

  const q = QUESTIONS[step];
  const scores = report
    ? [report.scores.Positioning, report.scores.Expertise, report.scores.Relevance,
       report.scores.Credibility, report.scores.Experience, report.scores.PremiumFeel, report.scores.Trust]
    : Array(7).fill(0);
  const total     = report ? Math.round(scores.reduce((a, b) => a + b, 0) / 7) : 0;
  const potential = Math.min(97, total + 22);
  const gap       = potential - total;
  const descs     = report?.percept_descriptions ? Object.values(report.percept_descriptions) : Array(7).fill("");

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* ── NAV ── */}
        <nav className="nav">
          <div className="nav-logo" onClick={reset}>
            <EyeLogo size={40}/>
            <span className="nav-logo-text">Perception Score</span>
          </div>
          <div className="nav-badge">Beta</div>
        </nav>

        {/* ── LANDING ── */}
        {view === "landing" && (
          <>
            <section className="hero">
              <div className="eyebrow"><div className="eyebrow-dot"/>Perception Intelligence Platform</div>
              <h1>Your website is being<br/>judged before it is<br/><em>ever read.</em></h1>
              <p className="hero-sub">
                Measure the trust, authority, and credibility signals your website communicates.
                See your site through your customer's eyes.
              </p>
              <div className="cta-group">
                <button className="btn-primary" onClick={() => setView("form")}>
                  Analyze My Website
                </button>
              </div>
              <p className="hero-tagline">Understand How You Are Perceived</p>
            </section>

            <div className="divider"/>
            <div className="stats-row">
              <div className="stat"><div className="stat-num">P.E.R.C.E.P.T.</div><div className="stat-label">Proprietary framework</div></div>
              <div className="stat"><div className="stat-num">7</div><div className="stat-label">Perception dimensions</div></div>
              <div className="stat"><div className="stat-num">~30s</div><div className="stat-label">Analysis time</div></div>
              <div className="stat"><div className="stat-num">Live</div><div className="stat-label">Real site content</div></div>
            </div>
            <div className="divider"/>

            <section className="how">
              <div className="section-label">How it works</div>
              <div className="section-title">First impressions<br/>are measurable.</div>
              <div className="steps">
                {[
                  ["Context.",    "Share your business type and goals so we can calibrate the analysis to your market."],
                  ["URL.",        "Paste your website. We read your live content — copy, headings, CTAs, structure."],
                  ["Analysis.",   "Our engine scores 7 perception dimensions from your real site data, not guesses."],
                  ["Insights.",   "Receive specific, actionable findings. No generic advice. No SEO fluff."],
                ].map(([t, d], i) => (
                  <div className="step" key={i}>
                    <div className="step-num">0{i + 1}</div>
                    <div className="step-title">{t}</div>
                    <div className="step-desc">{d}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SEO CONTENT SECTIONS ── */}
            <div className="seo-sections">
              <section className="seo-section">
                <h2>What Is <em>Website Perception?</em></h2>
                <p>
                  Website perception is the impression visitors form within seconds of landing on your website.
                  Trust, authority, clarity, design quality, and messaging all influence whether users stay,
                  engage, or leave. Before a visitor reads a single sentence, they have already judged whether
                  your business is credible, premium, and worth their time.
                </p>
              </section>

              <section className="seo-section">
                <h2>Why First Impressions Matter</h2>
                <p>
                  Most visitors decide whether they trust a business before reading the entire page.
                  Small perception signals — typography, spacing, copy clarity, visual hierarchy — can
                  significantly impact conversions, lead quality, and overall business growth. A website
                  that fails to communicate authority and credibility loses potential clients before the
                  conversation even starts.
                </p>
              </section>

              <section className="seo-section">
                <h2>How Perception Score Works</h2>
                <p>
                  Perception Score evaluates the visual, structural, and communication signals that influence
                  how your website is perceived by potential customers. The platform reads your live site
                  content and scores seven perception dimensions using the P.E.R.C.E.P.T. framework.
                </p>
                <ul>
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

            {/* ── FAQ ── */}
            <section className="faq-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {[
                  ["What is a perception score?",
                   "A perception score is a quantitative measurement of how your website is perceived by potential customers. It evaluates trust signals, authority indicators, clarity of messaging, credibility, design quality, and overall professional impression across seven dimensions using the P.E.R.C.E.P.T. framework."],
                  ["How do users judge a website?",
                   "Users form a first impression within 50 milliseconds of landing on a website. They judge based on visual design quality, clarity of messaging, trust signals like testimonials and professional copy, authority indicators, and how well the site communicates the value of its offer. These signals determine whether a visitor stays, engages, or leaves."],
                  ["Why does website trust matter?",
                   "Website trust directly affects conversion rates, lead quality, and revenue. Visitors who don't trust a website won't submit forms, make purchases, or book calls — regardless of how good the underlying product or service is. Building trust through clear signals is one of the highest-leverage improvements a business can make."],
                  ["What makes a website look professional?",
                   "A professional website communicates clarity, competence, and consistency. Key factors include intentional typography, clear and specific messaging, social proof, a coherent visual identity, fast load times, and copy that speaks directly to the target audience's problem and desired outcome."],
                  ["How can I improve my website's credibility?",
                   "To improve website credibility, focus on: specific and outcome-oriented copy (not vague claims), visible social proof, a clear and professional visual identity, a well-defined value proposition above the fold, and trust signals like guarantees, credentials, or media mentions."],
                  ["How is Perception Score different from SEO tools?",
                   "Perception Score is not an SEO tool. SEO tools measure technical signals for search engines. Perception Score measures human signals — how real visitors perceive and judge your website. It evaluates trust, authority, credibility, clarity, and premium feel: the factors that determine whether a visitor converts into a client, not whether they find you on Google."],
                ].map(([q, a], i) => (
                  <div key={i} className="faq-item">
                    <div className="faq-q">{q}</div>
                    <div className="faq-a">{a}</div>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ textAlign:"center", padding:"0 2rem 7rem" }}>
              <button className="btn-primary" style={{ fontSize:"0.95rem", padding:"0.95rem 2.5rem" }} onClick={() => setView("form")}>
                Get My Perception Score
              </button>
            </div>
          </>
        )}

        {/* ── FORM ── */}
        {view === "form" && (
          <div className="form-section">
            <div className="form-card">
              <div className="form-progress">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className={`progress-dot ${i < step ? "done" : i === step ? "active" : ""}`}/>
                ))}
              </div>

              <div className="question-label">{q.label}</div>
              <div className="question-sub">{q.sub}</div>

              {q.type === "text" && (
                <>
                  <textarea className="text-input" rows={3} placeholder={q.placeholder}
                    value={answers[q.id] || ""}
                    onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}/>
                  <div className="form-nav">
                    {step > 0
                      ? <button className="form-nav-back" onClick={() => setStep(s => s - 1)}>← Back</button>
                      : <span/>}
                    <button className="btn-primary" onClick={() => setStep(s => s + 1)} disabled={!answers[q.id]}>
                      Continue →
                    </button>
                  </div>
                </>
              )}

              {q.type === "url" && (
                <>
                  <input className="url-input" type="url" placeholder={q.placeholder}
                    value={answers.url || ""}
                    onChange={e => setAnswers(a => ({ ...a, url: e.target.value }))}/>
                  {error && <div className="error-box">⚠ {error}</div>}
                  <div className="form-nav">
                    <button className="form-nav-back" onClick={() => setStep(s => s - 1)}>← Back</button>
                    <button className="btn-primary" onClick={() => startAnalysis(answers)} disabled={!answers.url}>
                      Run Analysis →
                    </button>
                  </div>
                </>
              )}

              {!q.type && (
                <div className="option-grid">
                  {q.options.map(opt => (
                    <button key={opt}
                      className={`option-btn ${answers[q.id] === opt ? "selected" : ""}`}
                      onClick={() => handleOption(opt)}>{opt}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── LOADING ── */}
        {view === "loading" && (
          <div className="loading-screen">
            <div className="loading-eye"><EyeLogo size={72}/></div>
            <div className="loading-msg">{LOADING_STEPS[loadStep]}</div>
            <div className="loading-sub">Running perception analysis on {answers.url}</div>
            <div className="loading-steps">
              {LOADING_STEPS.map((s, i) => (
                <div key={i} className={`ls-item ${i < loadStep ? "done" : i === loadStep ? "active" : ""}`}>
                  <div className="ls-check">{i < loadStep ? "✓" : ""}</div>
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {view === "results" && report && (
          <div className="results">
            <div className="results-header">
              <div className="url-meta">{answers.url} · {answers.type} · {answers.value}</div>
              <ScoreRing score={total}/>
              <div className="opportunity-row">
                <div className="opp-chip">
                  <div className="opp-val potential">{potential}</div>
                  <div className="opp-label">Potential Score</div>
                </div>
                <div className="opp-chip">
                  <div className="opp-val gap">+{gap} pts</div>
                  <div className="opp-label">Opportunity Gap</div>
                </div>
              </div>
              <p className="results-summary">{report.summary}</p>
            </div>

            {/* PERCEPT BARS */}
            <div className="section-block">
              <div className="block-title">P.E.R.C.E.P.T. Framework</div>
              <div className="block-sub">Seven perception dimensions scored from your live site content</div>
              <div className="percept-items">
                {PERCEPT_META.map((item, i) => (
                  <div key={i} className="percept-item">
                    <div className="percept-row">
                      <div className="percept-left">
                        <span className="percept-letter">{item.letter}</span>
                        <span className="percept-name">{item.name}</span>
                      </div>
                      <span style={{ fontFamily:"'Inter Tight','Inter',sans-serif", fontSize:"0.95rem", fontWeight:700, color:item.color }}>{scores[i]}</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: animBars ? `${scores[i]}%` : "0%", background:`linear-gradient(90deg,${item.color}60,${item.color})` }}/>
                    </div>
                    {descs[i] && <div className="percept-desc">{descs[i]}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* INSIGHTS */}
            <div className="section-block">
              <div className="block-title">Perception Signals Detected</div>
              <div className="block-sub">Based on direct analysis of your site's content, copy and structure</div>
              <div className="insight-list">
                {(report.insights || []).map((ins, i) => (
                  <div key={i} className="insight-item">
                    <span className={`insight-icon ${ins.ok ? "ok" : "warn"}`}>{ins.ok ? "✓" : "⚠"}</span>
                    <span className="insight-text" style={{ color: ins.ok ? "var(--text)" : "var(--muted2)" }}>{ins.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LOCKED */}
            <div className="section-block">
              <div className="block-title">Strategic Recommendations</div>
              <div className="block-sub">Unlock the full report for your complete perception improvement plan</div>
              <div className="locked-grid">
                {LOCKED_CARDS.map((c, i) => (
                  <div key={i} className="locked-card">
                    <div className="locked-content">
                      <div className="locked-card-title">{c.title}</div>
                      <div className="locked-card-desc">{c.desc}</div>
                    </div>
                    <div className="locked-badge">
                      <div style={{ fontSize:"1.1rem" }}>🔒</div>
                      <div className="locked-pill">Locked</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="cta-box">
              <h2>Perception drives conversion.</h2>
              <p>Get a personalized review and discover exactly how to improve the signals that influence trust, authority and perceived value.</p>
              <div className="cta-btns">
                <button className="btn-primary" style={{ fontSize:"0.9rem", padding:"0.9rem 2rem" }}>Book a Free Review Call</button>
                <button className="btn-secondary" style={{ fontSize:"0.9rem", padding:"0.9rem 2rem" }}>Unlock Full Report</button>
              </div>
            </div>

            <div style={{ textAlign:"center", marginTop:"2rem" }}>
              <button className="btn-secondary" onClick={reset}>← Analyze Another Website</button>
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-logo">
            <EyeLogo size={28}/>
            <span style={{ fontFamily:"'Inter Tight','Inter',sans-serif", fontWeight:700, fontSize:"0.82rem", color:"var(--muted2)" }}>
              Perception Score
            </span>
          </div>
          <div className="footer-tagline">Understand How You Are Perceived</div>
          <div style={{ marginTop:"0.5rem" }}>© 2025 Perception Score · Perception drives conversion.</div>
        </footer>

      </div>
    </>
  );
}
