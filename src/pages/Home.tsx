import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  FiArrowRight,
  FiPlay,
  FiBookOpen,
  FiCalendar,
  FiBriefcase,
  FiFileText,
  FiMapPin,
  FiClock,
  FiFeather,
  FiActivity,
  FiSun,
  FiHome,
  FiUsers,
  FiAward,
  FiMonitor,
  FiHeart,
  FiTrendingUp,
  FiStar,
} from 'react-icons/fi';
import SEO from '../components/SEO';
import CampusScene from '../components/art/CampusScene';
import { Mandala, Ornament, stageArt, programArt } from '../components/art/Illustrations';
import { Reveal, SectionHeading, useMediaQuery, usePointerParallax, VideoModal } from '../components/ui';
import { NoticeTicker, Counter, EventCountdown, TestimonialCarousel } from '../components/widgets';
import { useAdmission } from '../components/AdmissionContext';
import {
  school,
  stats,
  pillars,
  stages,
  specializedPrograms,
  activities,
  campusFeatures,
  highlights,
  communityHighlights,
  academicFeatures,
  notices,
  admissionSession,
} from '../data/site';

/* ------------------------------------------------------------------ */

const Hero: React.FC<{ onTour: () => void }> = ({ onTour }) => {
  const ref = useRef<HTMLElement>(null);
  const pointer = usePointerParallax();
  const wide = useMediaQuery('(min-width: 1024px)');
  const { openAdmission } = useAdmission();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950">
      <CampusScene pointerX={pointer.x} pointerY={pointer.y} scroll={scrollYProgress} buildingOffset={wide ? 330 : 0} className="absolute inset-0 -z-10 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/95 via-ink-950/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink-950/80 to-transparent" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container flex flex-1 items-center pb-44 pt-36 sm:pb-48">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.button
            variants={item}
            onClick={openAdmission}
            className="group inline-flex items-center gap-3 rounded-full border border-gold-300/30 bg-white/5 py-1.5 pl-1.5 pr-4 text-xs text-ivory/85 backdrop-blur-md transition hover:border-gold-300/60"
          >
            <span className="rounded-full bg-gold-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-950">New</span>
            Admissions open for session {admissionSession()}
            <FiArrowRight className="transition group-hover:translate-x-1" />
          </motion.button>

          <motion.p variants={item} className="mt-8 text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-300">
            {school.name} &middot; Mathura
          </motion.p>
          <motion.h1 variants={item} className="mt-5 font-display text-[3.2rem] font-medium leading-[0.95] text-ivory sm:text-7xl lg:text-[6.2rem]">
            Nurturing minds,
            <br />
            <span className="gold-text animate-shimmer italic">shaping futures.</span>
          </motion.h1>
          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-ivory/75 sm:text-xl">
            Building tomorrow&rsquo;s leaders where tradition meets innovation &mdash; a modern Gurukul in the heart of Braj.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <button onClick={openAdmission} className="btn-gold px-7 py-3.5">
              Apply Now <FiArrowRight />
            </button>
            <Link to="/academics" className="btn-ghost px-7 py-3.5 text-ivory">
              Explore Academics
            </Link>
            <button onClick={onTour} className="group ml-1 inline-flex items-center gap-3 text-sm font-semibold text-ivory">
              <span className="relative grid h-12 w-12 place-items-center rounded-full border border-ivory/30 transition group-hover:border-gold-300 group-hover:bg-gold-300 group-hover:text-ink-950">
                <span className="absolute inset-0 animate-ping rounded-full border border-gold-300/40 [animation-duration:2.6s]" />
                <FiPlay className="ml-0.5" />
              </span>
              Virtual Tour
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Pillars rail */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0"
      >
        <div className="container">
          <div className="grid grid-cols-2 border-t border-white/15 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div key={p.title} className={`group py-5 pr-4 sm:py-7 ${i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-6' : ''} ${i % 2 === 1 ? 'border-l border-white/10 pl-4 lg:pl-6' : ''}`}>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm italic text-gold-300">0{i + 1}</span>
                  <h3 className="font-display text-lg text-ivory sm:text-xl">{p.title}</h3>
                </div>
                <p className="mt-1.5 hidden text-sm text-ivory/55 sm:block">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

/* ------------------------------------------------------------------ */

const RotatingSeal: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <defs>
      <path id="seal-circle" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
    </defs>
    <circle cx="100" cy="100" r="98" fill="#0B1A33" />
    <circle cx="100" cy="100" r="92" fill="none" stroke="#D2AA48" strokeOpacity="0.4" />
    <g className="origin-center animate-spin-slow" style={{ transformBox: 'fill-box' }}>
      <text fill="#E0C06A" fontSize="13" letterSpacing="4.6" fontFamily="Manrope, sans-serif" fontWeight="600">
        <textPath href="#seal-circle">GURUKULAM GLOBAL SCHOOL · EST. 2022 · MATHURA ·</textPath>
      </text>
    </g>
    <text x="100" y="96" textAnchor="middle" fill="#FBF7EC" fontSize="34" fontFamily="'Cormorant Garamond', serif" fontStyle="italic">
      Est.
    </text>
    <text x="100" y="128" textAnchor="middle" fill="#E0C06A" fontSize="30" fontFamily="'Cormorant Garamond', serif">
      2022
    </text>
  </svg>
);

