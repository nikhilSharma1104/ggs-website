import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { stageArt, programArt } from '../components/art/Illustrations';
import { Reveal, SectionHeading } from '../components/ui';
import { academicFeatures, specializedPrograms, stages } from '../data/site';

const Academics: React.FC = () => (
  <>
    <SEO title="Academics" description="Foundational, Preparatory and Middle stages at Gurukulam Global School, Mathura: NEP 2020-aligned learning from Nursery to Class 8." />
    <PageHero
      eyebrow="Academic Excellence"
      title={
        <>
          Learning that grows <em className="gold-text">with your child</em>
        </>
      }
      lede="Nurturing young minds through innovative teaching methods and comprehensive curriculum."
      crumbs={[{ name: 'Academics' }]}
    />

    {/* Stage pathway */}
    <section className="grain bg-ivory py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="The NEP 2020 pathway" title="Three stages, one journey" />
        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-[60px] hidden h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent lg:block" />
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {stages.map((s, i) => {
              const Art = stageArt[s.key];
              return (
                <Reveal key={s.key} delay={i * 0.12}>
                  <Link to={s.slug} className="group block text-center">
                    <div className="relative mx-auto grid h-[120px] w-[120px] place-items-center rounded-full bg-ivory ring-1 ring-gold-500/40 transition duration-500 group-hover:bg-ink-900 group-hover:ring-gold-300">
                      <Art className="h-20 w-20 text-gold-600 transition group-hover:text-gold-300" animate />
                    </div>
                    <div className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">
                      Stage {i + 1} &middot; {s.ages}
                    </div>
                    <h3 className="mt-3 font-display text-4xl transition group-hover:text-gold-700">{s.title}</h3>
                    <p className="mt-1 font-medium text-ink-600">{s.classes}</p>
                    <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink-700/75">{s.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
                      <span className="border-b border-gold-500 pb-0.5">Explore</span>
                      <FiArrowRight className="text-gold-600 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="bg-ivory-100 py-24 sm:py-28">
      <div className="container">
        <SectionHeading eyebrow="Our Academic Features" title="What makes our programme unique" lede="Discover what makes our academic program unique and effective." />
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {academicFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl bg-white p-10 ring-1 ring-ink-900/[0.06]">
                <span className="font-display text-5xl italic text-gold-500/60">0{i + 1}</span>
                <h3 className="mt-4 font-display text-3xl">{f.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-ink-700/75">{f.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Programs */}
    <section className="bg-ink-950 py-24 text-ivory sm:py-28">
      <div className="container">
        <SectionHeading dark eyebrow="Specialized Programs" title="Future-ready education" lede="We offer cutting-edge programs to prepare our students for the global stage." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {specializedPrograms.map((p, i) => {
            const Art = programArt[p.key];
            return (
              <Reveal key={p.key} delay={i * 0.1}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-9 transition hover:border-gold-300/40">
                  <Art className="h-20 w-20 text-gold-300" animate />
                  <h3 className="mt-6 font-display text-3xl text-ivory">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ivory/65">{p.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  </>
);

export default Academics;
