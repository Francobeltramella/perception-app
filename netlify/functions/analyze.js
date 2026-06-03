exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "API key not configured" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  const { answers, siteContent } = body;

  const siteInfo = siteContent
    ? `EXTRACTED SITE CONTENT:\nTitle: ${siteContent.title}\nMeta description: ${siteContent.meta}\nH1 Headings: ${siteContent.h1s.join(" | ")}\nH2 Headings: ${siteContent.h2s.join(" | ")}\nButtons/CTAs: ${siteContent.btns.join(" | ")}\nMain paragraphs: ${siteContent.paras.slice(0, 6).join(" || ")}`
    : `Could not extract site content directly. Analyze based on the URL, business type and provided context.`;

  const prompt = `You are a senior expert in brand positioning, web perception and conversion for premium businesses. Your analysis is direct, specific and actionable.

BUSINESS CONTEXT:
- Type: ${answers.type}
- Primary goal: ${answers.goal}
- Ideal client: ${answers.client || "Not specified"}
- Offer value: ${answers.value}
- Perceived problem: ${answers.holding}
- URL analyzed: ${answers.url}

${siteInfo}

Analyze this website and return ONLY a valid JSON object. No text before or after. No backticks. Pure JSON only.

The JSON must have exactly this structure:
{
  "scores": {
    "Positioning": 0,
    "Expertise": 0,
    "Relevance": 0,
    "Credibility": 0,
    "Experience": 0,
    "PremiumFeel": 0,
    "Trust": 0
  },
  "summary": "Two specific sentences about the overall perception of the site based on real content.",
  "insights": [
    {"ok": true, "text": "Specific strength observed"},
    {"ok": true, "text": "Second strength"},
    {"ok": false, "text": "Specific weakness with concrete context"},
    {"ok": false, "text": "Second weakness"},
    {"ok": false, "text": "Third weakness"}
  ],
  "percept_descriptions": {
    "Positioning": "Specific 1-sentence observation",
    "Expertise": "Specific 1-sentence observation",
    "Relevance": "Specific 1-sentence observation",
    "Credibility": "Specific 1-sentence observation",
    "Experience": "Specific 1-sentence observation",
    "PremiumFeel": "Specific 1-sentence observation",
    "Trust": "Specific 1-sentence observation"
  }
}

Scores: use numbers between 25 and 95. Be honest and critical. An average site scores between 45-65.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1200,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { statusCode: 502, body: JSON.stringify({ error: "Analysis service error", detail: err }) };
    }

    const data = await response.json();
    const raw = data.content?.find((b) => b.type === "text")?.text || "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");

    const result = JSON.parse(jsonMatch[0]);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(result),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
