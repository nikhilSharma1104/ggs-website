import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import { useAdmission } from '../AdmissionContext';
import { speak } from '../../services/voice';

// "Light the lamp of learning": six stars form a diya constellation. Each tap
// lights a star and reveals a fact about the school; lighting all six kindles
// the lamp and unlocks the admissions call-to-action.

interface Star {
  x: number;
  y: number;
  value: string;
  label: string;
  text: string;
}

const STARS: Star[] = [
  { x: 12, y: 58, value: '2022', label: 'Established', text: 'A young and dynamic institution in Krishna Nagar, Mathura.' },
  { x: 31, y: 78, value: '400+', label: 'Students', text: 'A growing student community since 2022.' },
  { x: 69, y: 78, value: '20+', label: 'Expert teachers', text: 'Highly qualified educators dedicated to excellence.' },
  { x: 88, y: 58, value: '95%', label: 'Success rate', text: 'Exceptional academic achievement.' },
  { x: 50, y: 50, value: '3', label: 'Learning stages', text: 'Foundational, Preparatory and Middle — Nursery to Class 8, aligned with NEP 2020.' },
  { x: 50, y: 20, value: 'AI', label: 'Programming Lab', text: 'Plus a Foreign Language Program and an Innovation Hub.' },
];

// bowl outline + flame stem
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
  [4, 5],
];

const SPARKS = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  return { dx: Math.cos(a) * (18 + (i % 3) * 8), dy: Math.sin(a) * (18 + (i % 3) * 8) };
});

const buzz = (pattern: number | number[]) => {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* not supported */
  }
};

interface LampGameProps {
  /** When set (inside the opening journey), finishing shows a Continue button instead of the CTAs. */
  onComplete?: () => void;
  /** Tighter layout for the full-screen journey on short phone screens */
  compact?: boolean;
  /** Read each fact aloud as it is revealed */
  narrate?: boolean;
}

