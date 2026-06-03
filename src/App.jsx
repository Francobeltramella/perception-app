import { useState, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #080810; color: #e8e6f0; -webkit-font-smoothing: antialiased; }
  :root {
    --bg:#080810; --bg2:#0d0d1a; --bg3:#111120;
    --surface:rgba(255,255,255,0.03); --surface2:rgba(255,255,255,0.06);
    --border:rgba(255,255,255,0.08); --border2:rgba(255,255,255,0.14);
    --accent:#7c5cfc; --accent2:#a78bfa; --accent-glow:rgba(124,92,252,0.3);
    --text:#e8e6f0; --muted:#7e7a96; --muted2:#b0adcc;
    --success:#22d3a5; --warn:#f59e0b; --danger:#ef4444;
  }
  .app { min-height: 100vh; }
  /* NAV */
  .nav { display:flex; align-items:center; justify-content:space-between; padding:1.25rem 2rem; border-bottom:1px solid var(--border); position:sticky; top:0; z-index:100; background:rgba(8,8,16,0.9); backdrop-filter:blur(20px); }
  .nav-logo { font-family:'Syne',sans-serif; font-weight:800; font-size:1.05rem; letter-spacing:-0.02em; color:var(--text); text-decoration:none; }
  .nav-logo span { color:var(--accent2); }
  .nav-badge { font-size:0.68rem; background:rgba(124,92,252,0.12); border:1px solid rgba(124,92,252,0.25); border-radius:100px; padding:0.25rem 0.8rem; color:var(--accent2); letter-spacing:0.06em; text-transform:uppercase; }
  /* HERO */
  .hero { max-width:860px; margin:0 auto; padding:8rem 2rem 5rem; text-align:center; position:relative; }
  .hero::before { content:''; position:absolute; top:0; left:50%; transform:translateX(-50%); width:700px; height:500px; background:radial-gradient(ellipse at center,rgba(124,92,252,0.1) 0%,transparent 65%); pointer-events:none; }
  .eyebrow { display:inline-flex; align-items:center; gap:0.5rem; font-size:0.73rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--accent2); background:rgba(124,92,252,0.08); border:1px solid rgba(124,92,252,0.2); border-radius:100px; padding:0.4rem 1rem; margin-bottom:2rem; }
  .eyebrow-dot { width:6px; height:6px; background:var(--accent2); border-radius:50%; animation:pulse-dot 2s ease-in-out infinite; flex-shrink:0; }
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
  .hero h1 { font-family:'Syne',sans-serif; font-size:clamp(2.5rem,5.5vw,4.2rem); font-weight:800; line-height:1.08; letter-spacing:-0.03em; margin-bottom:1.5rem; }
  .hero h1 em { font-style:italic; color:var(--accent2); }
  .hero-sub { font-size:1.15rem; color:var(--muted2); line-height:1.75; max-width:560px; margin:0 auto 3rem; font-weight:300; }
  .cta-group { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
  /* BUTTONS */
  .btn-primary { background:var(--accent); color:#fff; border:none; border-radius:10px; padding:0.9rem 2rem; font-size:0.95rem; font-weight:500; cursor:pointer; font-family:inherit; transition:all 0.2s; box-shadow:0 0 28px var(--accent-glow); letter-spacing:-0.01em; }
  .btn-primary:hover { background:#8b6dfd; transform:translateY(-1px); box-shadow:0 6px 36px var(--accent-glow); }
  .btn-primary:active { transform:translateY(0); }
  .btn-primary:disabled { opacity:0.45; cursor:not-allowed; transform:none; box-shadow:none; }
  .btn-secondary { background:var(--surface); color:var(--muted2); border:1px solid var(--border2); border-radius:10px; padding:0.9rem 2rem; font-size:0.95rem; font-weight:500; cursor:pointer; font-family:inherit; transition:all 0.2s; }
  .btn-secondary:hover { background:var(--surface2); color:var(--text); border-color:rgba(255,255,255,0.2); }
  /* STATS */
  .stats-row { display:flex; justify-content:center; gap:0; border-top:1px solid var(--border); border-bottom:1px solid var(--border); flex-wrap:wrap; }
  .stat { text-align:center; padding:2.5rem 3rem; border-right:1px solid var(--border); }
  .stat:last-child { border-right:none; }
  .stat-num { font-family:'Syne',sans-serif; font-size:1.9rem; font-weight:800; color:var(--text); }
  .stat-label { font-size:0.78rem; color:var(--muted); margin-top:0.3rem; letter-spacing:0.04em; }
  /* HOW */
  .how { max-width:920px; margin:0 auto; padding:7rem 2rem; }
  .section-label { font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted); margin-bottom:1rem; }
  .section-title { font-family:'Syne',sans-serif; font-size:2.1rem; font-weight:800; margin-bottom:3rem; letter-spacing:-0.025em; }
  .steps { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:1.5rem; }
  .step { background:var(--surface); border:1px solid var(--border); border-radius:18px; padding:1.75rem; position:relative; overflow:hidden; transition:border-color 0.2s; }
  .step:hover { border-color:var(--border2); }
  .step::before { content:''; position:absolute; top:0; right:0; width:100px; height:100px; background:radial-gradient(ellipse at top right,rgba(124,92,252,0.07),transparent); }
  .step-num { font-family:'Syne',sans-serif; font-size:3.2rem; font-weight:800; color:rgba(124,92,252,0.12); line-height:1; margin-bottom:1.25rem; }
  .step-title { font-size:0.9rem; font-weight:600; margin-bottom:0.6rem; color:var(--text); }
  .step-desc { font-size:0.82rem; color:var(--muted); line-height:1.65; }
  /* FORM */
  .form-section { max-width:660px; margin:0 auto; padding:4rem 2rem 7rem; }
  .form-card { background:var(--bg3); border:1px solid var(--border2); border-radius:22px; padding:2.75rem; }
  .form-progress { display:flex; gap:0.35rem; margin-bottom:2.75rem; }
  .progress-dot { flex:1; height:3px; border-radius:2px; background:var(--border2); transition:background 0.35s; }
  .progress-dot.active { background:var(--accent); }
  .progress-dot.done { background:var(--accent2); }
  .question-label { font-family:'Syne',sans-serif; font-size:1.35rem; font-weight:700; margin-bottom:0.5rem; letter-spacing:-0.015em; line-height:1.3; }
  .question-sub { font-size:0.84rem; color:var(--muted); margin-bottom:1.85rem; line-height:1.6; }
  .option-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:0.7rem; margin-bottom:2rem; }
  .option-btn { background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:0.85rem 1rem; font-size:0.84rem; color:var(--muted2); cursor:pointer; font-family:inherit; text-align:left; transition:all 0.15s; line-height:1.4; }
  .option-btn:hover { border-color:var(--border2); color:var(--text); background:var(--surface2); }
  .option-btn.selected { border-color:var(--accent); color:var(--accent2); background:rgba(124,92,252,0.08); }
  .text-input { width:100%; background:var(--surface); border:1px solid var(--border2); border-radius:10px; padding:0.9rem 1.2rem; font-size:0.9rem; color:var(--text); font-family:inherit; outline:none; transition:border 0.2s,box-shadow 0.2s; margin-bottom:2rem; resize:none; line-height:1.6; }
  .text-input:focus { border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow); }
  .text-input::placeholder { color:var(--muted); }
  .url-input { width:100%; background:var(--surface); border:1px solid var(--border2); border-radius:10px; padding:0.9rem 1.2rem; font-size:0.95rem; color:var(--text); font-family:inherit; outline:none; transition:border 0.2s,box-shadow 0.2s; margin-bottom:1.5rem; }
  .url-input:focus { border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow); }
  .url-input::placeholder { color:var(--muted); }
  .form-nav { display:flex; justify-content:space-between; align-items:center; }
  .form-nav-back { background:none; border:none; color:var(--muted); font-family:inherit; font-size:0.85rem; cursor:pointer; padding:0.5rem 0; transition:color 0.15s; }
  .form-nav-back:hover { color:var(--text); }
  .error-box { background:rgba(239,68,68,0.07); border:1px solid rgba(239,68,68,0.22); border-radius:10px; padding:1rem 1.2rem; margin-bottom:1.25rem; font-size:0.84rem; color:#fca5a5; line-height:1.6; }
  /* LOADING */
  .loading-screen { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:85vh; padding:2rem; text-align:center; }
  .loading-ring { width:84px; height:84px; border-radius:50%; border:2px solid var(--border); border-top-color:var(--accent); animation:spin 1.1s linear infinite; margin-bottom:2.75rem; position:relative; flex-shrink:0; }
  .loading-ring::after { content:''; position:absolute; inset:7px; border-radius:50%; border:2px solid var(--border); border-bottom-color:var(--accent2); animation:spin 1.9s linear infinite reverse; }
  @keyframes spin { to { transform:rotate(360deg); } }
  .loading-msg { font-family:'Syne',sans-serif; font-size:1.2rem; font-weight:700; margin-bottom:0.6rem; }
  .loading-sub { font-size:0.84rem; color:var(--muted); max-width:380px; line-height:1.6; }
  .loading-steps { display:flex; flex-direction:column; gap:0.55rem; margin-top:2.75rem; text-align:left; width:100%; max-width:300px; }
  .ls-item { display:flex; align-items:center; gap:0.75rem; font-size:0.81rem; color:var(--muted); transition:color 0.3s; }
  .ls-item.done { color:var(--success); }
  .ls-item.active { color:var(--text); }
  .ls-check { width:16px; height:16px; border-radius:50%; border:1px solid var(--border2); flex-shrink:0; transition:all 0.3s; display:flex; align-items:center; justify-content:center; font-size:9px; }
  .ls-item.done .ls-check { background:var(--success); border-color:var(--success); color:#fff; }
  .ls-item.active .ls-check { border-color:var(--accent); animation:pulse-ring 1s ease-in-out infinite; }
  @keyframes pulse-ring { 0%,100%{box-shadow:0 0 0 0 rgba(124,92,252,0.4)} 50%{box-shadow:0 0 0 5px transparent} }
  /* RESULTS */
  .results { max-width:940px; margin:0 auto; padding:4.5rem 2rem 7rem; }
  .results-header { text-align:center; margin-bottom:4.5rem; }
  .url-meta { font-size:0.72rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--muted); margin-bottom:1.75rem; }
  .opportunity-row { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin:1.5rem 0; }
  .opp-chip { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:1rem 1.75rem; text-align:center; }
  .opp-val { font-family:'Syne',sans-serif; font-size:1.6rem; font-weight:800; }
  .opp-val.potential { color:var(--accent2); }
  .opp-val.gap { color:var(--success); }
  .opp-label { font-size:0.7rem; color:var(--muted); margin-top:0.2rem; letter-spacing:0.08em; text-transform:uppercase; }
  .results-summary { max-width:600px; margin:0 auto; font-size:1rem; color:var(--muted2); line-height:1.75; }
  /* PERCEPT */
  .section-block { margin:3.5rem 0; }
  .block-title { font-family:'Syne',sans-serif; font-size:1.3rem; font-weight:700; margin-bottom:0.4rem; }
  .block-sub { font-size:0.84rem; color:var(--muted); margin-bottom:2rem; line-height:1.6; }
  .percept-items { display:flex; flex-direction:column; gap:1.1rem; }
  .percept-item { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:1.25rem 1.5rem; transition:border-color 0.2s; }
  .percept-item:hover { border-color:var(--border2); }
  .percept-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:0.7rem; }
  .percept-left { display:flex; align-items:center; gap:0.6rem; }
  .percept-letter { font-family:'Syne',sans-serif; font-size:0.65rem; font-weight:800; letter-spacing:0.14em; color:var(--muted); }
  .percept-name { font-size:0.85rem; font-weight:500; color:var(--text); }
  .bar-track { height:4px; background:var(--border); border-radius:2px; overflow:hidden; }
  .bar-fill { height:100%; border-radius:2px; transition:width 1.3s cubic-bezier(0.16,1,0.3,1); }
  .percept-desc { font-size:0.74rem; color:var(--muted); margin-top:0.5rem; line-height:1.55; }
  /* INSIGHTS */
  .insight-list { display:flex; flex-direction:column; gap:0.7rem; }
  .insight-item { display:flex; align-items:flex-start; gap:0.8rem; padding:1rem 1.25rem; background:var(--surface); border:1px solid var(--border); border-radius:12px; }
  .insight-icon { font-size:0.8rem; flex-shrink:0; margin-top:0.1rem; font-weight:700; }
  .insight-icon.ok { color:var(--success); }
  .insight-icon.warn { color:var(--warn); }
  .insight-text { font-size:0.87rem; line-height:1.6; }
  /* LOCKED */
  .locked-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:1rem; }
  .locked-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:1.4rem; position:relative; overflow:hidden; min-height:108px; }
  .locked-card::before { content:''; position:absolute; inset:0; background:rgba(8,8,16,0.65); backdrop-filter:blur(4px); border-radius:14px; z-index:1; }
  .locked-content { filter:blur(2px); user-select:none; }
  .locked-badge { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); display:flex; flex-direction:column; align-items:center; gap:0.45rem; z-index:2; }
  .locked-pill { font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted2); background:var(--bg3); border:1px solid var(--border2); border-radius:100px; padding:0.25rem 0.8rem; white-space:nowrap; }
  .locked-card-title { font-size:0.88rem; font-weight:600; margin-bottom:0.4rem; color:var(--text); }
  .locked-card-desc { font-size:0.79rem; color:var(--muted); line-height:1.55; }
  /* CTA */
  .cta-box { background:var(--bg3); border:1px solid var(--border2); border-radius:22px; padding:3.5rem 2rem; text-align:center; margin:3.5rem 0; position:relative; overflow:hidden; }
  .cta-box::before { content:''; position:absolute; top:-80px; left:50%; transform:translateX(-50%); width:500px; height:350px; background:radial-gradient(ellipse at center,rgba(124,92,252,0.13) 0%,transparent 65%); pointer-events:none; }
  .cta-box h2 { font-family:'Syne',sans-serif; font-size:1.9rem; font-weight:800; margin-bottom:0.85rem; letter-spacing:-0.025em; position:relative; }
  .cta-box p { color:var(--muted2); margin-bottom:2.25rem; max-width:460px; margin-left:auto; margin-right:auto; font-size:0.95rem; line-height:1.7; position:relative; }
  .cta-btns { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; position:relative; }
  /* FOOTER */
  .footer { border-top:1px solid var(--border); padding:2.5rem 2rem; text-align:center; font-size:0.78rem; color:var(--muted); line-height:1.8; }
