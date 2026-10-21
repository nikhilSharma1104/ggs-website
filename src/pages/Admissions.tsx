import React from 'react';
import { FiFileText, FiBookOpen, FiHeart, FiCamera, FiHome, FiPhone, FiMail } from 'react-icons/fi';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import AdmissionForm from '../components/AdmissionForm';
import { Mandala } from '../components/art/Illustrations';
import { Reveal, SectionHeading } from '../components/ui';
import { admissionSession, admissionSteps, requiredDocuments, school, telHref } from '../data/site';

const docIcons = [FiFileText, FiBookOpen, FiHeart, FiCamera, FiHome];

const Admissions: React.FC = () => (
  <>
    <SEO title="Admissions" description={`Admissions open for session ${admissionSession()} at Gurukulam Global School, Mathura. Playgroup to Grade 8. Apply online.`} />
    <PageHero
      eyebrow={`Admissions · Session ${admissionSession()}`}
      title={
        <>
          Join our <em className="gold-text">community</em>
        </>
      }
      lede="Begin your journey with Gurukulam Global School."
      crumbs={[{ name: 'Admissions' }]}
    >
      <a href="#apply" className="btn-gold">
        Go to application form
      </a>
    </PageHero>

    {/* Process */}
    <section className="grain bg-ivory py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Admission process" title="Five simple steps" />
        <ol className="relative mt-16 grid gap-6 md:grid-cols-5">
          <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-gold-500/10 via-gold-500/60 to-gold-500/10 md:block" />
          {admissionSteps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="relative text-center">
              <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink-900 font-display text-2xl text-gold-200 shadow-lift ring-4 ring-ivory">
                {i + 1}
              </div>
              <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-ink-700/75">{s.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    {/* Requirements */}
    <section className="bg-ivory-100 py-24 sm:py-28">
      <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          align="left"
          eyebrow="Admission Requirements"
          title="Documents to keep ready"
          lede="Please keep these documents ready for the document verification step."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {requiredDocuments.map((d, i) => {
            const Icon = docIcons[i];
            return (
              <Reveal key={d.name} delay={i * 0.05} className={i === requiredDocuments.length - 1 ? 'sm:col-span-2' : ''}>
                <div className="flex h-full gap-5 rounded-2xl bg-white p-6 ring-1 ring-ink-900/[0.06]">
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-gold-50 text-xl text-gold-700 ring-1 ring-gold-500/20">
                    <Icon />
                  </span>
                  <span>
                    <span className="block font-display text-xl">{d.name}</span>
                    <span className="mt-1 block text-sm text-ink-700/75">{d.description}</span>
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* Application form */}
    <section id="apply" className="relative isolate scroll-mt-24 overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-[40rem] w-[40rem] text-gold-300/[0.07]">
        <Mandala className="h-full w-full animate-spin-slow" />
      </div>
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="text-ivory">
          <SectionHeading align="left" dark eyebrow="Application Form" title="Apply online" lede="Thank you for your interest in joining our school. Submit the form and we will review your application and contact you soon." />
          <Reveal delay={0.2} className="mt-10 space-y-4 text-sm text-ivory/70">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Prefer to talk?</p>
            {school.phones.map((p) => (
              <a key={p} href={telHref(p)} className="flex items-center gap-3 hover:text-gold-200">
                <FiPhone className="text-gold-300" /> {p}
              </a>
            ))}
            <a href={`mailto:${school.email}`} className="flex items-center gap-3 hover:text-gold-200">
              <FiMail className="text-gold-300" /> {school.email}
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-ivory p-7 shadow-lift sm:p-10">
            <AdmissionForm />
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export default Admissions;
