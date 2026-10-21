import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Mandala } from './art/Illustrations';
import { school } from '../data/site';

// First-visit intro: crest and rings draw in, then three layered panels
// (navy, gold, ivory) sweep upward in sequence to reveal the site.
// Shown once per browser session; clicking anywhere skips it.

const SESSION_KEY = 'ggs-intro-seen';

const seenThisSession = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
};

const IntroCurtain: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => !seenThisSession());

  useEffect(() => {
    if (!show) {
      onDone();
      return;
    }
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setShow(false), reduce ? 600 : 2600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] cursor-pointer"
          onClick={() => setShow(false)}
          aria-hidden="true"
        >
          {/* back layers: revealed as the front layer lifts, then they lift too */}
          <motion.div className="absolute inset-0 bg-ivory-200" exit={{ y: '-100%' }} transition={{ duration: 0.9, ease, delay: 0.3 }} />
          <motion.div className="absolute inset-0 bg-gold-400" exit={{ y: '-100%' }} transition={{ duration: 0.9, ease, delay: 0.15 }} />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-ink-950"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease }}
          >
            <motion.div
              className="absolute h-[44rem] w-[44rem] text-gold-300/15"
              initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 2.4, ease: 'easeOut' }}
            >
              <Mandala className="h-full w-full" />
            </motion.div>
            <motion.div
              className="absolute h-[26rem] w-[26rem] rounded-full border border-gold-300/20"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
            />

            <motion.img
              src="/images/logo-256.png"
              alt=""
              className="relative h-28 w-28 drop-shadow-[0_10px_40px_rgba(210,170,72,0.45)] sm:h-36 sm:w-36"
              initial={{ scale: 0.7, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="relative mt-8 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.h1
                className="font-display text-3xl font-medium text-ivory sm:text-5xl"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {school.name}
              </motion.h1>
            </motion.div>
            <motion.div
              className="relative mt-4 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              transition={{ duration: 1, delay: 0.9, ease: 'easeInOut' }}
            />
            <motion.p
              className="relative mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-300"
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ duration: 1.2, delay: 1.1 }}
            >
              {school.tagline}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroCurtain;