const LampGame: React.FC<LampGameProps> = ({ onComplete, compact, narrate }) => {
  const reduce = useReducedMotion();
  const { openAdmission } = useAdmission();
  const [lit, setLitState] = useState<number[]>([]);
  // ref mirror so quick successive taps never read a stale list
  const litRef = useRef<number[]>([]);
  const setLit = (v: number[]) => {
    litRef.current = v;
    setLitState(v);
  };
  const last = lit[lit.length - 1];
  const done = lit.length === STARS.length;

  const litEdges = useMemo(() => EDGES.filter(([a, b]) => lit.includes(a) && lit.includes(b)), [lit]);

  const tap = (i: number) => {
    if (litRef.current.includes(i)) return;
    const next = [...litRef.current, i];
    setLit(next);
    buzz(next.length === STARS.length ? [30, 40, 70] : 12);
    if (narrate) {
      const s = STARS[i];
      speak(next.length === STARS.length ? `${s.value} ${s.label}. ${s.text} The lamp is lit. From darkness, lead us to light.` : `${s.value} ${s.label}. ${s.text}`);
    }
  };

  return (
    <div className={`mx-auto grid max-w-5xl items-center lg:grid-cols-2 lg:gap-16 ${compact ? 'gap-4' : 'gap-10'}`}>
      {/* Sky */}
      <div className={`relative mx-auto aspect-square w-full ${compact ? 'max-w-[min(400px,40svh)]' : 'max-w-[420px]'}`}>
        <div className={`absolute inset-[8%] rounded-full blur-3xl transition-all duration-1000 ${done ? 'bg-gold-400/35' : 'bg-gold-400/5'}`} />
        <svg viewBox="0 0 100 100" className="relative h-full w-full overflow-visible" role="group" aria-label="Diya constellation game">
          <defs>
            <radialGradient id="lg-star">
              <stop offset="0" stopColor="#FBF7EC" />
              <stop offset="0.4" stopColor="#ECD89C" stopOpacity="0.9" />
              <stop offset="1" stopColor="#D2AA48" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lg-bowl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ECD89C" />
              <stop offset="1" stopColor="#9A7326" />
            </linearGradient>
            <radialGradient id="lg-flame" cx="0.5" cy="0.7" r="0.6">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="0.35" stopColor="#FBE29A" />
              <stop offset="0.8" stopColor="#E89A2C" />
              <stop offset="1" stopColor="#C2410C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* faint guide so players can see the shape to complete */}
          <g stroke="#ECD89C" strokeOpacity="0.12" strokeWidth="0.4" strokeDasharray="1 1.5">
            {EDGES.map(([a, b]) => (
              <line key={`g${a}${b}`} x1={STARS[a].x} y1={STARS[a].y} x2={STARS[b].x} y2={STARS[b].y} />
            ))}
          </g>

          {/* lit constellation lines */}
          {litEdges.map(([a, b]) => (
            <motion.line
              key={`e${a}${b}`}
              x1={STARS[a].x}
              y1={STARS[a].y}
              x2={STARS[b].x}
              y2={STARS[b].y}
              stroke="#E0C06A"
              strokeWidth="0.7"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}

          {/* the lamp appears once everything is lit */}
          <AnimatePresence>
            {done && (
              <motion.g key="lamp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
                <path d="M12 58 Q 50 54 88 58 Q 82 80 69 78 L 31 78 Q 18 80 12 58 Z" fill="url(#lg-bowl)" opacity="0.9" />
                <path d="M12 58 Q 50 64 88 58" fill="none" stroke="#FBF7EC" strokeOpacity="0.6" strokeWidth="0.6" />
                <motion.path
                  d="M50 52 C 43 44 45 34 50 22 C 55 34 57 44 50 52 Z"
                  fill="url(#lg-flame)"
                  style={{ transformOrigin: '50px 52px' }}
                  animate={reduce ? undefined : { scaleY: [1, 1.12, 0.95, 1.06, 1], scaleX: [1, 0.94, 1.05, 0.97, 1], rotate: [0, -2, 1.5, -1, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                {!reduce &&
                  SPARKS.map((p, i) => (
                    <motion.circle
                      key={i}
                      cx={50}
                      cy={36}
                      r={0.8}
                      fill="#FBE29A"
                      initial={{ opacity: 1, x: 0, y: 0 }}
                      animate={{ opacity: 0, x: p.dx, y: p.dy }}
                      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
                    />
                  ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* stars */}
          {STARS.map((s, i) => {
            const on = lit.includes(i);
            const nextHint = !on && !done && i === STARS.findIndex((_, k) => !lit.includes(k));
            return (
              <g
                key={i}
                onClick={() => tap(i)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && tap(i)}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`${s.value} ${s.label}`}
                className="cursor-pointer outline-none [-webkit-tap-highlight-color:transparent]"
              >
                {/* generous invisible touch target */}
                <circle cx={s.x} cy={s.y} r="8" fill="transparent" />
                <motion.circle
                  cx={s.x}
                  cy={s.y}
                  fill="url(#lg-star)"
                  initial={false}
                  animate={{ r: on ? 7 : 4.5, opacity: on ? 1 : 0.55 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                />
                <motion.path
                  d={`M${s.x} ${s.y - 3} L${s.x + 0.8} ${s.y - 0.8} L${s.x + 3} ${s.y} L${s.x + 0.8} ${s.y + 0.8} L${s.x} ${s.y + 3} L${s.x - 0.8} ${s.y + 0.8} L${s.x - 3} ${s.y} L${s.x - 0.8} ${s.y - 0.8} Z`}
                  fill={on ? '#FFFFFF' : '#ECD89C'}
                  style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                  animate={on ? { scale: 1.25, rotate: 45 } : reduce ? { scale: 1 } : { scale: [1, 1.25, 1], rotate: 0 }}
                  transition={on ? { type: 'spring', stiffness: 200, damping: 12 } : { duration: 2 + (i % 3) * 0.6, repeat: Infinity }}
                />
                {nextHint && lit.length === 0 && !reduce && (
                  <motion.circle
                    cx={s.x}
                    cy={s.y}
                    r={5}
                    fill="none"
                    stroke="#ECD89C"
                    strokeWidth="0.4"
                    animate={{ r: [5, 11], opacity: [0.8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Fact panel */}
      <div className="text-center lg:text-left" aria-live="polite">
        <div className="flex items-center justify-center gap-2 lg:justify-start">
          {STARS.map((_, i) => (
            <span key={i} className={`h-2 w-2 rotate-45 transition-colors duration-500 ${i < lit.length ? 'bg-gold-300' : 'bg-white/15'}`} />
          ))}
          <span className="ml-2 text-xs font-semibold tabular-nums text-ivory/50">
            {lit.length}/{STARS.length}
          </span>
        </div>

        <div className={`relative ${compact ? 'mt-3 min-h-[170px]' : 'mt-6 min-h-[190px]'}`}>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p lang="hi" className="font-devanagari text-lg text-gold-300">तमसो मा ज्योतिर्गमय</p>
                <h3 className={`mt-2 font-display text-ivory ${compact ? 'text-3xl' : 'text-4xl'}`}>From darkness, lead us to light.</h3>
                <p className="mt-3 text-ivory/70">You&rsquo;ve lit the lamp and discovered Gurukulam. Your child&rsquo;s journey can begin here.</p>
                {onComplete ? (
                  <button onClick={onComplete} className="btn-gold mt-6">
                    Continue the journey <FiArrowRight />
                  </button>
                ) : (
                <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <button onClick={openAdmission} className="btn-gold">
                    Apply Now <FiArrowRight />
                  </button>
                  <Link to="/contact" className="btn-ghost text-ivory">
                    Book a visit
                  </Link>
                  <button onClick={() => setLit([])} className="btn text-ivory/60 hover:text-gold-200">
                    <FiRefreshCw /> Play again
                  </button>
                </div>
                )}
              </motion.div>
            ) : last !== undefined ? (
              <motion.div key={last} initial={{ opacity: 0, y: 16, rotateX: -30 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}>
                <div className={`font-display leading-none text-gold-200 ${compact ? 'text-6xl' : 'text-7xl'}`}>{STARS[last].value}</div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-ivory">{STARS[last].label}</div>
                <p className="mx-auto mt-3 max-w-sm text-ivory/65 lg:mx-0">{STARS[last].text}</p>
                <p className="mt-5 text-xs text-gold-300/70">{STARS.length - lit.length} more to light the lamp</p>
              </motion.div>
            ) : (
              <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-lg text-ivory/75">Tap each glowing star to discover Gurukulam.</p>
                <p className="mt-2 text-ivory/50">Light all six to kindle the diya.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LampGame;
