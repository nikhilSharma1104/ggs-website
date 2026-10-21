import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiChevronsRight } from 'react-icons/fi';
import CampusScene from '../art/CampusScene';
import { facilityArt, stageArt } from '../art/Illustrations';
import { coreValues, facilities, specializedPrograms, stages } from '../../data/site';
import { speak } from '../../services/voice';

export interface ChapterProps {
  onComplete: () => void;
  narrate: boolean;
}

const ContinueButton: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = 'Continue the journey' }) => (
  <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={onClick} className="btn-gold">
    {label} <FiArrowRight />
  </motion.button>
);

/* ------------------------------------------------------------------ */
/* Chapter 2: grow the Gurukul tree, one stage per tap                 */
/* ------------------------------------------------------------------ */

// canopy blobs appear as the tree grows: [cx, cy, r, growth level needed]
const CANOPY: [number, number, number, number][] = [
  [100, 92, 22, 1],
  [80, 100, 16, 2],
  [120, 100, 16, 2],
  [100, 70, 22, 2],
  [62, 92, 18, 3],
  [138, 92, 18, 3],
  [82, 62, 18, 3],
  [118, 62, 18, 3],
  [100, 48, 18, 3],
];
const ROOTS = [70, 82, 118, 130];
const FRUITS: [number, number][] = [[70, 88], [128, 84], [96, 58], [112, 104], [86, 76]];

