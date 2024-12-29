import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer, staggerItem } from '../components/animations';
import { submitContactForm } from '../services/contactService';

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: formRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await submitContactForm(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-primary-900 min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background with Enhanced Particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: "blur(1px)",
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 30, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.h1 
              variants={staggerItem}
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-secondary-200 to-secondary-400 text-transparent bg-clip-text"
            >
              Contact Us
            </motion.h1>
            <motion.p 
              variants={staggerItem}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              We'd Love to Hear From You! 🌟
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        ref={formRef}
        className="py-20 px-4 relative z-10"
        style={{ y, opacity }}
      >
        <div className="container mx-auto max-w-4xl">
          <div className="bg-primary-800/50 backdrop-blur-lg rounded-3xl shadow-xl border border-primary-700 overflow-hidden">
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={slideInLeft}>
                    <label className="block text-secondary-200 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-primary-700/50 border border-primary-600 text-white placeholder-gray-400 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 transition-all"
                      placeholder="Your Name"
                    />
                  </motion.div>

                  <motion.div variants={slideInRight}>
                    <label className="block text-secondary-200 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-primary-700/50 border border-primary-600 text-white placeholder-gray-400 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>

                  <motion.div variants={slideInLeft}>
                    <label className="block text-secondary-200 font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-primary-700/50 border border-primary-600 text-white placeholder-gray-400 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 transition-all"
                      placeholder="Your Phone Number"
                    />
                  </motion.div>

                  <motion.div variants={slideInRight}>
                    <label className="block text-secondary-200 font-semibold mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-primary-700/50 border border-primary-600 text-white placeholder-gray-400 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 transition-all"
                      placeholder="Message Subject"
                    />
                  </motion.div>
                </div>

                <motion.div variants={fadeInVariant}>
                  <label className="block text-secondary-200 font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-primary-700/50 border border-primary-600 text-white placeholder-gray-400 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 transition-all resize-none"
                    placeholder="Your Message"
                  />
                </motion.div>

                <motion.div variants={fadeInVariant} className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-4 rounded-full font-bold text-white 
                      ${isSubmitting 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 transform hover:scale-105'} 
                      transition-all duration-200 shadow-lg`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message 📨'}
                  </button>
                </motion.div>
              </form>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 p-4 bg-green-900/20 border border-green-500/30 text-green-400 rounded-lg text-center"
                  >
                    Thank you for your message! We'll get back to you soon! 🎉
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 p-4 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg text-center"
                  >
                    Oops! Something went wrong. Please try again later. 😔
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Information Cards */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address Card */}
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
              className="bg-primary-800/50 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-primary-700 text-center"
            >
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-secondary-300 mb-2">Visit Us</h3>
              <p className="text-gray-300">136 A, Madhuvan Enclave,</p>
              <p className="text-gray-300">Near Natraj Mutri, Krishna Nagar,</p>
              <p className="text-gray-300">Mathura, Uttar Pradesh - 281003</p>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
              className="bg-primary-800/50 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-primary-700 text-center"
            >
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-secondary-300 mb-2">Call Us</h3>
              <p className="text-gray-300">+91 7505335080</p>
              <p className="text-gray-300">+91 7617645050</p>
              <p className="text-gray-300">Mon - Sat: 9:00 AM - 5:00 PM</p>
            </motion.div>

            {/* Email Card */}
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
              className="bg-primary-800/50 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-primary-700 text-center"
            >
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-bold text-secondary-300 mb-2">Email Us</h3>
              <p className="text-gray-300">info@gurukulam.edu</p>
              <p className="text-gray-300">admissions@gurukulam.edu</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
