import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useScroll,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { FiArrowUp, FiArrowLeft, FiArrowRight, FiCalendar, FiBell } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { notices, school, testimonials, upcomingEvents } from '../../data/site';

/* ------------------------------------------------------------------ */
/* Scroll progress hairline at the very top of the viewport            */
/* ------------------------------------------------------------------ */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[130] h-[2px] origin-left bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500"
    />
  );
};

/* ------------------------------------------------------------------ */
/* Notice ticker                                                       */
/* ------------------------------------------------------------------ */
export const NoticeTicker: React.FC = () => {
  const items = notices();
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((n) => (
        <span key={n} className="flex items-center whitespace-nowrap px-8 text-sm text-ink-900">
          <span className="mr-8 h-1.5 w-1.5 rotate-45 bg-ink-900/40" />
          {n}
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative flex items-stretch overflow-hidden bg-gradient-to-r from-gold-300 via-gold-200 to-gold-300">
      <div className="relative z-10 flex flex-none items-center gap-2 bg-ink-900 px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300 sm:px-6">
        <FiBell className="animate-[float_3s_ease-in-out_infinite]" />
        <span className="hidden sm:inline">Notice Board</span>
        <span className="absolute -right-3 top-0 h-full w-3 bg-ink-900 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
      </div>
      <div className="mask-fade-x flex min-w-0 flex-1 overflow-hidden py-3">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Animated counter                                                    */
/* ------------------------------------------------------------------ */
export const Counter: React.FC<{ to: number; suffix?: string; plain?: boolean; className?: string }> = ({
  to,
  suffix = '',
  plain,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  // Year-like values count up from a nearby number so "2022" doesn't race from 0.
  const from = plain ? to - 22 : 0;
  const [val, setVal] = useState(reduce ? to : from);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(from, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, from, reduce]);

  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Countdown to the next event on the school calendar                  */
/* ------------------------------------------------------------------ */
const pad = (n: number) => String(n).padStart(2, '0');

export const EventCountdown: React.FC<{ className?: string; showUpcoming?: boolean }> = ({ className = '', showUpcoming }) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const list = useMemo(() => upcomingEvents(now), [now]);
  const next = list[0];
  const diff = Math.max(0, next.date.getTime() - now.getTime());
  const parts = [
    { label: 'Days', value: Math.floor(diff / 86400000) },
    { label: 'Hrs', value: Math.floor(diff / 3600000) % 24 },
    { label: 'Min', value: Math.floor(diff / 60000) % 60 },
    { label: 'Sec', value: Math.floor(diff / 1000) % 60 },
  ];

  return (
    <div className={`relative flex flex-col overflow-hidden rounded-3xl bg-ink-900 p-7 text-ivory sm:p-9 ${className}`}>
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">
          <FiCalendar /> Next on campus
        </div>
        <h3 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">{next.title}</h3>
        <p className="mt-2 text-sm text-ivory/60">
          {next.date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <div className="mt-7 grid grid-cols-4 gap-2 sm:gap-3">
          {parts.map((p) => (
            <div key={p.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center">
              <div className="font-display text-3xl tabular-nums text-gold-200 sm:text-4xl">{pad(p.value)}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ivory/50">{p.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-ivory/70">{next.description}</p>
        <Link to="/events" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 transition hover:gap-3">
          See the full calendar <FiArrowRight />
        </Link>
      </div>
      {showUpcoming && (
        <div className="relative mt-auto pt-8">
          <div className="text-[11px] font-semibold uppercase tracking-eyebrow text-ivory/40">Coming up</div>
          <ul className="mt-3 divide-y divide-white/10 border-t border-white/10">
            {list.slice(1, 4).map((e) => (
              <li key={e.title} className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="text-ivory/85">{e.title}</span>
                <span className="flex-none text-gold-300/80">{e.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Testimonial carousel                                                */
/* ------------------------------------------------------------------ */
export const TestimonialCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = (step: number) => {
    setDir(step);
    setIndex((i) => (i + step + count) % count);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index]);

  const t = testimonials[index];
  return (
    <div className="relative mx-auto max-w-4xl text-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="font-display text-[7rem] leading-none text-gold-400/40 sm:text-[9rem]" aria-hidden="true">
        &ldquo;
      </div>
      <div className="relative -mt-10 min-h-[220px] sm:min-h-[200px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="font-display text-2xl italic leading-snug text-ink-900 sm:text-4xl">{t.quote}</blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-ink-900 font-display text-lg text-gold-300">
                {t.name
                  .split(' ')
                  .map((p) => p[0])
                  .join('')}
              </span>
              <span className="text-left">
                <span className="block font-semibold text-ink-900">{t.name}</span>
                <span className="block text-sm text-ink-500">{t.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex items-center justify-center gap-5">
        <button onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-ink-900/15 transition hover:border-gold-500 hover:text-gold-600" aria-label="Previous testimonial">
          <FiArrowLeft />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-gold-500' : 'w-1.5 bg-ink-900/20'}`}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-ink-900/15 transition hover:border-gold-500 hover:text-gold-600" aria-label="Next testimonial">
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Floating actions: WhatsApp, back to top, admissions side tab        */
/* ------------------------------------------------------------------ */
export const FloatingActions: React.FC<{ onAdmissions: () => void }> = ({ onAdmissions }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const wa = `https://wa.me/${school.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    "Hello! I'm interested in knowing more about Gurukulam Global School."
  )}`;

  return (
    <>
      {/* Vertical admissions tab on the right edge (desktop) */}
      <motion.button
        onClick={onAdmissions}
        initial={{ x: 60 }}
        animate={{ x: 0 }}
        transition={{ delay: 3.2, type: 'spring', stiffness: 120, damping: 18 }}
        className="fixed right-0 top-1/2 z-[90] hidden -translate-y-1/2 items-center gap-2 rounded-l-xl bg-ink-900 px-2.5 py-5 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-300 shadow-lift ring-1 ring-gold-400/30 transition hover:bg-ink-800 hover:pr-4 lg:flex [writing-mode:vertical-rl]"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-gold-300" />
        Admissions Open
      </motion.button>

      <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3">
        <AnimatePresence>
          {scrolled && (
            <motion.button
              key="top"
              initial={{ opacity: 0, y: 12, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="grid h-11 w-11 place-items-center rounded-full bg-ivory text-ink-900 shadow-lift ring-1 ring-ink-900/10 transition hover:bg-gold-200"
              aria-label="Back to top"
            >
              <FiArrowUp />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="relative flex items-center">
          <AnimatePresence>
            {hint && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="pointer-events-none absolute right-16 hidden w-max rounded-xl bg-ivory px-4 py-2.5 text-sm text-ink-900 shadow-lift ring-1 ring-ink-900/10 sm:block"
              >
                Chat with us on WhatsApp
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHint(true)}
            onMouseLeave={() => setHint(false)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift"
            aria-label="Chat on WhatsApp"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
            <FaWhatsapp size={28} className="relative" />
          </motion.a>
        </div>
      </div>

      {/* Mobile sticky enquire bar */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ delay: 3, type: 'spring', stiffness: 140, damping: 20 }}
        className="fixed inset-x-0 bottom-0 z-[85] flex gap-2 border-t border-ink-900/10 bg-ivory/90 p-3 pr-24 backdrop-blur-lg lg:hidden"
      >
        <button onClick={onAdmissions} className="btn-gold flex-1 py-2.5">
          Admissions Open
        </button>
        <a href={`tel:${school.phones[1].replace(/\s/g, '')}`} className="btn-outline py-2.5">
          Call
        </a>
      </motion.div>
    </>
  );
};
