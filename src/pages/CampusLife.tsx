import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import CampusScene from '../components/art/CampusScene';
import { facilityArt } from '../components/art/Illustrations';
import { GoldList, Reveal, SectionHeading, usePointerParallax, VideoModal } from '../components/ui';
import { activities, facilities, school } from '../data/site';
import { photos } from '../data/photos';

const TourBanner: React.FC<{ onPlay: () => void }> = ({ onPlay }) => {
  const ref = useRef<HTMLElement>(null);
  const pointer = usePointerParallax();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const sceneScroll = useTransform(scrollYProgress, [0, 1], [-0.3, 0.5]);
  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink-950 py-32 text-center sm:py-44">
      <CampusScene pointerX={pointer.x} pointerY={pointer.y} scroll={sceneScroll} className="absolute inset-0 -z-10 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-ink-950/50" />
      <div className="container">
        <Reveal>
          <span className="eyebrow eyebrow-light">Take a Virtual Tour</span>
          <h2 className="display-lg mx-auto mt-5 max-w-2xl text-ivory">Walk our campus from anywhere</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ivory/70">Experience our campus facilities firsthand through our interactive virtual tour.</p>
          <motion.button
            onClick={onPlay}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="relative mx-auto mt-10 grid h-24 w-24 place-items-center rounded-full bg-gold-300 text-2xl text-ink-950 shadow-glow"
            aria-label="Start virtual tour"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-gold-300/40 [animation-duration:2.4s]" />
            <FiPlay className="relative ml-1" />
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
};

const CampusLife: React.FC = () => {
  const [tour, setTour] = useState(false);
  return (
    <>
      <SEO title="Campus Life" description="Sports, academic, arts and student-life facilities at Gurukulam Global School, Mathura. Take the virtual campus tour." />
      <PageHero
        eyebrow="Campus Life"
        title={
          <>
            A campus that <em className="gold-text">inspires</em>
          </>
        }
        lede="Experience a vibrant and enriching environment that fosters growth and learning."
        crumbs={[{ name: 'Campus Life' }]}
      >
        <button onClick={() => setTour(true)} className="btn-gold">
          <FiPlay /> Start Virtual Tour
        </button>
      </PageHero>

      <section className="grain bg-ivory py-24 sm:py-32">
        <div className="container">
          <SectionHeading eyebrow="Our Facilities" title="Spaces for every kind of learner" />
          <div className="mt-16 space-y-6">
            {facilities.map((f, i) => {
              const Art = facilityArt[f.key];
              const photo = photos.facilities[f.key];
              return (
                <Reveal key={f.key}>
                  <div className={`grid items-center gap-8 overflow-hidden rounded-3xl p-8 sm:p-12 lg:grid-cols-[auto_1fr_1fr] lg:gap-14 ${i % 2 ? 'bg-ink-900 text-ivory' : 'bg-white ring-1 ring-ink-900/[0.06]'}`}>
                    {photo ? (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        style={{ objectPosition: photo.focus ?? '50% 50%' }}
                        className="h-56 w-full rounded-t-[999px] rounded-b-2xl object-cover ring-1 ring-gold-400/30 lg:h-64 lg:w-52"
                      />
                    ) : (
                      <div className={`grid h-32 w-32 place-items-center rounded-full ${i % 2 ? 'bg-white/5 ring-1 ring-gold-300/30' : 'bg-gold-50 ring-1 ring-gold-500/25'}`}>
                        <Art className={`h-20 w-20 ${i % 2 ? 'text-gold-300' : 'text-gold-600'}`} animate />
                      </div>
                    )}
                    <div>
                      <span className={`font-display text-lg italic ${i % 2 ? 'text-gold-300' : 'text-gold-600'}`}>0{i + 1}</span>
                      <h3 className={`mt-1 font-display text-4xl ${i % 2 ? 'text-ivory' : ''}`}>{f.title}</h3>
                      <p className={`mt-3 text-lg leading-relaxed ${i % 2 ? 'text-ivory/65' : 'text-ink-700/75'}`}>{f.description}</p>
                    </div>
                    <GoldList items={[...f.items]} dark={i % 2 === 1} className="sm:columns-2 sm:gap-6 sm:space-y-0 [&>li]:mb-3 [&>li]:break-inside-avoid lg:columns-1" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ivory-100 py-24">
        <div className="container">
          <SectionHeading eyebrow="Our Activities" title="Discover the vibrant life at Gurukulam" lede="Engage in a wide range of activities that foster growth and development." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {activities.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl bg-white p-8 text-center ring-1 ring-ink-900/[0.06]">
                  <h3 className="font-display text-2xl">{a.title}</h3>
                  <p className="mt-2 text-ink-700/75">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TourBanner onPlay={() => setTour(true)} />
      <VideoModal open={tour} onClose={() => setTour(false)} videoId={school.virtualTourId} />
    </>
  );
};

export default CampusLife;
