import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, slideInLeft, slideInRight, staggerContainer, staggerItem } from '../components/animations';

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
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
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
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const contactInfo = [
    {
      title: "Address",
      info: "123 School Street, City, State - 12345",
      icon: "📍"
    },
    {
      title: "Phone",
      info: "+1 (234) 567-8900",
      icon: "📞"
    },
    {
      title: "Email",
      info: "info@gurukulam.edu",
      icon: "📧"
    },
    {
      title: "Office Hours",
      info: "Monday - Friday: 8:00 AM - 4:00 PM",
      icon: "⏰"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-16 px-4"
    >
      <div className="container mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-5xl font-comic font-bold text-primary-600 mb-4"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              We're here to help and answer any questions you might have
            </motion.p>
          </div>
        </FadeIn>

        <motion.div 
          variants={slideInLeft}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            {/* Contact Form */}
            <h2 className="text-2xl font-comic font-bold text-primary-600 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {[
                  { name: "name", label: "Your Name", type: "text" },
                  { name: "email", label: "Email Address", type: "email" },
                  { name: "phone", label: "Phone Number", type: "tel" },
                  { name: "subject", label: "Subject", type: "text" }
                ].map((field) => (
                  <motion.div
                    key={field.name}
                    variants={staggerItem}
                    className="mb-4"
                  >
                    <label
                      htmlFor={field.name}
                      className="block text-gray-700 font-comic mb-2"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                      required
                    />
                  </motion.div>
                ))}
                <motion.div variants={staggerItem} className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-comic mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    required
                  />
                </motion.div>
                <motion.button
                  variants={staggerItem}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-comic hover:bg-primary-700 transition-colors
                    ${isSubmitting 
                      ? 'bg-primary-700 cursor-not-allowed' 
                      : 'bg-secondary-500 hover:bg-secondary-600'}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-500 text-center"
                    >
                      Message sent successfully!
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-500 text-center"
                    >
                      Failed to send message. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={slideInRight}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-comic font-bold text-primary-600 mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    variants={staggerItem}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl"
                    >
                      {info.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-comic font-bold text-gray-800">
                        {info.title}
                      </h3>
                      <p className="text-gray-600">{info.info}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Map or Additional Information */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-comic font-bold text-primary-600 mb-6">
                Visit Us
              </h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200">
                {/* Add map here */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
