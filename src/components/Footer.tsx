import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiClock, FiArrowUpRight } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { navigation, school, stages, telHref } from '../data/site';
import { Mandala, Ornament } from './art/Illustrations';

const Footer: React.FC = () => {
  const socials = [
    { Icon: FaFacebookF, href: school.social.facebook, label: 'Facebook' },
    { Icon: FaInstagram, href: school.social.instagram, label: 'Instagram' },
    { Icon: FaYoutube, href: school.social.youtube, label: 'YouTube' },
    { Icon: FaWhatsapp, href: `https://wa.me/${school.whatsapp.replace(/\D/g, '')}`, label: 'WhatsApp' },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 pb-24 text-ivory/70 lg:pb-0">
      <div className="pointer-events-none absolute -right-48 -top-48 -z-10 h-[40rem] w-[40rem] text-gold-300/[0.07]">
        <Mandala className="h-full w-full animate-spin-slow" />
      </div>

      <div className="container pt-20">
        {/* Crest + statement */}
        <div className="flex flex-col items-center text-center">
          <img src="/images/logo-128.png" alt={school.name} className="h-20 w-20" loading="lazy" />
          <p className="mt-6 max-w-2xl font-display text-2xl italic leading-snug text-ivory sm:text-3xl">
            &ldquo;Where tradition meets innovation in education.&rdquo;
          </p>
          <Ornament className="mt-6 h-4 w-32 text-gold-400/60" />
        </div>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="font-display text-2xl text-ivory">Visit us</h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3">
                <FiMapPin className="mt-0.5 flex-none text-gold-300" />
                <a href={school.mapLink} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-200">
                  {school.address.line1},<br />
                  {school.address.line2},<br />
                  {school.address.city}
                </a>
              </li>
              <li className="flex gap-3">
                <FiPhone className="mt-0.5 flex-none text-gold-300" />
                <span>
                  {school.phones.map((p) => (
                    <a key={p} href={telHref(p)} className="block transition hover:text-gold-200">
                      {p}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <FiMail className="mt-0.5 flex-none text-gold-300" />
                <a href={`mailto:${school.email}`} className="break-all transition hover:text-gold-200">
                  {school.email}
                </a>
              </li>
              <li className="flex gap-3">
                <FiClock className="mt-0.5 flex-none text-gold-300" />
                {school.hours}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl text-ivory">Explore</h3>
            <ul className="mt-6 space-y-2.5 text-sm">
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link to={n.href} className="transition hover:text-gold-200">
                    {n.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/prospectus" className="transition hover:text-gold-200">
                  Prospectus
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl text-ivory">Academics</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {stages.map((s) => (
                <li key={s.key}>
                  <Link to={s.slug} className="transition hover:text-gold-200">
                    {s.title}
                    <span className="block text-xs text-ivory/40">{s.classes}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-4">
            <div className="h-56 overflow-hidden rounded-2xl ring-1 ring-white/10">
              <iframe
                src={school.mapEmbed}
                className="h-full w-full grayscale-[60%] invert-[0.88] hue-rotate-180"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${school.name} location`}
                allowFullScreen
              />
            </div>
            <a href={school.mapLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-gold-300 transition hover:text-gold-200">
              Get directions <FiArrowUpRight />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 text-xs sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {school.name}, Mathura. All rights reserved.
          </p>
          <div className="flex gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition hover:border-gold-300 hover:bg-gold-300 hover:text-ink-950"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
