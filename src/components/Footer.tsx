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
    <footer className="relative bg-primary-900 text-white pt-16 pb-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
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

      <div className="container mx-auto grid md:grid-cols-4 gap-12 px-4 relative z-10">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-secondary-300 mb-6">Contact Us</h3>
          <div className="space-y-4">
            <motion.div 
              className="flex items-center space-x-3 hover:bg-primary-800/50 p-2 rounded-lg transition-all border border-primary-800/50"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-bold text-secondary-200">Address</p>
                <p className="text-gray-300">123 School Street, City Name</p>
                <p className="text-gray-300">State 12345</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3 hover:bg-primary-800/50 p-2 rounded-lg transition-all border border-primary-800/50"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-bold text-secondary-200">Phone</p>
                <p className="text-gray-300">+1 (123) 456-7890</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-secondary-300 mb-6">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <motion.li key={link.name}>
                <Link
                  to={link.path}
                  className="text-gray-300 hover:text-secondary-300 transition-colors flex items-center space-x-2 group"
                >
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    ➜
                  </motion.span>
                  <span>{link.name}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-secondary-300 mb-6">Connect With Us</h3>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-800/50 hover:bg-primary-700/50 p-3 rounded-lg transition-all border border-primary-800/50"
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setIsHovered(social.name)}
                onHoverEnd={() => setIsHovered(null)}
              >
                <i className={`${social.icon} text-2xl ${isHovered === social.name ? 'text-secondary-400' : 'text-gray-300'}`}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-secondary-300 mb-6">Newsletter</h3>
          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-primary-800/50 border border-primary-700 text-white placeholder-gray-400 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 transition-all"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white rounded-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-primary-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-gray-400 text-center md:text-left"
            >
              &copy; {new Date().getFullYear()} Gurukulam Global School. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex space-x-6"
            >
              <Link to="/privacy" className="text-gray-400 hover:text-secondary-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-secondary-300 transition-colors">
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
