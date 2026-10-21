import { localAnswer } from '../data/knowledge';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const API_URL = process.env.REACT_APP_ASSISTANT_API_URL || 'https://ggs-website-api.onrender.com/api/assistant';

/**
 * Ask the AI guide. Tries the server-side LLM first; if it isn't configured,
 * is rate-limited or slow (free hosting can cold-start), falls back to the
 * on-device answerer so visitors always get a reply.
 */
export const askAssistant = async (question: string, history: ChatMessage[]): Promise<{ answer: string; source: 'ai' | 'local' }> => {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const r = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history: history.slice(-6) }),
      signal: ctrl.signal,
    });
    if (r.ok) {
      const data = await r.json();
      if (data.answer) return { answer: data.answer, source: 'ai' };
    }
  } catch {
    /* network error or timeout: fall through */
  } finally {
    clearTimeout(timer);
  }
  return { answer: localAnswer(question), source: 'local' };
};
