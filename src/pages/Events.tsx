import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import CalendarModal from '../components/CalendarModal';
import { Reveal, SectionHeading } from '../components/ui';
import { EventCountdown } from '../components/widgets';
import { eventCategories, upcomingEvents } from '../data/site';

const Events: React.FC = () => {
  const [category, setCategory] = useState<(typeof eventCategories)[number]>('All');
  const [showCalendar, setShowCalendar] = useState(false);
  const all = useMemo(() => upcomingEvents(), []);
  const filtered = all.filter((e) => category === 'All' || e.category === category);

  return (
    <>
      <SEO />
      <PageHero
        eyebrow="School Events"
        title={
          <>
            Moments we <em className="gold-text">celebrate</em>
          </>
        }
        lede="Join us in celebrating learning, creativity, and achievement."
        crumbs={[{ name: 'Events' }]}
      >
        <button onClick={() => setShowCalendar(true)} className="btn-gold">
          <FiCalendar /> View Calendar
        </button>
      </PageHero>

      <section className="grain bg-ivory py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <EventCountdown />
          </div>

          <div>
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {eventCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    category === c ? 'text-ivory' : 'bg-white text-ink-700 ring-1 ring-ink-900/10 hover:ring-gold-500'
                  }`}
                >
                  {category === c && <motion.span layoutId="event-filter" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>

            <motion.ul layout className="mt-8 space-y-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((e) => (
                  <motion.li
                    layout
                    key={e.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    className="group grid grid-cols-[auto_1fr] gap-6 rounded-3xl bg-white p-6 ring-1 ring-ink-900/[0.06] transition hover:shadow-lift sm:p-7"
                  >
                    <div className="w-20 overflow-hidden rounded-2xl text-center ring-1 ring-ink-900/10">
                      <div className="bg-ink-900 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold-300">
                        {e.date.toLocaleDateString('en-IN', { month: 'short' })}
                      </div>
                      <div className="py-2 font-display text-4xl leading-none text-ink-900">
                        {e.day}
                        {e.endDay && <span className="text-lg text-ink-500">&ndash;{e.endDay}</span>}
                      </div>
                      <div className="pb-2 text-[11px] text-ink-500">{e.date.getFullYear()}</div>
                    </div>
                    <div>
                      <span className="rounded-full bg-gold-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-700 ring-1 ring-gold-500/20">
                        {e.category}
                      </span>
                      <h3 className="mt-3 font-display text-2xl transition group-hover:text-gold-700 sm:text-3xl">{e.title}</h3>
                      <p className="mt-2 leading-relaxed text-ink-700/75">{e.description}</p>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </div>
      </section>

      <section className="bg-ink-950 py-20 text-center">
        <div className="container">
          <SectionHeading dark eyebrow="Academic Calendar" title="Never miss a date" lede="Stay updated with all our upcoming events and important dates." />
          <Reveal delay={0.2}>
            <button onClick={() => setShowCalendar(true)} className="btn-gold mt-10">
              <FiCalendar /> Open the calendar
            </button>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>{showCalendar && <CalendarModal isOpen={showCalendar} onClose={() => setShowCalendar(false)} />}</AnimatePresence>
    </>
  );
};

export default Events;
