import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { Mandala } from '../components/art/Illustrations';
import { GoldList, Reveal, SectionHeading } from '../components/ui';
import { Counter } from '../components/widgets';
import { coreValues, mission, missionStatement, stats, timeline, vision, visionStatement } from '../data/site';

const About: React.FC = () => {
  const [openValue, setOpenValue] = useState<number | null>(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 70%', 'end 60%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <>
      <SEO />
      <PageHero
        eyebrow="About Gurukulam"
        title={
          <>
            Where tradition meets <em className="gold-text">innovation</em>
          </>
        }
        lede="Welcome to Gurukulam Global School. Our mission is to nurture young minds and help them grow into responsible global citizens."
        crumbs={[{ name: 'About' }]}
      />

      {/* Stats */}
      <section className="relative z-10 -mt-12">
        <div className="container">
          <div className="grid grid-cols-2 overflow-hidden rounded-3xl bg-ivory shadow-lift ring-1 ring-ink-900/5 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`p-7 sm:p-9 ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''} border-ink-900/[0.07]`}>
                <div className="font-display text-4xl text-ink-900 sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} plain={s.plain} />
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">{s.label}</div>
                <p className="mt-2 text-sm text-ink-600/80">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="grain bg-ivory py-24 sm:py-32">
        <div className="container grid gap-8 lg:grid-cols-2">
          {[
            { title: 'Our Vision', statement: visionStatement, points: vision },
            { title: 'Our Mission', statement: missionStatement, points: mission },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1}>
              <div className={`relative h-full overflow-hidden rounded-3xl p-9 sm:p-12 ${i === 0 ? 'bg-ink-900 text-ivory' : 'bg-white ring-1 ring-ink-900/[0.06]'}`}>
                <div className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 ${i === 0 ? 'text-gold-300/10' : 'text-gold-500/10'}`}>
                  <Mandala className="h-full w-full" />
                </div>
                <span className={`eyebrow ${i === 0 ? 'eyebrow-light' : ''}`}>{i === 0 ? 'Where we are going' : 'How we get there'}</span>
                <h2 className={`mt-4 font-display text-4xl sm:text-5xl ${i === 0 ? 'text-ivory' : ''}`}>{b.title}</h2>
                <p className={`mt-5 font-display text-xl italic leading-snug sm:text-2xl ${i === 0 ? 'text-gold-200' : 'text-ink-800'}`}>{b.statement}</p>
                <div className={`my-8 h-px ${i === 0 ? 'bg-white/10' : 'bg-ink-900/10'}`} />
                <GoldList items={b.points} dark={i === 0} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core values accordion */}
      <section className="bg-ivory-100 py-24 sm:py-32">
        <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow="Our Core Values"
            title={
              <>
                Six values that shape <em className="text-gold-600">every day</em>
              </>
            }
            lede="Our core values shape every aspect of education, fostering intellectual curiosity, moral integrity, and global awareness in our students."
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
            {coreValues.map((v, i) => {
              const open = openValue === i;
              return (
                <Reveal key={v.title} delay={i * 0.04}>
                  <button onClick={() => setOpenValue(open ? null : i)} className="group flex w-full items-center gap-6 py-6 text-left" aria-expanded={open}>
                    <span className="font-display text-lg italic text-gold-600">0{i + 1}</span>
                    <span className="flex-1">
                      <span className="block font-display text-3xl transition group-hover:text-gold-700">{v.title}</span>
                      <span className="mt-1 block text-ink-600/80">{v.description}</span>
                    </span>
                    <span className={`grid h-10 w-10 flex-none place-items-center rounded-full border transition ${open ? 'border-gold-500 bg-gold-400 text-ink-950' : 'border-ink-900/15'}`}>
                      {open ? <FiMinus /> : <FiPlus />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 pb-7 pl-12">
                          {v.details.map((d) => (
                            <span key={d} className="rounded-full border border-gold-500/30 bg-gold-50 px-4 py-1.5 text-sm text-ink-800">
                              {d}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative isolate overflow-hidden bg-ink-950 py-24 text-ivory sm:py-32">
        <div className="container">
          <SectionHeading dark eyebrow="Since 2022" title="Our journey of excellence" />
          <div ref={timelineRef} className="relative mx-auto mt-20 max-w-4xl">
            <div className="absolute bottom-0 left-[19px] top-0 w-px bg-white/10 md:left-1/2" />
            <motion.div style={{ scaleY: lineScale }} className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-gold-300 to-gold-500 md:left-1/2" />
            {timeline.map((m, i) => (
              <div key={m.year} className={`relative mb-16 grid gap-6 pl-14 last:mb-0 md:grid-cols-2 md:gap-16 md:pl-0`}>
                <div className="absolute left-[11px] top-3 h-[17px] w-[17px] rotate-45 border border-gold-300 bg-ink-950 md:left-1/2 md:-ml-[8px]">
                  <span className="absolute inset-1 bg-gold-300" />
                </div>
                <Reveal className={`${i % 2 ? 'md:order-2' : 'md:text-right'}`}>
                  <div className="font-display text-6xl text-gold-300 sm:text-7xl">{m.year}</div>
                  <h3 className="mt-2 font-display text-3xl text-ivory">{m.title}</h3>
                </Reveal>
                <Reveal delay={0.1} className={`${i % 2 ? 'md:order-1 md:text-right' : ''}`}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
                    <p className="text-ivory/75">{m.description}</p>
                    <ul className={`mt-5 space-y-2 text-sm text-ivory/60 ${i % 2 ? 'md:ml-auto' : ''}`}>
                      {m.achievements.map((a) => (
                        <li key={a} className={`flex items-center gap-3 ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
                          <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="grain bg-ivory py-24 text-center sm:py-28">
        <div className="container max-w-3xl">
          <Reveal>
            <span className="eyebrow">Join our educational journey</span>
            <p className="mt-6 font-display text-3xl italic leading-snug text-ink-900 sm:text-4xl">
              &ldquo;At Gurukulam, we envision a future where education transcends traditional boundaries.&rdquo;
            </p>
            <p className="mt-6 text-ink-700/75">
              We believe in creating an environment where every child can discover their potential and grow into confident, capable individuals.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default About;
