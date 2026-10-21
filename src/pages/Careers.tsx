import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiAward, FiUploadCloud, FiFile, FiX, FiArrowRight, FiLoader } from 'react-icons/fi';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { Reveal, SectionHeading } from '../components/ui';
import { submitCareerApplication, type CareerFormData } from '../services/careerService';
import { careerReasons } from '../data/site';

const empty: CareerFormData = {
  position: '',
  department: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  experience: '',
  education: '',
  resume: null,
  coverLetter: '',
};

const reasonIcons = [FiTrendingUp, FiUsers, FiAward];
const MAX_RESUME_BYTES = 10 * 1024 * 1024;

const Careers: React.FC = () => {
  const [form, setForm] = useState<CareerFormData>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const setResume = (file?: File) => {
    if (!file) return;
    if (file.size > MAX_RESUME_BYTES) {
      setStatus({ type: 'error', message: 'Resume must be 10MB or smaller.' });
      return;
    }
    setStatus(null);
    setForm((p) => ({ ...p, resume: file }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.resume) {
      setStatus({ type: 'error', message: 'Please attach your resume.' });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      await submitCareerApplication(form);
      setStatus({ type: 'success', message: 'Application submitted successfully! We will review your application and get back to you soon.' });
      setForm(empty);
      if (fileRef.current) fileRef.current.value = '';
    } catch {
      setStatus({ type: 'error', message: 'Failed to submit application. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  const text = (name: keyof CareerFormData, label: string, type = 'text', extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`car-${name}`} className="field-label">
        {label}
      </label>
      <input id={`car-${name}`} name={name} type={type} required value={(form[name] as string) ?? ''} onChange={onChange} className="field" {...extra} />
    </div>
  );

  return (
    <>
      <SEO />
      <PageHero
        eyebrow="Careers at GGS"
        title={
          <>
            Join our <em className="gold-text">team</em>
          </>
        }
        lede="Shape the future of education with us."
        crumbs={[{ name: 'Careers' }]}
      >
        <a href="#apply" className="btn-gold">
          Apply Now
        </a>
      </PageHero>

      <section className="grain bg-ivory py-24 sm:py-28">
        <div className="container">
          <SectionHeading eyebrow="Why Join GGS?" title="A place to grow as an educator" lede="Be part of an institution that values growth, innovation, and excellence in education." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {careerReasons.map((r, i) => {
              const Icon = reasonIcons[i];
              return (
                <Reveal key={r.title} delay={i * 0.08}>
                  <div className="h-full rounded-3xl bg-white p-9 ring-1 ring-ink-900/[0.06]">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-900 text-xl text-gold-300">
                      <Icon />
                    </span>
                    <h3 className="mt-6 font-display text-3xl">{r.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-700/75">{r.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 bg-ivory-100 py-24 sm:py-28">
        <div className="container max-w-4xl">
          <SectionHeading eyebrow="Apply Now" title="Start your application" lede="Take the first step towards an enriching career in education." />
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="mt-12 rounded-3xl bg-ivory p-7 shadow-lift ring-1 ring-ink-900/5 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="car-position" className="field-label">
                    Position
                  </label>
                  <select id="car-position" name="position" value={form.position} onChange={onChange} required className="field">
                    <option value="">Select Position</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Administrative Staff">Administrative Staff</option>
                    <option value="Support Staff">Support Staff</option>
                  </select>
                </div>
                {text('department', 'Department')}
                {text('firstName', 'First Name', 'text', { autoComplete: 'given-name' })}
                {text('lastName', 'Last Name', 'text', { autoComplete: 'family-name' })}
                {text('email', 'Email', 'email', { autoComplete: 'email' })}
                {text('phone', 'Phone', 'tel', { autoComplete: 'tel' })}
                {text('experience', 'Years of Experience', 'number', { min: 0 })}
                {text('education', 'Education')}
              </div>

              <div className="mt-5">
                <span className="field-label">Resume</span>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    setResume(e.dataTransfer.files?.[0]);
                  }}
                  className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition ${
                    dragging ? 'border-gold-500 bg-gold-50' : 'border-ink-900/15 hover:border-gold-500/60'
                  }`}
                >
                  {form.resume ? (
                    <div className="flex items-center justify-center gap-3 text-ink-800">
                      <FiFile className="text-2xl text-gold-600" />
                      <span className="max-w-[16rem] truncate font-medium">{form.resume.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setForm((p) => ({ ...p, resume: null }));
                          if (fileRef.current) fileRef.current.value = '';
                        }}
                        className="grid h-8 w-8 place-items-center rounded-full bg-ink-900/5 hover:bg-maroon/10 hover:text-maroon"
                        aria-label="Remove file"
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <>
                      <FiUploadCloud className="mx-auto text-4xl text-gold-600" />
                      <p className="mt-3 text-sm text-ink-700">
                        <label htmlFor="resume-upload" className="cursor-pointer font-semibold text-ink-900 underline decoration-gold-500 underline-offset-4">
                          Upload a file
                        </label>{' '}
                        or drag and drop
                      </p>
                      <p className="mt-1 text-xs text-ink-500">PDF, DOC up to 10MB</p>
                    </>
                  )}
                  <input id="resume-upload" ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => setResume(e.target.files?.[0])} />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="car-cover" className="field-label">
                  Cover Letter
                </label>
                <textarea
                  id="car-cover"
                  name="coverLetter"
                  rows={5}
                  required
                  value={form.coverLetter}
                  onChange={onChange}
                  placeholder="Tell us why you would be a great fit for this position..."
                  className="field resize-none"
                />
              </div>

              <AnimatePresence>
                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-5 rounded-xl px-4 py-3 text-sm ${
                      status.type === 'success' ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/20' : 'bg-maroon/5 text-maroon ring-1 ring-maroon/20'
                    }`}
                  >
                    {status.message}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-8 flex justify-end">
                <button type="submit" disabled={submitting} className="btn-ink group">
                  {submitting ? (
                    <>
                      <FiLoader className="animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      Submit Application <FiArrowRight className="transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Careers;
