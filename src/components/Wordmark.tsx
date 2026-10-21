import React from 'react';
import { motion, MotionValue, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';

// The school's name set as a piece of gold lettering: a swash italic "G",
// gold-foil letters that flip in one by one, a stack of darker layers behind
// that reads as 3D depth (and shifts with mouse / phone tilt), a calligraphic
// flourish, and the name in Devanagari above.

const NAME = 'Gurukulam';
const LETTERS = NAME.split('');
const DEPTH = 7;

const FOIL = 'linear-gradient(100deg, #E0C06A 0%, #FBF7EC 18%, #D2AA48 36%, #F5EBCC 52%, #BA9032 70%, #ECD89C 86%, #D2AA48 100%)';

/** Each letter carries its slice of one shared gradient so the foil flows across the word. */
const foilFor = (i: number) => ({
  backgroundImage: FOIL,
  backgroundSize: `${LETTERS.length * 100}% 100%`,
  backgroundPosition: `${(i / (LETTERS.length - 1)) * 100}% 0`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
});

const Letters: React.FC<{ animate?: boolean; className?: string; style?: React.CSSProperties; foil?: boolean; delay?: number }> = ({
  animate,
  className = '',
  style,
  foil,
  delay = 0,
}) => (
  <span className={`inline-flex items-baseline ${className}`} style={style} aria-hidden="true">
    {LETTERS.map((ch, i) => (
      <motion.span
        key={i}
        className={`inline-block ${i === 0 ? 'mr-[0.02em] text-[1.28em] leading-none' : ''}`}
        style={{ ...(foil ? foilFor(i) : {}), transformOrigin: '50% 100%', paddingRight: '0.04em', marginRight: '-0.04em' }}
        initial={animate ? { rotateX: -95, opacity: 0, y: '0.2em' } : false}
        animate={{ rotateX: 0, opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        {ch}
      </motion.span>
    ))}
  </span>
);

const Flourish: React.FC<{ className?: string; animate?: boolean; delay?: number }> = ({ className, animate, delay = 0 }) => {
  const draw = animate
    ? { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 1.4, delay, ease: 'easeInOut' as const } }
    : {};
  return (
    <svg viewBox="0 0 400 28" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round">
      <motion.path d="M6 16 C 60 6 120 24 186 14" strokeWidth="1.4" {...draw} />
      <motion.path d="M394 16 C 340 6 280 24 214 14" strokeWidth="1.4" {...draw} />
      <motion.path d="M200 4 L208 14 L200 24 L192 14 Z" strokeWidth="1.2" {...draw} />
      <motion.circle cx="200" cy="14" r="2" fill="currentColor" stroke="none" initial={animate ? { scale: 0 } : false} animate={{ scale: 1 }} transition={{ delay: delay + 1 }} />
    </svg>
  );
};

interface Props {
  variant: 'hero' | 'intro' | 'nav' | 'footer';
  /** Mouse / tilt input, -1..1; drives the 3D depth layers */
  tiltX?: MotionValue<number>;
  tiltY?: MotionValue<number>;
  /** Light text for dark backgrounds (nav switches when the bar turns ivory) */
  tone?: 'light' | 'dark';
  as?: 'h1' | 'div';
  className?: string;
  delay?: number;
  align?: 'left' | 'center';
}

const Wordmark: React.FC<Props> = ({ variant, tiltX, tiltY, tone = 'light', as = 'div', className = '', delay = 0, align = 'left' }) => {
  const reduce = useReducedMotion();
  const zero = useMotionValue(0);
  const tx = tiltX ?? zero;
  const ty = tiltY ?? zero;
  // Base extrusion goes down-right; tilting swings the light source.
  const stepX = useTransform(tx, (v) => 0.7 - v * 1.1);
  const stepY = useTransform(ty, (v) => 0.9 - v * 1.1);
  const faceRotY = useTransform(tx, (v) => v * 10);
  const faceRotX = useTransform(ty, (v) => v * -8);

  const Tag = as;

  if (variant === 'nav') {
    return (
      <span className={`block leading-none ${className}`}>
        <span className="block font-display text-[1.65rem] font-semibold italic sm:text-[1.85rem]">
          <Letters foil={tone === 'light'} className={tone === 'dark' ? 'text-ink-900' : ''} />
        </span>
        <span className={`mt-1 block text-[9px] font-bold uppercase tracking-[0.42em] ${tone === 'light' ? 'text-gold-300' : 'text-gold-700'}`}>
          Global School
        </span>
      </span>
    );
  }

  const big = variant === 'hero' || variant === 'intro';
  const size = big ? 'text-[clamp(4.1rem,20vw,9.5rem)]' : 'text-6xl';
  const animate = big && !reduce;

  return (
    <Tag className={`relative inline-block ${align === 'center' ? 'text-center' : 'text-left'} ${className}`} aria-label={`${NAME} Global School`} style={{ perspective: 900 }}>
      <motion.span
        lang="hi"
        className="block font-devanagari text-[clamp(1rem,3.8vw,1.4rem)] tracking-normal text-gold-300/90"
        initial={animate ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.1, duration: 0.8 }}
        aria-hidden="true"
      >
        गुरुकुलम्
      </motion.span>

      <motion.span
        className={`relative block font-display font-semibold italic leading-[0.92] ${size}`}
        style={{ rotateX: faceRotX, rotateY: faceRotY, transformStyle: 'preserve-3d' }}
      >
        {/* depth layers, darkest at the back */}
        {Array.from({ length: DEPTH }).map((_, k) => {
          const i = DEPTH - k;
          return (
            <DepthLayer key={i} index={i} stepX={stepX} stepY={stepY} delay={delay} animate={animate} />
          );
        })}
        <Letters foil animate={animate} delay={delay} className="relative drop-shadow-[0_2px_18px_rgba(210,170,72,0.35)]" />
      </motion.span>

      <Flourish className={`mt-1 h-5 w-[86%] text-gold-300/80 ${big ? '' : 'h-4'} ${align === 'center' ? 'mx-auto' : ''}`} animate={animate} delay={delay + 0.6} />
      <motion.span
        className="mt-2 block font-sans text-[clamp(0.62rem,2.6vw,0.85rem)] font-bold not-italic uppercase tracking-[0.55em] text-ivory/85"
        initial={animate ? { opacity: 0, letterSpacing: '0.2em' } : false}
        animate={{ opacity: 1, letterSpacing: '0.55em' }}
        transition={{ delay: delay + 0.8, duration: 1.2 }}
      >
        Global School
      </motion.span>
    </Tag>
  );
};

const DepthLayer: React.FC<{ index: number; stepX: MotionValue<number>; stepY: MotionValue<number>; delay: number; animate: boolean }> = ({
  index,
  stepX,
  stepY,
  delay,
  animate,
}) => {
  const x = useTransform(stepX, (v) => v * index);
  const y = useTransform(stepY, (v) => v * index);
  // back layers fade toward the deep navy so the edge reads as bevelled gold
  const shade = index === 1 ? '#9A7326' : index < 4 ? '#795920' : '#3E2E14';
  return (
    <motion.span
      className="absolute left-0 top-0"
      style={{ x, y, color: shade }}
      initial={animate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.7, duration: 0.6 }}
      aria-hidden="true"
    >
      <Letters />
    </motion.span>
  );
};

export default Wordmark;
