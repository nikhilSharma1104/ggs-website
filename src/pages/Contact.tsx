import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FloatingShape = ({ emoji, className }: { emoji: string; className: string }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <span className="text-4xl">{emoji}</span>
  </motion.div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Please tell us your name! 😊';
    if (!formData.email.trim()) {
      newErrors.email = 'We need your email to reach you! 📧';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Oops! That email doesn\'t look right 🤔';
    }
    if (!formData.message.trim()) newErrors.message = 'Don\'t forget to write your message! ✏️';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen py-16 bg-secondary-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <FloatingShape emoji="✉️" className="top-20 left-10" />
      <FloatingShape emoji="📞" className="top-40 right-20" />
      <FloatingShape emoji="💌" className="bottom-20 left-20" />
      <FloatingShape emoji="🌟" className="bottom-40 right-10" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-comic font-bold text-primary-600 mb-8 text-center">
            Say Hello! 👋
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Contact Info & Hours */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-secondary-300">
                <h2 className="text-3xl font-comic font-bold text-primary-600 mb-6">
                  Let's Connect! 🤝
                </h2>
                <div className="space-y-4 font-comic">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">📍</div>
                    <div>
                      <h3 className="font-bold text-primary-600">Our Address</h3>
                      <p className="text-gray-600">123 School Street, City Name, State 12345</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">📞</div>
                    <div>
                      <h3 className="font-bold text-primary-600">Phone</h3>
                      <p className="text-gray-600">+1 (123) 456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">📧</div>
                    <div>
                      <h3 className="font-bold text-primary-600">Email</h3>
                      <p className="text-gray-600">hello@gurukulamschool.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-secondary-300">
                <h2 className="text-2xl font-comic font-bold text-primary-600 mb-4">
                  School Hours 🕒
                </h2>
                <div className="space-y-2 font-comic text-gray-600">
                  <p>Monday - Friday: 8:00 AM - 3:30 PM</p>
                  <p>Saturday: 8:00 AM - 12:30 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              {/* Google Maps */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-secondary-300">
                <h2 className="text-2xl font-comic font-bold text-primary-600 mb-4">
                  Find Us Here! 🗺️
                </h2>
                <div className="aspect-w-16 aspect-h-12 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d YOUR_COORDINATES!2d YOUR_LONGITUDE!3d YOUR_LATITUDE!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0PCsDQ5JzUyLjIiTiA3OMKwMjcnMTguOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Middle Column - Contact Form */}
            <div className="md:col-span-2">
              <div className="grid gap-8">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-secondary-300">
                  <h2 className="text-3xl font-comic font-bold text-primary-600 mb-6">
                    Send us a Message! 💌
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block font-comic font-bold text-primary-600 mb-2">
                        Your Name 😊
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 font-comic ${
                          errors.name ? 'border-red-300' : 'border-secondary-200'
                        } focus:border-secondary-400 focus:outline-none`}
                        placeholder="What should we call you?"
                      />
                      {errors.name && (
                        <p className="mt-2 text-red-500 font-comic">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-comic font-bold text-primary-600 mb-2">
                        Your Email 📧
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 font-comic ${
                          errors.email ? 'border-red-300' : 'border-secondary-200'
                        } focus:border-secondary-400 focus:outline-none`}
                        placeholder="Where can we reach you?"
                      />
                      {errors.email && (
                        <p className="mt-2 text-red-500 font-comic">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-comic font-bold text-primary-600 mb-2">
                        Phone Number 📱
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-secondary-400 focus:outline-none font-comic"
                        placeholder="Optional: Your phone number"
                      />
                    </div>

                    <div>
                      <label className="block font-comic font-bold text-primary-600 mb-2">
                        Your Message ✏️
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.02 }}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border-2 font-comic ${
                          errors.message ? 'border-red-300' : 'border-secondary-200'
                        } focus:border-secondary-400 focus:outline-none`}
                        placeholder="What would you like to tell us?"
                      />
                      {errors.message && (
                        <p className="mt-2 text-red-500 font-comic">{errors.message}</p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full px-6 py-3 bg-secondary-400 text-primary-700 rounded-full font-comic text-lg hover:bg-secondary-300 transition-colors shadow-lg"
                    >
                      Send Message! 🚀
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