`;

const QUESTIONS = [
  { id:"type", label:"What type of business do you have?", sub:"We'll calibrate the analysis to your market and industry.", options:["SaaS","Agency","Personal Brand","Ecommerce","Service Business","Other"] },
  { id:"goal", label:"What is your primary goal?", sub:"This shapes how we evaluate your conversion potential.", options:["Generate leads","Book calls","Sell products","Build authority","Showcase work","Other"] },
  { id:"client", label:"Who is your ideal client?", sub:"Describe the person or company you're trying to attract.", type:"text", placeholder:"e.g. B2B SaaS founders scaling from $1M to $10M ARR" },
  { id:"value", label:"What is the average value of your offer?", sub:"Higher-value offers require stronger trust and authority signals.", options:["Under $500","$500–$2,000","$2,000–$10,000","$10,000+"] },
  { id:"holding", label:"What's holding your website back?", sub:"Your honest assessment helps us focus on what matters most.", options:["Doesn't feel premium","Doesn't convert","Message isn't clear","Looks outdated","Not sure"] },
  { id:"url", label:"Enter your website URL", sub:"We'll analyze your site's real content, copy and perception signals.", type:"url", placeholder:"https://yourwebsite.com" }
];

const PERCEPT_META = [
  { letter:"P", name:"Positioning", color:"#7c5cfc" },
  { letter:"E", name:"Expertise",   color:"#a78bfa" },
  { letter:"R", name:"Relevance",   color:"#22d3a5" },
  { letter:"C", name:"Credibility", color:"#38bdf8" },
  { letter:"E", name:"Experience",  color:"#f59e0b" },
  { letter:"P", name:"Premium Feel",color:"#f472b6" },
  { letter:"T", name:"Trust",       color:"#4ade80" },
];

const LOCKED_CARDS = [
  { title:"Premium Positioning Strategy",        desc:"Step-by-step repositioning framework tailored to your market and price point." },
  { title:"Conversion Flow Analysis",            desc:"Where visitors are dropping off and exactly how to fix each friction point." },
  { title:"Authority Building Roadmap",          desc:"12 specific changes to establish you as the obvious choice in your niche." },
  { title:"High-Ticket Positioning",             desc:"How to restructure your offer and website to attract $10K+ clients." },
  { title:"Trust Optimization Plan",             desc:"The exact trust signals you're missing and the precise places to add them." },
  { title:"Competitor Gap Analysis",             desc:"What your top competitors do better — and a plan to leapfrog them." },
];

const LOADING_STEPS = [
  "Accessing website",
  "Extracting content and copy",
  "Analyzing positioning",
  "Evaluating trust signals",
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

function ScoreRing({ score }) {
  const r = 80, circ = 2 * Math.PI * r, dash = (score / 100) * circ;
  return (
    <div style={{ position:"relative", width:200, height:200, margin:"0 auto 1.5rem" }}>
      <svg viewBox="0 0 200 200" style={{ width:"100%", height:"100%", transform:"rotate(-90deg)" }}>
        <defs>
          <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c5cfc"/>
            <stop offset="100%" stopColor="#22d3a5"/>
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={12}/>
        <circle cx="100" cy="100" r={r} fill="none" stroke="url(#sg)" strokeWidth={12} strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`} style={{ transition:"stroke-dasharray 1.5s cubic-bezier(0.16,1,0.3,1)" }}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"3.2rem", fontWeight:800, lineHeight:1 }}>{score}</div>
        <div style={{ fontSize:"0.78rem", color:"#7e7a96", marginTop:"0.25rem" }}>/ 100</div>
        <div style={{ fontSize:"0.6rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"#7e7a96", marginTop:"0.3rem" }}>Perception Score</div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView]       = useState("landing");
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});
  const [loadStep, setLoadStep] = useState(0);
  const [animBars, setAnimBars] = useState(false);
  const [report, setReport]   = useState(null);
  const [error, setError]     = useState(null);

  const startAnalysis = async (ans) => {
    setView("loading");
    setLoadStep(0);
    setError(null);
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
      setView("form");
      setStep(5);
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
        {/* NAV */}
        <nav className="nav">
          <span className="nav-logo" onClick={reset} style={{ cursor:"pointer" }}>Perception<span>Score</span></span>
          <div className="nav-badge">Beta</div>
        </nav>

        {/* ── LANDING ── */}
        {view === "landing" && (
          <>
            <section className="hero">
              <div className="eyebrow"><div className="eyebrow-dot"/>Website Perception Intelligence</div>
              <h1>Your website is not<br/>just being viewed.<br/><em>It's being judged.</em></h1>
              <p className="hero-sub">Discover how potential clients perceive your website. Uncover hidden opportunities to increase trust, authority and conversion potential.</p>
              <div className="cta-group">
                <button className="btn-primary" onClick={() => setView("form")}>Get My Perception Score</button>
              </div>
            </section>

            <div className="stats-row">
              <div className="stat"><div className="stat-num">P.E.R.C.E.P.T.</div><div className="stat-label">Proprietary framework</div></div>
              <div className="stat"><div className="stat-num">7</div><div className="stat-label">Perception dimensions</div></div>
              <div className="stat"><div className="stat-num">~30s</div><div className="stat-label">Analysis time</div></div>
              <div className="stat"><div className="stat-num">Real data</div><div className="stat-label">Live site analysis</div></div>
            </div>

            <section className="how">
              <div className="section-label">How it works</div>
              <div className="section-title">Four steps to clarity.</div>
              <div className="steps">
                {[
                  ["Tell us about your business.", "Share context so we can calibrate the analysis to your industry and price point."],
                  ["Paste your website URL.",      "We access your site's real content — copy, headings, CTAs, structure."],
                  ["We analyze your site.",        "Our engine reads your content and scores 7 perception dimensions in real time."],
                  ["Receive your report.",         "Real scores and specific insights tailored to your exact situation."],
                ].map(([t, d], i) => (
                  <div className="step" key={i}>
                    <div className="step-num">0{i + 1}</div>
                    <div className="step-title">{t}</div>
                    <div className="step-desc">{d}</div>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ textAlign:"center", padding:"0 2rem 7rem" }}>
              <button className="btn-primary" style={{ fontSize:"1rem", padding:"1rem 2.75rem" }} onClick={() => setView("form")}>
                Analyze My Website →
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
                      Analyze My Website →
                    </button>
                  </div>
                </>
              )}

              {!q.type && (
                <div className="option-grid">
                  {q.options.map(opt => (
                    <button key={opt} className={`option-btn ${answers[q.id] === opt ? "selected" : ""}`}
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
            <div className="loading-ring"/>
            <div className="loading-msg">{LOADING_STEPS[loadStep]}</div>
            <div className="loading-sub">Running full perception analysis on {answers.url}</div>
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
              <div className="block-sub">Your score across 7 perception dimensions — analyzed from your live site content</div>
              <div className="percept-items">
                {PERCEPT_META.map((item, i) => (
                  <div key={i} className="percept-item">
                    <div className="percept-row">
                      <div className="percept-left">
                        <span className="percept-letter">{item.letter}</span>
                        <span className="percept-name">{item.name}</span>
                      </div>
                      <span style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:700, color:item.color }}>{scores[i]}</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: animBars ? `${scores[i]}%` : "0%", background:`linear-gradient(90deg,${item.color}50,${item.color})` }}/>
                    </div>
                    {descs[i] && <div className="percept-desc">{descs[i]}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* INSIGHTS */}
            <div className="section-block">
              <div className="block-title">Detected Insights</div>
              <div className="block-sub">Based on real analysis of your site's content and positioning</div>
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
              <div className="block-title">Detailed Opportunities</div>
              <div className="block-sub">Unlock the full report to access your personalized recommendations</div>
              <div className="locked-grid">
                {LOCKED_CARDS.map((c, i) => (
                  <div key={i} className="locked-card">
                    <div className="locked-content">
                      <div className="locked-card-title">{c.title}</div>
                      <div className="locked-card-desc">{c.desc}</div>
                    </div>
                    <div className="locked-badge">
                      <div style={{ fontSize:"1.2rem" }}>🔒</div>
                      <div className="locked-pill">Locked</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="cta-box">
              <h2>Want the full Perception Report?</h2>
              <p>Get a personalized review and discover exactly how to improve your website's positioning, trust and perceived value.</p>
              <div className="cta-btns">
                <button className="btn-primary" style={{ fontSize:"1rem", padding:"1rem 2.25rem" }}>Book a Free Review Call</button>
                <button className="btn-secondary" style={{ fontSize:"1rem", padding:"1rem 2.25rem" }}>Unlock Full Report</button>
              </div>
            </div>

            <div style={{ textAlign:"center", marginTop:"2rem" }}>
              <button className="btn-secondary" onClick={reset}>← Analyze Another Website</button>
            </div>
          </div>
        )}

        <footer className="footer">
          © 2025 PerceptionScore · For businesses that compete on quality, not price.
        </footer>
      </div>
    </>
  );
}
