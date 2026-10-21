import React from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { Reveal } from '../components/ui';
import { school, stages } from '../data/site';

// Set REACT_APP_PROSPECTUS_DRIVE_ID to the Google Drive file id of the PDF to embed it.
const fileId = process.env.REACT_APP_PROSPECTUS_DRIVE_ID;

const Prospectus: React.FC = () => {
  const request = `https://wa.me/${school.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello! Please share the Gurukulam Global School prospectus.')}`;
  return (
    <>
      <SEO />
      <PageHero
        eyebrow="School Prospectus"
        title={
          <>
            The Gurukulam <em className="gold-text">experience</em>
          </>
        }
        lede="Discover the Gurukulam experience through our comprehensive school prospectus."
        crumbs={[{ name: 'Prospectus' }]}
      />

      <section className="grain bg-ivory py-24">
        <div className="container">
          {fileId ? (
            <Reveal>
              <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-ink-900/5">
                <div className="relative" style={{ paddingTop: '141.42%' }}>
                  <iframe src={`https://drive.google.com/file/d/${fileId}/preview`} className="absolute inset-0 h-full w-full" title="School prospectus" allow="autoplay" />
                </div>
              </div>
              <div className="mt-10 text-center">
                <a href={`https://drive.google.com/file/d/${fileId}/view`} target="_blank" rel="noopener noreferrer" className="btn-gold px-8 py-4">
                  <FiDownload /> Download Prospectus
                </a>
              </div>
            </Reveal>
          ) : (
            <div className="grid items-center gap-14 lg:grid-cols-2">
              {/* Book mock-up */}
              <Reveal>
                <div className="relative mx-auto aspect-[3/4] w-full max-w-sm [perspective:1600px]">
                  <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-r-2xl bg-ink-800" />
                  <div className="relative flex h-full flex-col items-center justify-between rounded-r-2xl border-l-[10px] border-gold-600 bg-ink-900 p-10 text-center shadow-lift transition duration-700 [transform:rotateY(-14deg)] hover:[transform:rotateY(0deg)]">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-300">Prospectus</span>
                    <div>
                      <img src="/images/logo-256.png" alt="" className="mx-auto h-32 w-32" />
                      <h2 className="mt-6 font-display text-3xl text-ivory">{school.name}</h2>
                      <div className="mx-auto mt-4 h-px w-20 bg-gold-400/60" />
                      <p className="mt-4 font-display italic text-gold-200">{school.tagline}</p>
                    </div>
                    <span className="text-xs text-ivory/50">Mathura &middot; Est. {school.established}</span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="eyebrow">What&rsquo;s inside</span>
                <h2 className="display-md mt-4">Everything a family needs to know</h2>
                <ul className="mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10">
                  {['Our vision, mission & core values', ...stages.map((s) => `${s.title} — ${s.classes}`), 'Specialized programs & campus facilities', 'Admission process & documents'].map((t, i) => (
                    <li key={t} className="flex items-center gap-4 py-3.5 text-ink-800">
                      <span className="font-display text-sm italic text-gold-600">0{i + 1}</span>
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href={request} target="_blank" rel="noopener noreferrer" className="btn-gold">
                    <FaWhatsapp /> Request on WhatsApp
                  </a>
                  <a href={`mailto:${school.email}?subject=${encodeURIComponent('Prospectus request')}`} className="btn-outline">
                    <FiMail /> Email the office
                  </a>
                </div>
                <p className="mt-6 text-sm text-ink-600">
                  Having trouble? Contact us at <a href={`mailto:${school.email}`} className="font-semibold text-ink-900 underline decoration-gold-500 underline-offset-4">{school.email}</a>
                </p>
                <Link to="/admissions" className="group mt-8 inline-flex items-center gap-2 font-semibold text-ink-900">
                  Ready to apply? <FiArrowRight className="text-gold-600 transition group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Prospectus;
