import React, { useRef } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import AdmissionForm from './AdmissionForm';
import { Mandala } from './art/Illustrations';
import { admissionSession, school } from '../data/site';
import { useEscape, useScrollLock } from './ui';

interface AdmissionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Admission enquiry modal. The left panel is built from stacked layers
// (mandala, rings, crest, glow, sparkles) that drift against the pointer.

const SPARKS = [
  [12, 18], [78, 12], [88, 46], [22, 70], [64, 84], [44, 28], [8, 48], [70, 64],
];

const AdmissionPopup: React.FC<AdmissionPopupProps> = ({ isOpen, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  const back = { x: useTransform(sx, (v) => v * -10), y: useTransform(sy, (v) => v * -10) };
  const mid = { x: useTransform(sx, (v) => v * 18), y: useTransform(sy, (v) => v * 18) };
  const front = { x: useTransform(sx, (v) => v * 34), y: useTransform(sy, (v) => v * 34) };
  const tiltX = useTransform(sy, (v) => v * -4);
  const tiltY = useTransform(sx, (v) => v * 4);

  useScrollLock(isOpen);
  useEscape(isOpen, onClose);

  const dragControls = useDragControls();

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = panelRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admission-popup-title"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-md"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            onPointerMove={onMove}
            onPointerLeave={() => {
              mx.set(0);
              my.set(0);
            }}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1600 }}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
            variants={{
              hidden: { opacity: 0, y: 60, scale: 0.96 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
            className="relative grid max-h-[92svh] w-full max-w-5xl overflow-hidden rounded-t-[28px] bg-ivory shadow-lift sm:rounded-[28px] md:grid-cols-[0.9fr_1.1fr]"
          >
            {/* grab handle: drag the sheet down to dismiss on phones */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="absolute inset-x-0 top-0 z-30 flex h-9 touch-none justify-center pt-2.5 sm:hidden"
              aria-hidden="true"
            >
              <span className="h-1.5 w-12 rounded-full bg-ivory/40" />
            </div>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-ink-950/40 text-ivory backdrop-blur transition hover:bg-gold-400 hover:text-ink-950 md:bg-ink-900/5 md:text-ink-900"
              aria-label="Close admission form"
            >
              <FiX size={20} />
            </button>

            {/* Layered art panel */}
            <div className="relative isolate overflow-hidden bg-ink-950 px-6 pb-6 pt-9 text-ivory sm:px-10 sm:pb-8 sm:pt-10 md:py-12">
              <motion.div style={back} className="absolute -left-24 -top-24 -z-10 h-[30rem] w-[30rem] text-gold-300/15">
                <Mandala className="h-full w-full animate-spin-slow" />
              </motion.div>
              <motion.div
                style={mid}
                className="absolute -bottom-32 -right-24 -z-10 h-80 w-80 rounded-full bg-gradient-to-tr from-gold-500/40 via-gold-300/10 to-transparent blur-2xl"
              />
              <motion.div style={mid} className="absolute -bottom-10 -right-10 -z-10 h-64 w-64 rounded-full border border-gold-300/25" />
              <motion.div style={mid} className="absolute -bottom-2 -right-2 -z-10 h-48 w-48 rounded-full border border-gold-300/15" />
              <motion.div style={front} className="pointer-events-none absolute inset-0 -z-10">
                {SPARKS.map(([l, t], i) => (
                  <motion.span
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-gold-200"
                    style={{ left: `${l}%`, top: `${t}%` }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
                    transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.4 }}
                  />
                ))}
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <motion.img style={front} src="/images/logo-128.png" alt="" className="h-14 w-14 drop-shadow-[0_6px_20px_rgba(210,170,72,0.4)]" />
                <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">Session {admissionSession()}</span>
              </motion.div>

              <motion.h2
                id="admission-popup-title"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="mt-6 font-display text-4xl font-medium leading-[1.05] text-ivory sm:text-5xl"
              >
                Admissions <span className="gold-text animate-shimmer italic">now open</span>
              </motion.h2>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="mt-4 text-ivory/70"
              >
                Join our school family. Secure your child&rsquo;s future with quality education at {school.name}.
              </motion.p>

              <motion.ul
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } } }}
                className="mt-7 hidden space-y-3 text-sm text-ivory/80 md:block"
              >
                {['Playgroup to Grade 8', 'NEP 2020–aligned curriculum', 'Foreign Language & AI Programs', '20+ expert teachers'].map((t) => (
                  <motion.li
                    key={t}
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                    className="flex items-center gap-3"
                  >
                    <FiCheckCircle className="flex-none text-gold-300" /> {t}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Form */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ delay: 0.3 }}
              className="overflow-y-auto overscroll-contain px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 sm:px-10 md:py-12"
            >
              <span className="eyebrow">Quick enquiry</span>
              <h3 className="mt-3 font-display text-3xl">Start the admission process</h3>
              <p className="mb-6 mt-2 text-sm text-ink-600/80">Share a few details and our admissions office will get in touch.</p>
              <AdmissionForm compact />
              <button onClick={onClose} className="mt-4 w-full text-center text-sm text-ink-500 underline-offset-4 hover:text-ink-900 hover:underline sm:hidden">
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdmissionPopup;
