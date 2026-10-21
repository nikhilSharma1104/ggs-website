import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiX, FiVolume2, FiVolumeX, FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import LampGame from '../widgets/LampGame';
import Wordmark from '../Wordmark';
import { Mandala } from '../art/Illustrations';
import { TreeChapter, GatesChapter, ValuesChapter } from './Chapters';
import { canSpeak, speak, stopSpeaking } from '../../services/voice';
import { admissionSession, school, visionStatement } from '../../data/site';
import { useScrollLock } from '../ui';

// "The Gurukul Journey": the full-screen opening game. Four short chapters
// introduce the school (facts, stages, campus, values) and end on a welcome
// screen with the admissions call-to-action. Skippable at any point.

const CHAPTERS = [
  { title: 'Light the lamp of learning', intro: 'Gurukulam at a glance' },
  { title: 'Grow the Gurukul tree', intro: 'Our three learning stages' },
  { title: 'Open the gates', intro: 'Life on campus' },
  { title: 'Discover our values', intro: 'What we stand for' },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  onAsk: () => void;
}

const JourneyGame: React.FC<Props> = ({ open, onClose, onApply, onAsk }) => {
  const [chapter, setChapter] = useState(0);
  const [narrate, setNarrate] = useState(false);
  const reduce = useReducedMotion();
  useScrollLock(open);

  useEffect(() => {
    if (open) setChapter(0);
    else stopSpeaking();
  }, [open]);

  useEffect(() => {
    if (!open || !narrate) return;
    if (chapter < CHAPTERS.length) speak(`Chapter ${chapter + 1}. ${CHAPTERS[chapter].title}.`);
    else speak(`Welcome to ${school.name}. ${visionStatement} Admissions are open for session ${admissionSession().replace('–', ' to ')}.`);
  }, [chapter, narrate, open]);

  const next = () => setChapter((c) => c + 1);
  const finished = chapter >= CHAPTERS.length;

  const close = () => {
    stopSpeaking();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="journey"
          className="fixed inset-0 z-[180] flex flex-col overflow-hidden bg-ink-950 text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5 }}
          role="dialog"
          aria-modal="true"
          aria-label="The Gurukul Journey: an introduction to the school"
        >
          {/* backdrop */}
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(1px_1px_at_15%_20%,#FBF7EC,transparent),radial-gradient(1px_1px_at_80%_12%,#FBF7EC,transparent),radial-gradient(1.5px_1.5px_at_45%_80%,#ECD89C,transparent),radial-gradient(1px_1px_at_90%_70%,#FBF7EC,transparent),radial-gradient(1px_1px_at_8%_75%,#FBF7EC,transparent)]" />
          <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] text-gold-300/[0.07]">
            <Mandala className="h-full w-full animate-spin-slow" />
          </div>

          {/* top bar */}
          <div className="relative z-10 flex items-center gap-3 px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-6">
            <img src="/images/logo-128.png" alt="" className="h-9 w-9" />
            <div className="flex flex-1 gap-1.5">
              {CHAPTERS.map((c, i) => (
                <div key={c.title} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full bg-gradient-to-r from-gold-400 to-gold-200" initial={false} animate={{ width: i < chapter ? '100%' : i === chapter ? '35%' : '0%' }} />
                </div>
              ))}
            </div>
            {canSpeak() && (
              <button
                onClick={() => {
                  if (narrate) stopSpeaking();
                  setNarrate((n) => !n);
                }}
                className={`grid h-10 w-10 place-items-center rounded-full transition ${narrate ? 'bg-gold-300 text-ink-950' : 'bg-white/10 text-ivory/80'}`}
                aria-label={narrate ? 'Turn voice narration off' : 'Turn voice narration on'}
                aria-pressed={narrate}
              >
                {narrate ? <FiVolume2 /> : <FiVolumeX />}
              </button>
            )}
            <button onClick={close} className="flex h-10 items-center gap-1.5 rounded-full bg-white/10 px-4 text-sm font-semibold text-ivory/85 transition hover:bg-white/20">
              Skip <FiX />
            </button>
          </div>

          {/* chapter body */}
          <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8" style={{ perspective: 1400 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter}
                className="m-auto flex w-full flex-col items-center py-4"
                initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: 35, x: 80 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, rotateY: -35, x: -80 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {!finished ? (
                  <>
                    <div className="mb-4 text-center sm:mb-8">
                      <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">
                        Chapter {chapter + 1} of {CHAPTERS.length} &middot; {CHAPTERS[chapter].intro}
                      </span>
                      <h2 className="mt-2 font-display text-[2rem] leading-tight text-ivory sm:text-5xl">{CHAPTERS[chapter].title}</h2>
                    </div>
                    {chapter === 0 && <LampGame compact onComplete={next} narrate={narrate} />}
                    {chapter === 1 && <TreeChapter onComplete={next} narrate={narrate} />}
                    {chapter === 2 && <GatesChapter onComplete={next} narrate={narrate} />}
                    {chapter === 3 && <ValuesChapter onComplete={next} narrate={narrate} />}
                  </>
                ) : (
                  <Finale onApply={onApply} onClose={close} onAsk={onAsk} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Finale: React.FC<{ onApply: () => void; onClose: () => void; onAsk: () => void }> = ({ onApply, onClose, onAsk }) => (
  <div className="flex max-w-2xl flex-col items-center text-center">
    <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">Journey complete</span>
    <Wordmark variant="hero" align="center" className="mt-4 scale-[0.8] sm:scale-100" />
    <p className="mt-2 font-display text-xl italic leading-snug text-gold-100 sm:text-2xl">&ldquo;{visionStatement}&rdquo;</p>
    <div className="mt-6 grid w-full max-w-md grid-cols-3 gap-2 text-center">
      {[
        ['400+', 'Students'],
        ['20+', 'Teachers'],
        ['95%', 'Success'],
      ].map(([v, l]) => (
        <div key={l} className="rounded-2xl border border-white/10 bg-white/[0.04] py-3">
          <div className="font-display text-3xl text-gold-200">{v}</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-ivory/55">{l}</div>
        </div>
      ))}
    </div>
    <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
      <button
        onClick={() => {
          onClose();
          onApply();
        }}
        className="btn-gold py-3.5"
      >
        Apply for {admissionSession()} <FiArrowRight />
      </button>
      <Link to="/contact" onClick={onClose} className="btn-ghost py-3.5 text-ivory">
        Book a campus visit
      </Link>
    </div>
    <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
      <button
        onClick={() => {
          onClose();
          onAsk();
        }}
        className="inline-flex items-center gap-2 font-semibold text-gold-200"
      >
        <FiMessageCircle /> Ask our AI guide
      </button>
      <button onClick={onClose} className="font-semibold text-ivory/70 underline-offset-4 hover:underline">
        Enter the website &rarr;
      </button>
    </div>
  </div>
);

export default JourneyGame;
