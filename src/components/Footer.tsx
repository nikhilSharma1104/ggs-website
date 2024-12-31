import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  
  const socialLinks = [
    { icon: "fab fa-facebook", url: "https://facebook.com", name: "Facebook" },
    { icon: "fab fa-instagram", url: "https://instagram.com", name: "Instagram" },
    { icon: "fab fa-twitter", url: "https://twitter.com", name: "Twitter" },
    { icon: "fab fa-youtube", url: "https://youtube.com", name: "YouTube" }
  ];

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Admissions", path: "/admissions" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <footer className="relative bg-primary-900 text-white pt-12 pb-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Map and Contact Section */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Map */}
              <div className="h-[250px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.874189167418!2d77.6549611!3d27.504287899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397371e014c8525f%3A0x9019ba62fabf9da7!2sGurukulam%20Global%20School%20-%20Best%20School%20in%20Mathura%20%7C%20Most%20Dynamic%20School%20In%20Mathura%20-%20Vridavan%20Region!5e0!3m2!1sen!2sin!4v1735657740426!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gurukulam Global School Location"
                  className="rounded-lg"
                />
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold text-secondary-300 mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 rounded-lg border border-primary-800/50">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="text-secondary-200">136 A, Madhuvan Enclave,</p>
                      <p className="text-gray-300">Near Natraj Mutri, Krishna Nagar,</p>
                      <p className="text-gray-300">Mathura, UP - 281003</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg border border-primary-800/50">
                    <span className="text-xl">📞</span>
                    <div>
                      <p className="text-gray-300">+91 7505335080</p>
                      <p className="text-gray-300">+91 7617645050</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links and Social */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-secondary-300 mb-4">Quick Links</h3>
              <ul className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-secondary-300 transition-colors flex items-center space-x-1"
                    >
                      <span>➜</span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-secondary-300 mb-4">Connect With Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-800/50 p-2 rounded-lg border border-primary-800/50"
                    whileHover={{ scale: 1.1 }}
                    onHoverStart={() => setIsHovered(social.name)}
                    onHoverEnd={() => setIsHovered(null)}
                  >
                    <i className={`${social.icon} text-xl ${isHovered === social.name ? 'text-secondary-400' : 'text-gray-300'}`}></i>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter - Simplified */}
            <div>
              <h3 className="text-xl font-bold text-secondary-300 mb-4">Newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-l-lg bg-primary-800/50 border border-primary-700 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-r-lg transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Simplified */}
        <div className="pt-6 border-t border-primary-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Gurukulam Global School. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-secondary-300 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-secondary-300 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
