import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { FiX, FiMic, FiSend, FiVolume2, FiVolumeX, FiSquare } from 'react-icons/fi';
import { askAssistant, ChatMessage } from '../../services/assistant';
import { canListen, canSpeak, listenOnce, speak, stopSpeaking, VoiceLang } from '../../services/voice';
import { suggestedQuestions } from '../../data/knowledge';
import { useEscape, useMediaQuery } from '../ui';

// Voice-first AI guide. Visitors can type or tap the mic; answers are read
// aloud (English or Hindi). Bottom sheet on phones, floating panel on desktop.

type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking';

const GREETING: ChatMessage = {
  role: 'assistant',
  content: 'Namaste! I am Gurukulam AI. Ask me anything about the school: admissions, classes, campus, timings. Tap the mic to talk to me.',
};

const Orb: React.FC<{ state: OrbState; size?: number }> = ({ state, size = 56 }) => {
  const active = state !== 'idle';
  return (
    <div className="relative grid flex-none place-items-center" style={{ width: size, height: size }} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-gold-300/50"
          animate={active ? { scale: [1, 1.5 + i * 0.25], opacity: [0.6, 0] } : { scale: 1, opacity: 0 }}
          transition={{ duration: state === 'listening' ? 1.1 : 1.8, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
      <motion.span
        className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#ECD89C,#BA9032,#FBF7EC,#D2AA48,#ECD89C)]"
        animate={{ rotate: 360, scale: state === 'speaking' ? [1, 1.08, 0.96, 1.05, 1] : state === 'thinking' ? [1, 0.92, 1] : 1 }}
        transition={{ rotate: { duration: state === 'thinking' ? 1.2 : 6, repeat: Infinity, ease: 'linear' }, scale: { duration: 0.8, repeat: Infinity } }}
      />
      <span className="absolute inset-[18%] rounded-full bg-ink-950/85 backdrop-blur-sm" />
      <span className="relative font-display text-lg italic text-gold-200" style={{ fontSize: size * 0.34 }}>
        G
      </span>
    </div>
  );
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const AssistantPanel: React.FC<Props> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [state, setState] = useState<OrbState>('idle');
  const [lang, setLang] = useState<VoiceLang>('en-IN');
  const [voiceOn, setVoiceOn] = useState(true);
  const [partial, setPartial] = useState('');
  const stopRef = useRef<(() => void) | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const mobile = !useMediaQuery('(min-width: 640px)');
  const dragControls = useDragControls();
  useEscape(open, onClose);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, partial, state]);

  useEffect(() => {
    if (!open) {
      stopSpeaking();
      stopRef.current?.();
      setState('idle');
    }
  }, [open]);

  const ask = async (q: string) => {
    const question = q.trim();
    if (!question || state === 'thinking') return;
    const history = messages.filter((m) => m !== GREETING);
    setMessages((m) => [...m, { role: 'user', content: question }]);
    setInput('');
    setState('thinking');
    const { answer } = await askAssistant(question, history);
    setMessages((m) => [...m, { role: 'assistant', content: answer }]);
    if (voiceOn && canSpeak()) {
      setState('speaking');
      speak(answer, lang, () => setState('idle'));
    } else {
      setState('idle');
    }
  };

  const toggleMic = async () => {
    if (state === 'listening') {
      stopRef.current?.();
      return;
    }
    stopSpeaking();
    setState('listening');
    setPartial('');
    const { promise, stop } = listenOnce(lang, setPartial);
    stopRef.current = stop;
    const text = await promise;
    stopRef.current = null;
    setPartial('');
    if (text) ask(text);
    else setState('idle');
  };

  const statusText = { idle: 'Ask me anything about Gurukulam', listening: 'Listening…', thinking: 'Thinking…', speaking: 'Speaking…' }[state];

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[160] flex items-end justify-center sm:inset-auto sm:bottom-6 sm:left-6 sm:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm sm:hidden" onClick={onClose} />
          <motion.section
            role="dialog"
            aria-label="Gurukulam AI assistant"
            drag={mobile ? 'y' : false}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={(_, info) => (info.offset.y > 120 || info.velocity.y > 600) && onClose()}
            initial={{ y: mobile ? '100%' : 30, opacity: mobile ? 1 : 0, scale: mobile ? 1 : 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: mobile ? '100%' : 30, opacity: mobile ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="relative flex h-[86svh] w-full flex-col overflow-hidden rounded-t-[28px] bg-ivory shadow-lift sm:h-[620px] sm:max-h-[calc(100vh-3rem)] sm:w-[400px] sm:rounded-[28px] sm:ring-1 sm:ring-ink-900/10"
          >
            {/* header */}
            <div className="relative bg-ink-950 px-5 pb-5 pt-3 text-ivory">
              <div onPointerDown={(e) => dragControls.start(e)} className="mx-auto mb-2 h-1.5 w-12 touch-none rounded-full bg-ivory/30 sm:hidden" />
              <div className="flex items-center gap-4">
                <Orb state={state} />
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-2xl text-ivory">Gurukulam AI</h2>
                  <p className="truncate text-xs text-gold-200/80" aria-live="polite">
                    {statusText}
                  </p>
                </div>
                <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-gold-300 hover:text-ink-950" aria-label="Close assistant">
                  <FiX />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <div className="flex rounded-full bg-white/10 p-0.5" role="group" aria-label="Voice language">
                  {(['en-IN', 'hi-IN'] as VoiceLang[]).map((l) => (
                    <button key={l} onClick={() => setLang(l)} className={`rounded-full px-3 py-1 font-semibold transition ${lang === l ? 'bg-gold-300 text-ink-950' : 'text-ivory/70'}`} aria-pressed={lang === l}>
                      {l === 'en-IN' ? 'English' : 'हिन्दी'}
                    </button>
                  ))}
                </div>
                {canSpeak() && (
                  <button
                    onClick={() => {
                      if (voiceOn) stopSpeaking();
                      setVoiceOn((v) => !v);
                    }}
                    className="ml-auto flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-semibold text-ivory/80"
                    aria-pressed={voiceOn}
                  >
                    {voiceOn ? <FiVolume2 /> : <FiVolumeX />} {voiceOn ? 'Voice on' : 'Voice off'}
                  </button>
                )}
              </div>
            </div>

            {/* messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                    m.role === 'user' ? 'ml-auto rounded-br-md bg-ink-900 text-ivory' : 'rounded-bl-md bg-white text-ink-900 ring-1 ring-ink-900/[0.06]'
                  }`}
                >
                  {m.content}
                  {m.role === 'assistant' && canSpeak() && i > 0 && (
                    <button onClick={() => { setState('speaking'); speak(m.content, lang, () => setState('idle')); }} className="mt-2 flex items-center gap-1 text-xs font-semibold text-gold-700" aria-label="Read this answer aloud">
                      <FiVolume2 /> Listen
                    </button>
                  )}
                </motion.div>
              ))}
              {state === 'listening' && partial && <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-ink-900/60 px-4 py-3 text-[15px] italic text-ivory">{partial}</div>}
              {state === 'thinking' && (
                <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-4 ring-1 ring-ink-900/[0.06]" aria-label="Thinking">
                  {[0, 1, 2].map((d) => (
                    <motion.span key={d} className="h-2 w-2 rounded-full bg-gold-500" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }} />
                  ))}
                </div>
              )}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestedQuestions.map((q) => (
                    <button key={q} onClick={() => ask(q)} className="rounded-full border border-gold-500/30 bg-gold-50 px-3 py-1.5 text-left text-[13px] text-ink-800 transition hover:border-gold-500">
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t border-ink-900/10 bg-ivory px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3"
            >
              {canListen() && (
                <motion.button
                  type="button"
                  onClick={toggleMic}
                  whileTap={{ scale: 0.9 }}
                  className={`grid h-12 w-12 flex-none place-items-center rounded-full transition ${state === 'listening' ? 'bg-maroon text-ivory' : 'bg-gradient-to-b from-gold-200 to-gold-500 text-ink-950 shadow-glow'}`}
                  aria-label={state === 'listening' ? 'Stop listening' : 'Ask by voice'}
                >
                  {state === 'listening' ? <FiSquare /> : <FiMic size={20} />}
                </motion.button>
              )}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'hi-IN' ? 'अपना सवाल लिखें…' : 'Type your question…'}
                className="field flex-1 rounded-full py-3"
                enterKeyHint="send"
                aria-label="Your question"
              />
              <button type="submit" disabled={!input.trim() || state === 'thinking'} className="grid h-12 w-12 flex-none place-items-center rounded-full bg-ink-900 text-ivory transition disabled:opacity-40" aria-label="Send">
                <FiSend />
              </button>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Orb };
export default AssistantPanel;
