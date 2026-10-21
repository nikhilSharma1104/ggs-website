import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { stageArt } from '../art/Illustrations';
import { usePointerParallax } from '../ui';
import { stages } from '../../data/site';

// 3D coverflow of the three academic stages. Swipe / drag / arrow keys move
// between cards; the front card also tilts with the mouse or phone gyroscope
// and carries a moving glare.

const TiltFace: React.FC<{ active: boolean; px: MotionValue<number>; py: MotionValue<number>; children: React.ReactNode }> = ({ active, px, py, children }) => {
  const rotY = useTransform(px, (v) => v * 12);
  const rotX = useTransform(py, (v) => v * -10);
  const glareX = useTransform(px, (v) => `${50 + v * 40}%`);
  const glareY = useTransform(py, (v) => `${50 + v * 40}%`);
  const glare = useTransform([glareX, glareY] as MotionValue[], ([x, y]: string[]) =>
    `radial-gradient(circle at ${x} ${y}, rgba(255,247,220,0.35), transparent 55%)`
  );
  return (
    <motion.div style={active ? { rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' } : { rotateX: 0, rotateY: 0 }} className="relative h-full">
      {children}
      {active && <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 rounded-[28px] mix-blend-soft-light" />}
    </motion.div>
  );
};

const StageCoverflow: React.FC = () => {
  const [index, setIndex] = useState(0);
  const panned = useRef(false);
  const pointer = usePointerParallax();
  const go = (i: number) => setIndex(Math.max(0, Math.min(stages.length - 1, i)));

  return (
    <div
      className="relative select-none"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        if (e.key === 'ArrowLeft') go(index - 1);
      }}
      aria-roledescription="carousel"
      aria-label="Academic stages"
    >
      <motion.div
        className="relative mx-auto h-[470px] w-full touch-pan-y sm:h-[500px]"
        style={{ perspective: 1400 }}
        onPanStart={() => {
          panned.current = true;
        }}
        onPanEnd={(_, info) => {
          if (info.offset.x < -40 || info.velocity.x < -400) go(index + 1);
          else if (info.offset.x > 40 || info.velocity.x > 400) go(index - 1);
          // let the click that follows a swipe be ignored
          setTimeout(() => (panned.current = false), 50);
        }}
      >
        {stages.map((s, i) => {
          const off = i - index;
          const abs = Math.abs(off);
          const Art = stageArt[s.key];
          const active = off === 0;
          return (
            <motion.div
              key={s.key}
              className="absolute left-1/2 top-0 h-full w-[80%] max-w-[360px]"
              style={{ zIndex: 10 - abs, transformStyle: 'preserve-3d' }}
              initial={false}
              animate={{
                x: `calc(-50% + ${off * 62}%)`,
                rotateY: off * -38,
                z: -abs * 160,
                scale: 1 - abs * 0.08,
                opacity: abs > 1 ? 0 : 1 - abs * 0.3,
              }}
              transition={{ type: 'spring', stiffness: 170, damping: 24 }}
            >
              <TiltFace active={active} px={pointer.x} py={pointer.y}>
                <Link
                  to={s.slug}
                  draggable={false}
                  onClick={(e) => {
                    if (panned.current || !active) {
                      e.preventDefault();
                      if (!panned.current) go(i);
                    }
                  }}
                  aria-current={active}
                  className={`flex h-full flex-col overflow-hidden rounded-[28px] p-7 shadow-lift ring-1 transition-colors sm:p-9 ${
                    active ? 'bg-ink-900 text-ivory ring-gold-300/30' : 'bg-ivory text-ink-900 ring-ink-900/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`font-display text-6xl italic ${active ? 'text-gold-300/30' : 'text-ink-900/10'}`}>{['I', 'II', 'III'][i]}</span>
                    <Art className={`h-24 w-24 ${active ? 'text-gold-300' : 'text-gold-600'}`} animate />
                  </div>
                  <div className={`mt-auto text-[11px] font-semibold uppercase tracking-[0.2em] ${active ? 'text-gold-300' : 'text-gold-700'}`}>
                    {s.classes} &middot; {s.ages}
                  </div>
                  <h3 className={`mt-3 font-display text-[2.1rem] leading-tight ${active ? 'text-ivory' : ''}`}>{s.title}</h3>
                  <p className={`mt-3 leading-relaxed ${active ? 'text-ivory/70' : 'text-ink-700/75'}`}>{s.summary}</p>
                  <span className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold ${active ? 'text-gold-200' : 'text-ink-900'}`}>
                    Discover the stage <FiArrowRight />
                  </span>
                </Link>
              </TiltFace>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button onClick={() => go(index - 1)} disabled={index === 0} className="grid h-12 w-12 place-items-center rounded-full border border-ink-900/15 transition hover:border-gold-500 disabled:opacity-30" aria-label="Previous stage">
          <FiArrowLeft />
        </button>
        <div className="flex gap-2">
          {stages.map((s, i) => (
            <button key={s.key} onClick={() => go(i)} aria-label={s.title} className="grid h-8 place-items-center px-1">
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-gold-500' : 'w-1.5 bg-ink-900/25'}`} />
            </button>
          ))}
        </div>
        <button onClick={() => go(index + 1)} disabled={index === stages.length - 1} className="grid h-12 w-12 place-items-center rounded-full border border-ink-900/15 transition hover:border-gold-500 disabled:opacity-30" aria-label="Next stage">
          <FiArrowRight />
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-ink-500 lg:hidden">Swipe to explore the stages</p>
    </div>
  );
};

export default StageCoverflow;
