import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMail, FiChevronDown, FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import Weather from './widgets/Weather';
import { navigation, school, telHref } from '../data/site';
import { Mandala } from './art/Illustrations';
import Wordmark from './Wordmark';

// Home lives on the logo and Careers in the utility bar, keeping the main row airy.
const primaryNav = navigation.filter((n) => n.name !== 'Home' && n.name !== 'Careers');

const today = () =>
  new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

const Navbar: React.FC<{ onApply: () => void }> = ({ onApply }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const solid = scrolled && !open;
  const isActive = (href: string) => (href === '/' ? location.pathname === '/' : location.pathname.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] pt-[env(safe-area-inset-top)]">
        {/* Utility bar */}
        <motion.div
          animate={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="hidden overflow-hidden border-b border-white/10 bg-ink-950/60 text-[12px] text-ivory/70 backdrop-blur-md lg:block"
        >
          <div className="container flex h-10 items-center justify-between">
            <div className="flex items-center gap-6">
              <a href={telHref(school.phones[0])} className="flex items-center gap-1.5 transition hover:text-gold-300">
                <FiPhone className="text-gold-300" /> {school.phones[0]}
              </a>
              <a href={`mailto:${school.email}`} className="flex items-center gap-1.5 transition hover:text-gold-300">
                <FiMail className="text-gold-300" /> {school.email}
              </a>
              <span className="hidden items-center gap-1.5 xl:flex">
                <FiMapPin className="text-gold-300" /> Krishna Nagar, Mathura
              </span>
            </div>
            <div className="flex items-center gap-5">
              <span>{today()}</span>
              <Weather />
              <span className="h-3 w-px bg-white/20" />
              <Link to="/careers" className="transition hover:text-gold-300">Careers</Link>
              <Link to="/prospectus" className="transition hover:text-gold-300">Prospectus</Link>
              <span className="h-3 w-px bg-white/20" />
              <div className="flex items-center gap-3">
                <a href={school.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition hover:text-gold-300"><FaFacebookF /></a>
                <a href={school.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition hover:text-gold-300"><FaInstagram /></a>
                <a href={school.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition hover:text-gold-300"><FaYoutube /></a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main bar */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            solid ? 'bg-ivory/90 shadow-soft backdrop-blur-xl' : 'bg-transparent'
          }`}
        >
          <div className={`container flex items-center justify-between transition-all duration-500 ${solid ? 'h-[72px]' : 'h-[88px]'}`}>
            <Link to="/" className="group relative z-[110] flex items-center gap-3" aria-label={`${school.name} home`}>
              <img
                src="/images/logo-128.png"
                alt=""
                className={`transition-all duration-500 ${solid ? 'h-10 w-10 sm:h-11 sm:w-11' : 'h-12 w-12 sm:h-14 sm:w-14'} drop-shadow-[0_4px_12px_rgba(210,170,72,0.35)]`}
              />
              <Wordmark variant="nav" tone={solid ? 'dark' : 'light'} />
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 xl:flex">
              {primaryNav.map((item) => (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setDropdown(item.name)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <NavLink
                    to={item.href}
                    className={`group relative flex items-center gap-1 px-3.5 py-2 text-[14px] font-medium transition-colors ${
                      solid ? 'text-ink-800 hover:text-gold-700' : 'text-ivory/90 hover:text-gold-200'
                    } ${isActive(item.href) ? (solid ? '!text-gold-700' : '!text-gold-300') : ''}`}
                  >
                    {item.name}
                    {item.children && <FiChevronDown className={`transition-transform ${dropdown === item.name ? 'rotate-180' : ''}`} />}
                    <span
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-current transition-transform duration-300 ${
                        isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </NavLink>

                  <AnimatePresence>
                    {item.children && dropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-4"
                      >
                        <div className="overflow-hidden rounded-2xl bg-ivory p-2 shadow-lift ring-1 ring-ink-900/5">
                          {item.children.map((c) => (
                            <Link
                              key={c.href}
                              to={c.href}
                              className="group flex items-center justify-between rounded-xl px-4 py-3 transition hover:bg-gold-50"
                            >
                              <span>
                                <span className="block font-display text-lg text-ink-900">{c.name}</span>
                                <span className="block text-xs text-ink-500">{c.note}</span>
                              </span>
                              <FiArrowUpRight className="text-gold-600 opacity-0 transition group-hover:opacity-100" />
                            </Link>
                          ))}
                          <Link to="/academics" className="mt-1 block rounded-xl bg-ink-900 px-4 py-3 text-sm font-semibold text-gold-200 transition hover:bg-ink-800">
                            Explore all academics &rarr;
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button onClick={onApply} className="btn-gold hidden px-5 py-2.5 sm:inline-flex">
                Apply Now
              </button>
              <button
                onClick={() => setOpen((o) => !o)}
                className={`relative z-[110] grid h-11 w-11 place-items-center rounded-full transition xl:hidden ${
                  open ? 'bg-gold-400 text-ink-950' : solid ? 'bg-ink-900 text-ivory' : 'bg-white/10 text-ivory backdrop-blur'
                }`}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                <span className="relative block h-3 w-5">
                  <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                  <span className={`absolute left-0 top-1.5 h-[1.5px] bg-current transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-3.5'}`} />
                  <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
                </span>
              </button>
            </div>
          </div>
        </motion.nav>
      </header>

      {/* Full-screen mobile menu built from sliding layers */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[99] xl:hidden" initial="closed" animate="open" exit="closed">
            <motion.div
              className="absolute inset-0 bg-gold-400"
              variants={{ closed: { clipPath: 'circle(0% at calc(100% - 44px) 44px)' }, open: { clipPath: 'circle(150% at calc(100% - 44px) 44px)' } }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="absolute inset-0 overflow-y-auto bg-ink-950"
              variants={{
                closed: { clipPath: 'circle(0% at calc(100% - 44px) 44px)' },
                open: { clipPath: 'circle(150% at calc(100% - 44px) 44px)', transition: { duration: 0.8, delay: 0.08, ease: [0.76, 0, 0.24, 1] } },
              }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] text-gold-300/10">
                <Mandala className="h-full w-full animate-spin-slow" />
              </div>
              <div className="container relative flex min-h-full flex-col pb-10 pt-28">
                <motion.ul
                  variants={{ open: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } }, closed: {} }}
                  className="space-y-1"
                >
                  {navigation.map((item, i) => (
                    <motion.li
                      key={item.href}
                      variants={{ closed: { opacity: 0, y: 24 }, open: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={item.href}
                        className={`group flex items-baseline gap-4 py-2 font-display text-4xl transition sm:text-5xl ${
                          isActive(item.href) ? 'text-gold-300' : 'text-ivory hover:text-gold-200'
                        }`}
                      >
                        <span className="w-6 font-sans text-xs text-gold-400/70">{String(i + 1).padStart(2, '0')}</span>
                        {item.name}
                      </Link>
                      {item.children && (
                        <div className="mb-2 ml-10 flex flex-wrap gap-2">
                          {item.children.map((c) => (
                            <Link key={c.href} to={c.href} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-ivory/70 transition hover:border-gold-300 hover:text-gold-200">
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  variants={{ closed: { opacity: 0 }, open: { opacity: 1, transition: { delay: 0.7 } } }}
                  className="mt-auto grid gap-6 border-t border-white/10 pt-8 text-sm text-ivory/70 sm:grid-cols-2"
                >
                  <div className="space-y-2">
                    {school.phones.map((p) => (
                      <a key={p} href={telHref(p)} className="flex items-center gap-2 hover:text-gold-300">
                        <FiPhone className="text-gold-300" /> {p}
                      </a>
                    ))}
                    <a href={`mailto:${school.email}`} className="flex items-center gap-2 hover:text-gold-300">
                      <FiMail className="text-gold-300" /> {school.email}
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      setOpen(false);
                      onApply();
                    }}
                    className="btn-gold self-start"
                  >
                    Apply for Admission
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
