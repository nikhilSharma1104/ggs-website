import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight, FiLoader, FiCheckCircle, FiAlertCircle, FiArrowUpRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { Reveal } from '../components/ui';
import { submitContactForm, ContactFormData } from '../services/contactService';
import { school, telHref } from '../data/site';

const empty: ContactFormData = { name: '', email: '', phone: '', subject: '', message: '' };

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactFormData>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    try {
      await submitContactForm(form);
      setStatus('success');
      setForm(empty);
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const cards = [
    {
      Icon: FiMapPin,
      title: 'Visit Us',
      lines: [school.address.line1, school.address.line2, school.address.city],
      href: school.mapLink,
      cta: 'Get directions',
    },
    { Icon: FiPhone, title: 'Call Us', lines: [...school.phones, school.hours], href: telHref(school.phones[0]), cta: 'Call now' },
    { Icon: FiMail, title: 'Email Us', lines: [school.email], href: `mailto:${school.email}`, cta: 'Write to us' },
  ];

  return (
    <>
      <SEO />
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            We&rsquo;d love to <em className="gold-text">hear from you</em>
          </>
        }
        lede="Questions about admissions, a campus visit, or anything else, our office is happy to help."
        crumbs={[{ name: 'Contact' }]}
      />

      <section className="relative z-10 -mt-12">
        <div className="container grid gap-5 md:grid-cols-3">
          {cards.map(({ Icon, title, lines, href, cta }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl bg-ivory p-8 shadow-lift ring-1 ring-ink-900/5 transition hover:-translate-y-1"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-900 text-xl text-gold-300 transition group-hover:bg-gold-400 group-hover:text-ink-950">
                  <Icon />
                </span>
                <h2 className="mt-6 font-display text-2xl">{title}</h2>
                <div className="mt-2 flex-1 space-y-0.5 break-words text-ink-700/80">
                  {lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                  {cta} <FiArrowUpRight className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grain bg-ivory py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <span className="eyebrow">Send a message</span>
            <h2 className="display-md mt-4">Write to the school office</h2>
            <form onSubmit={onSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
              {(
                [
                  ['name', 'Name', 'text', 'Your Name'],
                  ['email', 'Email', 'email', 'your.email@example.com'],
                  ['phone', 'Phone', 'tel', 'Your Phone Number'],
                  ['subject', 'Subject', 'text', 'Message Subject'],
                ] as const
              ).map(([name, label, type, placeholder]) => (
                <div key={name}>
                  <label htmlFor={`c-${name}`} className="field-label">
                    {label}
                  </label>
                  <input id={`c-${name}`} name={name} type={type} required value={form[name]} onChange={onChange} placeholder={placeholder} className="field" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="c-message" className="field-label">
                  Message
                </label>
                <textarea id="c-message" name="message" required rows={6} value={form.message} onChange={onChange} placeholder="Your Message" className="field resize-none" />
              </div>
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                      <FiCheckCircle /> Message sent successfully! We&rsquo;ll get back to you soon.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm font-medium text-maroon">
                      <FiAlertCircle /> Failed to send message. Please try again or contact us directly.
                    </motion.p>
                  )}
                  {status === 'idle' && <span key="idle" />}
                </AnimatePresence>
                <button type="submit" disabled={submitting} className="btn-ink group flex-none">
                  {submitting ? (
                    <>
                      <FiLoader className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send Message <FiArrowRight className="transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5">
            <div className="h-80 overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink-900/10 lg:h-auto lg:flex-1">
              <iframe
                src={school.mapEmbed}
                className="h-full min-h-[20rem] w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${school.name} location`}
                allowFullScreen
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <a
                href={`https://wa.me/${school.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-[#25D366]/10 p-5 ring-1 ring-[#25D366]/30 transition hover:bg-[#25D366]/20"
              >
                <FaWhatsapp className="flex-none text-3xl text-[#1a9e4b]" />
                <span>
                  <span className="block font-semibold text-ink-900">WhatsApp</span>
                  <span className="text-sm text-ink-600">Quick responses</span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-gold-50 p-5 ring-1 ring-gold-500/25">
                <FiClock className="flex-none text-3xl text-gold-700" />
                <span>
                  <span className="block font-semibold text-ink-900">Office hours</span>
                  <span className="text-sm text-ink-600">{school.hours}</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
