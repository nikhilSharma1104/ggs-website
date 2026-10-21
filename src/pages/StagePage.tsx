import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { stageArt } from '../components/art/Illustrations';
import { GoldList, Reveal } from '../components/ui';
import { useAdmission } from '../components/AdmissionContext';
import { StageKey, stages } from '../data/site';

/** Shared layout for the Foundational, Preparatory and Middle stage pages. */
const StagePage: React.FC<{ stageKey: StageKey }> = ({ stageKey }) => {
  const { openAdmission } = useAdmission();
  const index = stages.findIndex((s) => s.key === stageKey);
  const stage = stages[index];
  const prev = stages[index - 1];
  const next = stages[index + 1];
  const Art = stageArt[stage.key];

  return (
    <>
      <SEO />
      <PageHero
        eyebrow={`${stage.classes} · ${stage.ages}`}
        title={stage.title}
        lede={stage.tagline}
        crumbs={[{ name: 'Academics', href: '/academics' }, { name: stage.title }]}
      >
        <button onClick={openAdmission} className="btn-gold">
          Apply for {stage.classes}
        </button>
      </PageHero>

      <section className="grain bg-ivory py-24 sm:py-28">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <span className="eyebrow">{stage.intro.heading}</span>
            <div className="mt-6 space-y-5">
              {stage.intro.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? 'font-display text-2xl leading-snug text-ink-900 sm:text-3xl' : 'lede'}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-9 text-ivory">
              <Art className="absolute -right-8 -top-8 h-44 w-44 text-gold-300/25" animate />
              <h2 className="relative font-display text-3xl text-ivory">{stage.approach.heading}</h2>
              <div className="relative mt-6">
                <GoldList items={stage.approach.points} dark />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {stage.groups.map((g, gi) => (
        <section key={g.heading} className={`${gi % 2 === 0 ? 'bg-ivory-100' : 'grain bg-ivory'} py-20 sm:py-24`}>
          <div className="container">
            <Reveal className="flex items-end justify-between gap-6 border-b border-ink-900/10 pb-6">
              <h2 className="display-md">{g.heading}</h2>
              <span className="hidden font-display text-5xl italic text-ink-900/10 sm:block">0{gi + 1}</span>
            </Reveal>
            <div className={`mt-10 grid gap-5 sm:grid-cols-2 ${g.columns.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
              {g.columns.map((c, ci) => (
                <Reveal key={c.title} delay={ci * 0.06}>
                  <div className="group h-full rounded-3xl bg-white p-7 ring-1 ring-ink-900/[0.06] transition hover:-translate-y-1 hover:shadow-lift">
                    <div className="h-0.5 w-10 bg-gold-500 transition-all duration-500 group-hover:w-20" />
                    <h3 className="mt-5 font-display text-2xl">{c.title}</h3>
                    <GoldList items={c.items} className="mt-5 text-[15px]" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Prev / next stage */}
      <section className="bg-ink-950">
        <div className="container grid divide-white/10 sm:grid-cols-2 sm:divide-x">
          {[prev, next].map((s, i) =>
            s ? (
              <Link
                key={s.key}
                to={s.slug}
                className={`group flex items-center gap-5 py-10 ${i === 1 ? 'justify-end text-right sm:pl-10' : 'sm:pr-10'}`}
              >
                {i === 0 && <FiArrowLeft className="text-2xl text-gold-300 transition group-hover:-translate-x-1" />}
                <span>
                  <span className="block text-xs uppercase tracking-[0.2em] text-ivory/50">{i === 0 ? 'Previous stage' : 'Next stage'}</span>
                  <span className="mt-1 block font-display text-3xl text-ivory transition group-hover:text-gold-200">{s.title}</span>
                </span>
                {i === 1 && <FiArrowRight className="text-2xl text-gold-300 transition group-hover:translate-x-1" />}
              </Link>
            ) : (
              <Link
                key={`all-${i}`}
                to="/academics"
                className={`group flex items-center gap-5 py-10 text-ivory/70 hover:text-gold-200 ${i === 1 ? 'justify-end sm:pl-10' : 'sm:pr-10'}`}
              >
                <span className="font-display text-2xl">All academic stages</span>
              </Link>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default StagePage;
