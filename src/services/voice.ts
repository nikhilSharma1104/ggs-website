// Free, on-device voice: the browser's SpeechSynthesis (read aloud) and
// SpeechRecognition (dictation). Supported by Chrome/Android and iOS Safari;
// everything degrades silently where it isn't.

export type VoiceLang = 'en-IN' | 'hi-IN';

const synth = () => (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null);

export const canSpeak = () => !!synth();

const pickVoice = (lang: VoiceLang) => {
  const voices = synth()?.getVoices() ?? [];
  const base = lang.split('-')[0];
  return (
    voices.find((v) => v.lang === lang) ||
    voices.find((v) => v.lang.replace('_', '-').startsWith(`${base}-`)) ||
    (lang === 'en-IN' ? voices.find((v) => v.lang.startsWith('en-GB')) || voices.find((v) => v.lang.startsWith('en')) : undefined)
  );
};

export const stopSpeaking = () => synth()?.cancel();

/** Read text aloud; replaces whatever is currently being spoken. */
export const speak = (text: string, lang: VoiceLang = 'en-IN', onEnd?: () => void) => {
  const s = synth();
  if (!s || !text.trim()) return;
  s.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/[*_#`]/g, ''));
  u.lang = lang;
  const voice = pickVoice(lang);
  if (voice) u.voice = voice;
  u.rate = 1;
  u.pitch = 1;
  if (onEnd) {
    u.onend = onEnd;
    u.onerror = onEnd;
  }
  s.speak(u);
};

// Some browsers populate the voice list asynchronously.
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener?.('voiceschanged', () => window.speechSynthesis.getVoices());
}

/* Speech recognition ------------------------------------------------ */

type RecognitionCtor = new () => any;

const Recognition = (): RecognitionCtor | null =>
  typeof window === 'undefined' ? null : (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;

export const canListen = () => !!Recognition();

/**
 * Listen for one spoken question. Calls onPartial with interim text and
 * resolves with the final transcript ('' if nothing was heard).
 */
export const listenOnce = (lang: VoiceLang, onPartial?: (text: string) => void): { promise: Promise<string>; stop: () => void } => {
  const Ctor = Recognition();
  if (!Ctor) return { promise: Promise.resolve(''), stop: () => undefined };
  const rec = new Ctor();
  rec.lang = lang;
  rec.interimResults = true;
  rec.maxAlternatives = 1;
  rec.continuous = false;

  let finalText = '';
  const promise = new Promise<string>((resolve) => {
    rec.onresult = (e: any) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t;
        else interim += t;
      }
      onPartial?.((finalText + interim).trim());
    };
    rec.onerror = () => resolve(finalText.trim());
    rec.onend = () => resolve(finalText.trim());
  });
  stopSpeaking();
  rec.start();
  return { promise, stop: () => rec.stop() };
};
