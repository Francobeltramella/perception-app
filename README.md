# PerceptionScore

Website Perception Intelligence tool — analyzes how potential clients perceive your website across 7 dimensions.

## Deploy to Netlify

### Step 1 — Get your Anthropic API key
1. Go to https://console.anthropic.com
2. Create an account
3. Go to **API Keys** → **Create Key**
4. Copy it (shown only once)
5. Add billing credits (minimum $5 — each analysis costs ~$0.01)

### Step 2 — Deploy

**Option A: Drag & Drop (easiest)**
1. Run `npm install && npm run build` locally
2. Drag the `dist/` folder to https://app.netlify.com/drop

**Option B: GitHub (recommended)**
1. Push this folder to a GitHub repo
2. Go to https://app.netlify.com → "Add new site" → "Import from Git"
3. Select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click Deploy

### Step 3 — Add your API key
1. In Netlify → Site Settings → **Environment Variables**
2. Add: `ANTHROPIC_API_KEY` = your key from Step 1
3. Trigger a redeploy (Deploys → Trigger deploy)

That's it. Your site is live.

## Local development

```bash
npm install
npm run dev
```

Note: The analysis function requires your API key. For local dev, create a `.env` file:
```
ANTHROPIC_API_KEY=your-key-here
```
And run `netlify dev` instead of `npm run dev` (requires Netlify CLI).

## Project structure

```
perception-score/
├── netlify/
│   └── functions/
│       └── analyze.js      ← Serverless function (API key lives here, hidden)
├── src/
│   ├── main.jsx
│   └── App.jsx             ← Full application
├── index.html
├── package.json
├── vite.config.js
└── netlify.toml
```
