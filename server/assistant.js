// POST /api/assistant: the website's AI guide.
// Answers questions about the school using Groq's free LLM tier, grounded only
// in schoolKnowledge.json (generated from the website content with
// `npm run knowledge` in the project root). The API key stays on the server.
//
// Env: GROQ_API_KEY (required), GROQ_MODEL (optional).

const path = require('path');
const fs = require('fs');

const KNOWLEDGE_PATH = path.join(__dirname, 'schoolKnowledge.json');
const MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;

let knowledge = '';
try {
  knowledge = JSON.parse(fs.readFileSync(KNOWLEDGE_PATH, 'utf8')).text;
} catch (err) {
  console.warn('Assistant: schoolKnowledge.json missing; run `npm run knowledge` in the project root.');
}

const systemPrompt = () => `You are "Gurukulam AI", the friendly voice guide on the website of Gurukulam Global School, Mathura.

Rules:
- Answer ONLY using the SCHOOL KNOWLEDGE below. Never invent fees, dates, board affiliation, results or staff names.
- If the answer is not in the knowledge, say so briefly and share the office contact details from the knowledge.
- If the question is not about the school, admissions, education or parenting at this school, politely say you can only help with questions about Gurukulam Global School.
- Reply in the same language as the visitor (English, Hindi or Hinglish).
- Keep replies warm and short: at most 90 words, plain sentences, no markdown, no lists with symbols. Replies may be read aloud.
- When it helps, invite the parent to apply online or book a campus visit.

SCHOOL KNOWLEDGE:
${knowledge}`;

// very small in-memory rate limiter, per IP
const hits = new Map();
const limited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
};

const clean = (s, max) => String(s || '').slice(0, max).trim();

module.exports = function registerAssistant(app) {
  app.post('/api/assistant', async (req, res) => {
    if (!process.env.GROQ_API_KEY || !knowledge) {
      return res.status(503).json({ error: 'assistant_not_configured' });
    }
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    if (limited(ip)) {
      return res.status(429).json({ error: 'rate_limited' });
    }

    const question = clean(req.body?.question, 500);
    if (!question) return res.status(400).json({ error: 'empty_question' });

    const history = Array.isArray(req.body?.history)
      ? req.body.history
          .slice(-6)
          .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
          .map((m) => ({ role: m.role, content: clean(m.content, 800) }))
      : [];

    try {
      const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          temperature: 0.3,
          max_tokens: 300,
          messages: [{ role: 'system', content: systemPrompt() }, ...history, { role: 'user', content: question }],
        }),
      });
      if (!r.ok) {
        console.error('Assistant upstream error', r.status, await r.text());
        return res.status(502).json({ error: 'upstream_error' });
      }
      const data = await r.json();
      const answer = data.choices?.[0]?.message?.content?.trim();
      if (!answer) return res.status(502).json({ error: 'empty_answer' });
      res.json({ answer });
    } catch (err) {
      console.error('Assistant error', err);
      res.status(500).json({ error: 'assistant_failed' });
    }
  });
};
