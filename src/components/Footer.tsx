import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Prospectus from './Prospectus';

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
                <p className="text-gray-300">136 A, Madhuvan Enclave,</p>
                <p className="text-gray-300">Near Natraj Mutri, Krishna Nagar,</p>
                <p className="text-gray-300">Mathura, Uttar Pradesh - 281003</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3 hover:bg-primary-800/50 p-2 rounded-lg transition-all border border-primary-800/50"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-bold text-secondary-200">Phone</p>
                <p className="text-gray-300">+91 7505335080</p>
                <p className="text-gray-300">+91 7617645050</p>
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
                    className="w-2 h-2 bg-secondary-500 rounded-full opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={isHovered === link.name ? { scale: [1, 1.5, 1] } : {}}
                  />
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
                className="w-12 h-12 rounded-full bg-primary-800 flex items-center justify-center hover:bg-secondary-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={`${social.icon} text-xl`}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Location Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="backdrop-blur-sm md:col-span-1"
        >
          <h3 className="text-2xl font-bold text-secondary-300 mb-6">Find Us</h3>
          <div className="rounded-lg overflow-hidden shadow-lg border-4 border-primary-800/50 hover:border-secondary-500 transition-all duration-300">
            <div className="relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.901789586309!2d77.67260217533774!3d27.498902476090753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397371c0f6fc3857%3A0x7c826b5d2c0a5567!2sGurukulam%20Global%20School!5e0!3m2!1sen!2sin!4v1704015594276!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gurukulam Global School Location"
                className="w-full transition-opacity filter contrast-125 saturate-110"
              ></iframe>
              <div className="absolute bottom-4 right-4 flex space-x-4">
                <a 
                  href="https://maps.app.goo.gl/PejZuZcYUZ93XfwU7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-secondary-600 transition-all duration-300 flex items-center space-x-2 text-sm font-medium"
                >
                  <i className="fas fa-directions mr-2"></i>
                  Get Directions
                </a>
                <Prospectus />
              </div>
            </div>
            <div className="bg-primary-800/80 backdrop-blur-sm p-4">
              <h4 className="text-secondary-300 font-semibold mb-1">Visit Us At:</h4>
              <p className="text-gray-300 text-sm">
                136A, Madhuvan Enclave, Near Natraj Murti, Krishna Nagar,<br />
                Mathura, Uttar Pradesh - 281003
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto mt-16 pt-8 border-t border-primary-800 text-center relative z-10">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Gurukulam Global School. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
