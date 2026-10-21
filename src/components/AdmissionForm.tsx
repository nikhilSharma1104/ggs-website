import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiArrowRight, FiLoader } from 'react-icons/fi';
import { submitAdmissionApplication, AdmissionFormData } from '../services/admissionService';
import { gradeOptions, school } from '../data/site';

const empty: AdmissionFormData = {
  studentName: '',
  grade: '',
  parentName: '',
  email: '',
  phone: '',
  message: '',
};

const validate = (f: AdmissionFormData) => {
  const e: Record<string, string> = {};
  if (!f.studentName.trim()) e.studentName = 'Student name is required';
  if (!f.grade) e.grade = 'Grade is required';
  if (!f.parentName.trim()) e.parentName = 'Parent name is required';
  if (!f.email.trim()) e.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Invalid email format';
  if (!f.phone.trim()) e.phone = 'Phone number is required';
  else if (!/^\d{10}$/.test(f.phone.replace(/[\s-]/g, '').replace(/^\+?91/, ''))) e.phone = 'Enter a 10-digit mobile number';
  return e;
};

interface Props {
  /** Popup variant hides the message box and uses a two-column compact grid. */
  compact?: boolean;
  onSuccess?: () => void;
}

const AdmissionForm: React.FC<Props> = ({ compact, onSuccess }) => {
  const [form, setForm] = useState<AdmissionFormData>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    setLoading(true);
    setSubmitError(null);
    try {
      await submitAdmissionApplication({
        ...form,
        phone: form.phone.replace(/[\s-]/g, '').replace(/^\+?91/, ''),
      });
      setSubmitted(true);
      setForm(empty);
      onSuccess?.();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const field = (name: keyof AdmissionFormData, label: string, type = 'text', extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`adm-${name}`} className="field-label">
        {label}
      </label>
      <input
        id={`adm-${name}`}
        name={name}
        type={type}
        value={form[name] ?? ''}
        onChange={onChange}
        aria-invalid={!!errors[name]}
        className={`field ${errors[name] ? 'border-maroon/60 focus:border-maroon focus:ring-maroon/10' : ''}`}
        {...extra}
      />
      {errors[name] && <p className="mt-1 text-xs font-medium text-maroon">{errors[name]}</p>}
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="py-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
            className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-b from-gold-300 to-gold-500 text-ink-950 shadow-glow"
          >
            <FiCheck size={30} />
          </motion.div>
          <h3 className="mt-6 font-display text-3xl">Application received</h3>
          <p className="mx-auto mt-3 max-w-sm text-ink-700/75">
            Thank you for your interest in joining our school. We will review your application and contact you soon.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-outline mt-7">
            Submit Another Application
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className={`grid gap-4 ${compact ? 'sm:grid-cols-2' : 'gap-5 md:grid-cols-2'}`}>
            {field('studentName', 'Student Name', 'text', { autoComplete: 'off' })}
            <div>
              <label htmlFor="adm-grade" className="field-label">
                Grade Applying For
              </label>
              <select
                id="adm-grade"
                name="grade"
                value={form.grade}
                onChange={onChange}
                aria-invalid={!!errors.grade}
                className={`field appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23795920' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10 ${
                  errors.grade ? 'border-maroon/60' : ''
                }`}
              >
                <option value="">Select Grade</option>
                {gradeOptions.map((g) => (
                  <optgroup key={g.group} label={g.group}>
                    {g.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.grade && <p className="mt-1 text-xs font-medium text-maroon">{errors.grade}</p>}
            </div>
            {field('parentName', 'Parent / Guardian Name', 'text', { autoComplete: 'name' })}
            {field('phone', 'Phone Number', 'tel', { autoComplete: 'tel', inputMode: 'tel', placeholder: '10-digit mobile' })}
            <div className={compact ? 'sm:col-span-2' : 'md:col-span-2'}>
              {field('email', 'Email', 'email', { autoComplete: 'email' })}
            </div>
            {!compact && (
              <div className="md:col-span-2">
                <label htmlFor="adm-message" className="field-label">
                  Additional Information
                </label>
                <textarea id="adm-message" name="message" rows={4} value={form.message} onChange={onChange} className="field resize-none" />
              </div>
            )}
          </div>

          {submitError && (
            <p className="mt-4 rounded-xl border border-maroon/20 bg-maroon/5 px-4 py-3 text-sm text-maroon">
              {submitError}. You can also reach us at{' '}
              <a className="font-semibold underline" href={`mailto:${school.email}`}>
                {school.email}
              </a>
              .
            </p>
          )}

          <div className={`mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center ${compact ? 'sm:justify-between' : 'sm:justify-end'}`}>
            {compact && <p className="text-xs text-ink-500">We will review your details and contact you soon.</p>}
            <button type="submit" disabled={loading} className="btn-ink group">
              {loading ? (
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
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default AdmissionForm;
