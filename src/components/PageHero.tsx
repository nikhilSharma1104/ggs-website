import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import CampusScene from './art/CampusScene';
import { Mandala } from './art/Illustrations';
import { usePointerParallax } from './ui';

interface Crumb {
  name: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}

/** Banner for inner pages: the campus scene in compact form with drifting layers. */
const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, lede, crumbs = [], children }) => {
  const ref = useRef<HTMLElement>(null);
  const pointer = usePointerParallax();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const ringX = useTransform(pointer.x, (v) => v * 24);
  const ringY = useTransform(pointer.y, (v) => v * 24);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink-950 pb-20 pt-40 sm:pb-28 sm:pt-48">
      <CampusScene
        pointerX={pointer.x}
        pointerY={pointer.y}
        scroll={scrollYProgress}
        compact
        className="absolute inset-0 -z-10 h-full w-full opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/20" />
      <motion.div style={{ x: ringX, y: ringY }} className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] text-gold-300/15">
        <Mandala className="h-full w-full animate-spin-slow" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="container">
        {crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ivory/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/" className="transition hover:text-gold-300">Home</Link>
            {crumbs.map((c) => (
              <React.Fragment key={c.name}>
                <FiChevronRight className="opacity-60" />
                {c.href ? (
                  <Link to={c.href} className="transition hover:text-gold-300">{c.name}</Link>
                ) : (
                  <span className="text-gold-300">{c.name}</span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        )}
        <motion.span
          className="eyebrow eyebrow-light"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          className="display-xl mt-5 max-w-4xl text-ivory"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        {lede && (
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {lede}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }} className="mt-9">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default PageHero;
