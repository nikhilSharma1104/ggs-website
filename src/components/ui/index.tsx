import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import YouTube from 'react-youtube';
import { FiX } from 'react-icons/fi';
import { Ornament } from '../art/Illustrations';

/** Fade/slide content in once it enters the viewport. */
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}> = ({ children, delay = 0, y = 24, className, as = 'div' }) => {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
};

export const SectionHeading: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}> = ({ eyebrow, title, lede, align = 'center', dark, className = '' }) => (
  <Reveal className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
    <span className={`eyebrow ${dark ? 'eyebrow-light' : ''}`}>{eyebrow}</span>
    <h2 className={`display-lg mt-4 ${dark ? 'text-ivory' : ''}`}>{title}</h2>
    {align === 'center' && <Ornament className={`mx-auto mt-5 h-4 w-32 ${dark ? 'text-gold-300/70' : 'text-gold-500/70'}`} />}
    {lede && <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-ivory/70' : 'text-ink-700/75'}`}>{lede}</p>}
  </Reveal>
);

/**
 * Normalised pointer position (-1..1) relative to the window, spring-smoothed.
 * Touch devices simply stay at 0 so layers rest in place.
 */
/* Device tilt ------------------------------------------------------- */
// iOS 13+ only delivers deviceorientation after a permission prompt that must
// be triggered by a tap; Android and others deliver it straight away.

export type TiltPermission = 'prompt' | 'granted' | 'denied' | 'unsupported';

const initialTilt = (): TiltPermission => {
  if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) return 'unsupported';
  const DOE = (window as any).DeviceOrientationEvent;
  return typeof DOE.requestPermission === 'function' ? 'prompt' : 'granted';
};

let tiltPermission: TiltPermission = initialTilt();
const tiltListeners = new Set<() => void>();

export const requestTilt = async () => {
  const DOE = (window as any).DeviceOrientationEvent;
  if (!DOE?.requestPermission) return;
  try {
    tiltPermission = (await DOE.requestPermission()) === 'granted' ? 'granted' : 'denied';
  } catch {
    tiltPermission = 'denied';
  }
  tiltListeners.forEach((l) => l());
};

export const useTiltPermission = () => {
  const [state, setState] = useState(tiltPermission);
  useEffect(() => {
    const l = () => setState(tiltPermission);
    tiltListeners.add(l);
    return () => {
      tiltListeners.delete(l);
    };
  }, []);
  return state;
};

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

/**
 * Normalised (-1..1), spring-smoothed motion input for parallax layers:
 * mouse position on desktop, phone tilt on mobile, and finger position as a
 * fallback when no gyroscope data arrives.
 */
export const usePointerParallax = () => {
  const reduce = useReducedMotion();
  const permission = useTiltPermission();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    let lastOrientation = 0;
    let baseBeta: number | null = null;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      lastOrientation = Date.now();
      // calibrate to however the phone is being held when we start
      if (baseBeta === null) baseBeta = e.beta;
      const landscape = Math.abs((window.screen.orientation?.angle ?? 0) % 180) === 90;
      const gx = landscape ? e.beta - baseBeta : e.gamma;
      const gy = landscape ? e.gamma : e.beta - baseBeta;
      rawX.set(clamp(gx / 22));
      rawY.set(clamp(gy / 22));
    };
    const onTouch = (e: TouchEvent) => {
      if (Date.now() - lastOrientation < 1000 || !e.touches[0]) return;
      rawX.set(clamp((e.touches[0].clientX / window.innerWidth) * 2 - 1));
      rawY.set(clamp((e.touches[0].clientY / window.innerHeight) * 2 - 1));
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    if (permission === 'granted') window.addEventListener('deviceorientation', onOrient);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('deviceorientation', onOrient);
    };
  }, [rawX, rawY, reduce, permission]);

  return { x, y };
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

/** Lock body scroll while a modal is open. */
export const useScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
};

export const useEscape = (active: boolean, onEscape: () => void) => {
  const cb = useRef(onEscape);
  cb.current = onEscape;
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && cb.current();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);
};

export const VideoModal: React.FC<{ open: boolean; onClose: () => void; videoId: string }> = ({ open, onClose, videoId }) => {
  useScrollLock(open);
  useEscape(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Virtual campus tour"
        >
          <motion.div
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-lift ring-1 ring-gold-300/30"
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <YouTube
              videoId={videoId}
              opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1, start: 7, rel: 0 } }}
              className="h-full w-full"
              iframeClassName="h-full w-full"
            />
            <button
              onClick={onClose}
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink-950/70 text-ivory backdrop-blur transition hover:bg-gold-400 hover:text-ink-950"
              aria-label="Close video"
            >
              <FiX size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/** Small gold check-mark bullet list. */
export const GoldList: React.FC<{ items: string[]; dark?: boolean; className?: string }> = ({ items, dark, className = '' }) => (
  <ul className={`space-y-3 ${className}`}>
    {items.map((item) => (
      <li key={item} className={`flex gap-3 ${dark ? 'text-ivory/80' : 'text-ink-700/85'}`}>
        <span className="mt-[9px] h-1.5 w-1.5 flex-none rotate-45 bg-gold-500" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