const Welcome: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const sealY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section className="grain bg-ivory py-24 sm:py-32">
      <div ref={ref} className="container grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="eyebrow">Welcome to Gurukulam</span>
            <h2 className="display-lg mt-5">
              A Gurukul, reimagined for a <em className="text-gold-600">global</em> century.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-7">
              Welcome to Gurukulam Global School, where tradition meets innovation in education. Our mission is to nurture young minds and help them
              grow into responsible global citizens.
            </p>
            <p className="mt-5 leading-relaxed text-ink-700/75">
              We believe in creating an environment where every child can discover their potential and grow into confident, capable individuals
              &mdash; empowered with knowledge, skills, and values to excel in the global arena while staying rooted in Indian culture and traditions.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 grid gap-4 sm:grid-cols-2">
            {academicFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl border border-ink-900/10 bg-white/60 p-5">
                <h3 className="font-display text-xl">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-700/70">{f.description}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.3}>
            <Link to="/about" className="group mt-10 inline-flex items-center gap-2 font-semibold text-ink-900">
              <span className="border-b border-gold-500 pb-0.5">Our story &amp; values</span>
              <FiArrowRight className="text-gold-600 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div style={{ y: artY }} className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-ink-900 shadow-lift">
            <WelcomeArt />
          </motion.div>
          <motion.div style={{ y: sealY }} className="absolute -bottom-8 -left-6 w-32 drop-shadow-2xl sm:-left-12 sm:w-40">
            <RotatingSeal className="h-full w-full" />
          </motion.div>
          <div className="absolute -right-4 top-16 hidden rounded-2xl bg-ivory/95 p-5 shadow-lift ring-1 ring-ink-900/5 backdrop-blur sm:block">
            <div className="font-display text-4xl text-ink-900">
              <Counter to={400} suffix="+" />
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">Happy students</div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Static, self-contained campus vignette inside the arched frame. */
const WelcomeArt: React.FC = () => {
  const still = usePointerParallax();
  return (
    <>
      <CampusScene pointerX={still.x} pointerY={still.y} className="absolute inset-0 h-full w-full scale-[1.9] origin-[45%_78%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-8 text-center">
        <p className="font-display text-2xl italic text-ivory">&ldquo;Where tradition meets innovation.&rdquo;</p>
      </div>
    </>
  );
};

/* ------------------------------------------------------------------ */

const StatsBand: React.FC = () => (
  <section className="relative isolate overflow-hidden bg-ink-900 py-20">
    <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 text-gold-300/[0.06]">
      <Mandala className="h-full w-full animate-spin-slow" />
    </div>
    <div className="container grid grid-cols-2 gap-y-12 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className={`px-4 text-center ${i > 0 ? 'lg:border-l lg:border-white/10' : ''}`}>
          <div className="font-display text-5xl text-gold-200 sm:text-6xl">
            <Counter to={s.value} suffix={s.suffix} plain={s.plain} />
          </div>
          <div className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-ivory">{s.label}</div>
          <p className="mx-auto mt-2 max-w-[14rem] text-sm text-ivory/50">{s.description}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ------------------------------------------------------------------ */

const StagesSection: React.FC = () => (
  <section className="bg-ivory-100 py-24 sm:py-32">
    <div className="container">
      <SectionHeading
        eyebrow="Academic Excellence"
        title={
          <>
            Three stages, <em className="text-gold-600">one journey</em>
          </>
        }
        lede="Nurturing young minds through innovative teaching methods and a comprehensive curriculum aligned with the National Education Policy 2020."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {stages.map((s, i) => {
          const Art = stageArt[s.key];
          return (
            <Reveal key={s.key} delay={i * 0.1}>
              <Link
                to={s.slug}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-ivory p-8 transition duration-500 hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-lift sm:p-10"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-start justify-between">
                  <span className="font-display text-6xl italic text-ink-900/10">{['I', 'II', 'III'][i]}</span>
                  <Art className="h-24 w-24 text-gold-600 transition duration-700 group-hover:rotate-6 group-hover:scale-110" animate />
                </div>
                <div className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">
                  {s.classes} &middot; {s.ages}
                </div>
                <h3 className="mt-3 font-display text-3xl">{s.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-700/75">{s.summary}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
                  Discover the stage
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-ink-900/15 transition group-hover:border-gold-500 group-hover:bg-gold-400">
                    <FiArrowRight />
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */

const Programs: React.FC = () => (
  <section className="relative isolate overflow-hidden bg-ink-950 py-24 text-ivory sm:py-32">
    <div className="pointer-events-none absolute -left-60 top-20 -z-10 h-[40rem] w-[40rem] rounded-full bg-gold-500/10 blur-[120px]" />
    <div className="container grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <SectionHeading
          align="left"
          dark
          eyebrow="Specialized Programs"
          title={
            <>
              Future-ready <em className="gold-text">education</em>
            </>
          }
          lede="We offer cutting-edge programs to prepare our students for the global stage."
        />
        <Reveal delay={0.2}>
          <Link to="/academics/middle-stage" className="btn-gold mt-10">
            View the Middle Stage <FiArrowRight />
          </Link>
        </Reveal>
      </div>
      <div className="space-y-5">
        {specializedPrograms.map((p, i) => {
          const Art = programArt[p.key];
          return (
            <Reveal key={p.key} delay={i * 0.1}>
              <div className="group grid items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:border-gold-300/40 hover:bg-white/[0.06] sm:grid-cols-[auto_1fr] sm:p-9">
                <div className="grid h-28 w-28 place-items-center rounded-2xl bg-gradient-to-br from-gold-300/15 to-transparent ring-1 ring-gold-300/20">
                  <Art className="h-20 w-20 text-gold-300 transition duration-700 group-hover:scale-110" animate />
                </div>
                <div>
                  <span className="font-display text-sm italic text-gold-300">0{i + 1}</span>
                  <h3 className="mt-1 font-display text-3xl text-ivory">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ivory/65">{p.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */

const AtAGlance: React.FC<{ onTour: () => void }> = ({ onTour }) => {
  const quick = [
    { label: 'Prospectus', note: 'Download the school prospectus', Icon: FiFileText, to: '/prospectus' },
    { label: 'Academic Calendar', note: 'Events & important dates', Icon: FiCalendar, to: '/events' },
    { label: 'Virtual Tour', note: 'Walk the campus online', Icon: FiPlay, action: onTour },
    { label: 'Careers', note: 'Teach at Gurukulam', Icon: FiBriefcase, to: '/careers' },
  ];
  return (
    <section className="grain bg-ivory py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="At a glance" title="Life on campus, this week" />
        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          <Reveal className="lg:row-span-2">
            <EventCountdown className="h-full" showUpcoming />
          </Reveal>

          <Reveal delay={0.1} className="card p-7 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">Notice Board</h3>
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gold-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-gold-500" /> Live
              </span>
            </div>
            <ul className="mt-5 divide-y divide-ink-900/[0.06]">
              {notices().map((n, i) => (
                <li key={n} className="flex items-start gap-4 py-3.5">
                  <span className="mt-0.5 font-display text-sm italic text-gold-600">0{i + 1}</span>
                  <span className="text-ink-800">{n}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="grid grid-cols-2 gap-5 lg:col-span-2">
            {quick.map(({ label, note, Icon, to, action }) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-900 text-gold-300 transition group-hover:bg-gold-400 group-hover:text-ink-950">
                    <Icon />
                  </span>
                  <span className="mt-5 block font-display text-xl text-ink-900">{label}</span>
                  <span className="mt-1 block text-sm text-ink-500">{note}</span>
                </>
              );
              const cls = 'group card block p-6 text-left transition hover:-translate-y-1 hover:shadow-lift';
              return to ? (
                <Link key={label} to={to} className={cls}>
                  {inner}
                </Link>
              ) : (
                <button key={label} onClick={action} className={cls}>
                  {inner}
                </button>
              );
            })}
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-gold-400/30 bg-gold-50 px-7 py-5 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-800">
            <span className="flex items-center gap-2">
              <FiClock className="text-gold-600" /> Campus visits {school.hours}
            </span>
            <span className="flex items-center gap-2">
              <FiMapPin className="text-gold-600" /> {school.address.line1}, Krishna Nagar, Mathura
            </span>
          </div>
          <Link to="/contact" className="text-sm font-semibold text-ink-900 underline decoration-gold-500 underline-offset-4">
            Plan a visit
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */

const lifeTabs = [
  {
    key: 'activities',
    label: 'Our Activities',
    lede: 'Discover the vibrant life at Gurukulam',
    items: activities,
    icons: [FiFeather, FiActivity, FiSun],
  },
  {
    key: 'campus',
    label: 'Campus Features',
    lede: 'State-of-the-art facilities for comprehensive development',
    items: campusFeatures,
    icons: [FiHome, FiUsers, FiAward],
  },
  {
    key: 'values',
    label: 'Core Values',
    lede: 'Building strong foundations',
    items: highlights,
    icons: [FiBookOpen, FiTrendingUp, FiMonitor, FiHeart],
  },
  {
    key: 'community',
    label: 'Community',
    lede: 'A school built in partnership with families',
    items: communityHighlights,
    icons: [FiUsers, FiHeart, FiStar],
  },
];

const LifeTabs: React.FC = () => {
  const [active, setActive] = useState(lifeTabs[0].key);
  const tab = lifeTabs.find((t) => t.key === active)!;
  return (
    <section className="bg-ivory-100 py-24 sm:py-32">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading align="left" eyebrow="Life at Gurukulam" title="Beyond the classroom" />
          <Reveal>
            <div className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:rounded-full sm:bg-white sm:p-1.5 sm:shadow-soft">
              {lifeTabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    active === t.key ? 'text-ivory' : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  {active === t.key && (
                    <motion.span layoutId="life-tab" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <p className="mt-8 text-lg text-ink-700/70">{tab.lede}</p>
            <div className={`mt-8 grid gap-5 sm:grid-cols-2 ${tab.items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
              {tab.items.map((it, i) => {
                const Icon = tab.icons[i % tab.icons.length];
                return (
                  <motion.div
                    key={it.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="group relative overflow-hidden rounded-3xl bg-ivory p-8 ring-1 ring-ink-900/[0.06] transition hover:shadow-lift"
                  >
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-200/40 transition duration-700 group-hover:scale-[2.4]" />
                    <div className="relative">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold-500/30 text-xl text-gold-700">
                        <Icon />
                      </span>
                      <h3 className="mt-6 font-display text-2xl">{it.title}</h3>
                      <p className="mt-2 leading-relaxed text-ink-700/75">{it.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */

const Testimonials: React.FC = () => (
  <section className="grain bg-ivory py-24 sm:py-32">
    <div className="container">
      <Reveal className="text-center">
        <span className="eyebrow">What Parents Say</span>
        <p className="mt-3 text-ink-500">Trusted by families</p>
      </Reveal>
      <div className="mt-6">
        <TestimonialCarousel />
      </div>
    </div>
  </section>
);

const ClosingCTA: React.FC = () => {
  const { openAdmission } = useAdmission();
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-gold-300 via-gold-200 to-gold-400 py-24 sm:py-28">
      <div className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-[38rem] w-[38rem] -translate-y-1/2 text-ink-900/10">
        <Mandala className="h-full w-full animate-spin-slow" />
      </div>
      <div className="container text-center">
        <Reveal>
          <span className="eyebrow !text-ink-800">Admissions {admissionSession()}</span>
          <h2 className="display-lg mx-auto mt-5 max-w-3xl">Begin your journey with us</h2>
          <Ornament className="mx-auto mt-6 h-4 w-32 text-ink-900/40" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-800/80">Join our community of learners and future leaders.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button onClick={openAdmission} className="btn-ink px-8 py-4">
              Apply Now <FiArrowRight />
            </button>
            <Link to="/contact" className="btn border border-ink-900/25 px-8 py-4 text-ink-900 hover:bg-ink-900/5">
              Schedule a Visit
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */

const Home: React.FC = () => {
  const [tour, setTour] = useState(false);
  return (
    <>
      <SEO />
      <Hero onTour={() => setTour(true)} />
      <NoticeTicker />
      <Welcome />
      <StatsBand />
      <StagesSection />
      <Programs />
      <AtAGlance onTour={() => setTour(true)} />
      <LifeTabs />
      <Testimonials />
      <ClosingCTA />
      <VideoModal open={tour} onClose={() => setTour(false)} videoId={school.virtualTourId} />
    </>
  );
};

export default Home;