export const TreeChapter: React.FC<ChapterProps> = ({ onComplete, narrate }) => {
  const [growth, setGrowth] = useState(0);
  const growthRef = useRef(0);
  const reduce = useReducedMotion();
  const trunkH = [14, 46, 70, 86][growth];
  const stage = growth > 0 ? stages[growth - 1] : null;
  const Art = stage ? stageArt[stage.key] : null;

  const grow = () => {
    if (growthRef.current >= 3) return;
    const next = growthRef.current + 1;
    growthRef.current = next;
    setGrowth(next);
    const s = stages[next - 1];
    if (narrate) speak(`${s.title}. ${s.classes.replace('–', 'to')}, ${s.ages.replace('–', ' to ')}. ${s.summary}`);
    try {
      navigator.vibrate?.(next === 3 ? [20, 30, 50] : 12);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-4xl items-center gap-4 lg:grid-cols-2 lg:gap-12">
      <button onClick={grow} className="relative mx-auto aspect-square w-full max-w-[min(380px,38svh)] [-webkit-tap-highlight-color:transparent]" aria-label="Help the tree grow">
        <div className={`absolute inset-[12%] rounded-full blur-3xl transition-all duration-700 ${growth === 3 ? 'bg-gold-400/30' : 'bg-gold-400/10'}`} />
        <svg viewBox="0 0 200 200" className="relative h-full w-full overflow-visible">
          <ellipse cx="100" cy="170" rx="70" ry="8" fill="#122445" />
          <path d="M40 170 Q100 160 160 170" stroke="#BA9032" strokeOpacity="0.5" fill="none" />
          {/* trunk */}
          <motion.rect
            x={growth >= 2 ? 92 : 97}
            width={growth >= 2 ? 16 : 6}
            rx="3"
            fill="#5B431B"
            initial={false}
            animate={{ y: 170 - trunkH, height: trunkH }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
          />
          {/* sprout leaves */}
          {growth === 0 && (
            <g fill="#ECD89C">
              <path d="M100 158 C 88 156 84 148 86 142 C 96 144 100 150 100 158 Z" />
              <path d="M100 156 C 112 154 116 146 114 140 C 104 142 100 148 100 156 Z" />
            </g>
          )}
          {/* aerial roots of the banyan */}
          {growth === 3 &&
            ROOTS.map((x, i) => (
              <motion.line key={x} x1={x} x2={x} y1={96} stroke="#795920" strokeWidth="1.5" initial={{ y2: 96 }} animate={{ y2: 168 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }} />
            ))}
          {CANOPY.map(([cx, cy, r, need], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy + (3 - Math.max(growth, need)) * 8}
              fill={i % 2 ? '#1A3057' : '#22385F'}
              stroke="#D2AA48"
              strokeOpacity="0.55"
              initial={false}
              animate={{ r: growth >= need ? r : 0 }}
              transition={{ type: 'spring', stiffness: 140, damping: 12, delay: (i % 4) * 0.05 }}
            />
          ))}
          {growth === 3 &&
            FRUITS.map(([x, y], i) => (
              <motion.circle key={i} cx={x} cy={y} r={2.6} fill="#FBE29A" initial={{ scale: 0 }} animate={{ scale: reduce ? 1 : [0, 1.4, 1] }} transition={{ delay: 0.6 + i * 0.1 }} />
            ))}
        </svg>
        {growth < 3 && (
          <motion.span
            className="absolute bottom-[6%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-300 px-4 py-1.5 text-xs font-bold text-ink-950 shadow-glow"
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            Tap to grow &middot; {growth}/3
          </motion.span>
        )}
      </button>

      <div className="min-h-[200px] text-center lg:text-left" aria-live="polite">
        <AnimatePresence mode="wait">
          {stage && Art ? (
            <motion.div key={stage.key} initial={{ opacity: 0, y: 14, rotateX: -25 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <Art className="h-12 w-12 text-gold-300" />
                <span className="text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">
                  Stage {growth}
                  <br />
                  {stage.classes} &middot; {stage.ages}
                </span>
              </div>
              <h3 className="mt-3 font-display text-4xl text-ivory">{stage.title}</h3>
              <p className="mx-auto mt-2 max-w-sm text-ivory/70 lg:mx-0">{stage.summary}</p>
              {growth === 3 && (
                <div className="mt-5">
                  <p className="mb-4 text-sm text-gold-200/80">From Nursery to Class 8, one rooted, growing journey &mdash; aligned with NEP 2020.</p>
                  <ContinueButton onClick={onComplete} />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-lg text-ivory/75">
              Every great tree starts as a seed. Tap the sapling to watch a Gurukulam student grow through our three stages.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Chapter 3: slide to swing open the campus gates (3D)                */
/* ------------------------------------------------------------------ */

const Gate: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <svg viewBox="0 0 100 160" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
    <rect x="0" y="0" width="100" height="160" fill="#0B1A33" />
    <path
      d={side === 'left' ? 'M0 30 Q 60 0 100 6' : 'M0 6 Q 40 0 100 30'}
      stroke="#D2AA48"
      strokeWidth="2.5"
      fill="none"
    />
    {[14, 30, 46, 62, 78, 94].map((x) => (
      <line key={x} x1={side === 'left' ? x : 100 - x} x2={side === 'left' ? x : 100 - x} y1="22" y2="156" stroke="#BA9032" strokeWidth="2" />
    ))}
    <rect x="0" y="80" width="100" height="3" fill="#BA9032" />
    <rect x="0" y="150" width="100" height="4" fill="#BA9032" />
    <circle cx={side === 'left' ? 92 : 8} cy="96" r="4" fill="#ECD89C" />
  </svg>
);

export const GatesChapter: React.FC<ChapterProps> = ({ onComplete, narrate }) => {
  const knobX = useMotionValue(0);
  const [trackW, setTrackW] = useState(240);
  const [open, setOpen] = useState(false);
  const progress = useTransform(knobX, [0, trackW], [0, 1]);
  const leftRot = useTransform(progress, (p) => -p * 105);
  const rightRot = useTransform(progress, (p) => p * 105);
  const zero = useMotionValue(0);

  const finish = () => {
    setOpen(true);
    animate(knobX, trackW, { type: 'spring', stiffness: 200, damping: 24 });
    if (narrate) speak(`Welcome to our campus. ${facilities.map((f) => f.title).join(', ')}. Plus our ${specializedPrograms.map((p) => p.title).join(', ')}.`);
    try {
      navigator.vibrate?.([20, 30, 50]);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-12">
        <div className="relative mx-auto aspect-[5/4] w-full max-w-[min(420px,52svh)] overflow-hidden rounded-t-[999px] rounded-b-2xl ring-1 ring-gold-400/40" style={{ perspective: 900 }}>
          <CampusScene pointerX={zero} pointerY={zero} compact className="absolute inset-0 h-full w-full scale-[1.6] origin-[50%_80%]" />
          <motion.div style={{ rotateY: leftRot, transformOrigin: '0% 50%' }} className="absolute inset-y-0 left-0 w-1/2">
            <Gate side="left" />
          </motion.div>
          <motion.div style={{ rotateY: rightRot, transformOrigin: '100% 50%' }} className="absolute inset-y-0 right-0 w-1/2">
            <Gate side="right" />
          </motion.div>
        </div>

        <div className="text-center lg:text-left" aria-live="polite">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="campus" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="font-display text-3xl text-ivory sm:text-4xl">Welcome to our campus</h3>
                <div className="mt-4 grid grid-cols-2 gap-2 text-left">
                  {facilities.map((f, i) => {
                    const Art = facilityArt[f.key];
                    return (
                      <motion.div
                        key={f.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-2.5"
                      >
                        <Art className="h-8 w-8 flex-none text-gold-300" />
                        <span className="text-[13px] font-semibold leading-tight text-ivory">{f.title}</span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5 lg:justify-start">
                  {specializedPrograms.map((p) => (
                    <span key={p.key} className="rounded-full bg-gold-300/15 px-3 py-1 text-xs text-gold-200 ring-1 ring-gold-300/30">
                      {p.title}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <ContinueButton onClick={onComplete} />
                </div>
              </motion.div>
            ) : (
              <motion.div key="slide" exit={{ opacity: 0 }}>
                <p className="text-lg text-ivory/75">Our gates are open. Slide to step inside the campus.</p>
                <div
                  ref={(el) => el && setTrackW(el.clientWidth - 56)}
                  className="relative mx-auto mt-6 h-14 w-full max-w-[300px] rounded-full bg-white/[0.06] ring-1 ring-gold-300/30 lg:mx-0"
                >
                  <span className="pointer-events-none absolute inset-0 grid place-items-center pl-10 text-sm font-semibold text-gold-200/70">
                    <span className="animate-shimmer bg-[linear-gradient(90deg,rgba(236,216,156,.35),#FBF7EC,rgba(236,216,156,.35))] bg-[length:200%_auto] bg-clip-text text-transparent">
                      Slide to open the gates
                    </span>
                  </span>
                  <motion.button
                    drag="x"
                    dragConstraints={{ left: 0, right: trackW }}
                    dragElastic={0}
                    dragMomentum={false}
                    style={{ x: knobX }}
                    onDragEnd={() => (knobX.get() > trackW * 0.7 ? finish() : animate(knobX, 0, { type: 'spring', stiffness: 300, damping: 26 }))}
                    onClick={() => knobX.get() < 4 && finish()}
                    className="absolute left-1 top-1 grid h-12 w-12 touch-none place-items-center rounded-full bg-gradient-to-b from-gold-200 to-gold-500 text-ink-950 shadow-glow"
                    aria-label="Open the gates"
                  >
                    <FiChevronsRight size={22} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Chapter 4: flip the six value cards                                 */
/* ------------------------------------------------------------------ */

export const ValuesChapter: React.FC<ChapterProps> = ({ onComplete, narrate }) => {
  const [flipped, setFlipped] = useState<number[]>([]);
  const flippedRef = useRef<number[]>([]);
  const all = flipped.length === coreValues.length;

  const flip = (i: number) => {
    if (flippedRef.current.includes(i)) return;
    flippedRef.current = [...flippedRef.current, i];
    setFlipped(flippedRef.current);
    if (narrate) speak(`${coreValues[i].title}. ${coreValues[i].description}.`);
    try {
      navigator.vibrate?.(10);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl text-center">
      <p className="text-ivory/75">Six values shape every day at Gurukulam. Tap each card to turn it over.</p>
      <div className="mx-auto mt-5 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
        {coreValues.map((v, i) => {
          const on = flipped.includes(i);
          return (
            <button key={v.title} onClick={() => flip(i)} className="h-[min(118px,13svh)] [perspective:900px] sm:h-32" aria-pressed={on} aria-label={on ? `${v.title}: ${v.description}` : 'Reveal a value'}>
              <motion.div className="relative h-full w-full [transform-style:preserve-3d]" animate={{ rotateY: on ? 180 : 0 }} transition={{ type: 'spring', stiffness: 140, damping: 15 }}>
                <div className="absolute inset-0 grid place-items-center rounded-2xl bg-gradient-to-br from-ink-800 to-ink-900 ring-1 ring-gold-300/30 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                  <span className="font-display text-4xl italic text-gold-300/60">{i + 1}</span>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-gold-200 to-gold-400 p-2 text-ink-950 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <span className="font-display text-xl font-semibold leading-tight">{v.title}</span>
                  <span className="mt-1 line-clamp-2 text-[11px] leading-snug text-ink-900/75">{v.description}</span>
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>
      <div className="mt-6 min-h-[48px]">{all ? <ContinueButton onClick={onComplete} label="See your welcome" /> : <span className="text-xs text-ivory/50">{flipped.length}/6 discovered</span>}</div>
    </div>
  );
};
