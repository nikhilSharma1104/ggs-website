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
    <footer className="bg-gradient-to-b from-primary-600 to-primary-800 text-white py-16">
      <div className="container mx-auto grid md:grid-cols-4 gap-12 px-4">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-comic font-bold text-secondary-300 mb-6">Contact Us</h3>
          <div className="space-y-4 font-comic">
            <motion.div 
              className="flex items-center space-x-3 hover:bg-primary-700 p-2 rounded-lg transition-all"
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
              className="flex items-center space-x-3 hover:bg-primary-700 p-2 rounded-lg transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-bold text-secondary-200">Phone</p>
                <p className="text-gray-300">+1 (123) 456-7890</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3 hover:bg-primary-700 p-2 rounded-lg transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-bold text-secondary-200">Email</p>
                <p className="text-gray-300">hello@gurukulamschool.com</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-comic font-bold text-secondary-300 mb-6">Quick Links</h3>
          <div className="space-y-2 font-comic">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="transition-all"
              >
                <Link 
                  to={link.path}
                  className="text-gray-300 hover:text-secondary-300 block py-1"
                >
                  → {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* School Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-comic font-bold text-secondary-300 mb-6">School Hours</h3>
          <div className="space-y-2 font-comic text-gray-300">
            <motion.p 
              className="hover:bg-primary-700 p-2 rounded-lg transition-all"
              whileHover={{ x: 5 }}
            >
              Monday - Friday: 8:00 AM - 3:30 PM
            </motion.p>
            <motion.p 
              className="hover:bg-primary-700 p-2 rounded-lg transition-all"
              whileHover={{ x: 5 }}
            >
              Saturday: 8:00 AM - 12:30 PM
            </motion.p>
            <motion.p 
              className="hover:bg-primary-700 p-2 rounded-lg transition-all"
              whileHover={{ x: 5 }}
            >
              Sunday: Closed
            </motion.p>
          </div>
        </motion.div>

        {/* Location Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-comic font-bold text-secondary-300 mb-6">Find Us Here</h3>
          <motion.div 
            className="rounded-xl overflow-hidden h-48 shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDYcwO8ojKK6aIMzA6Tb6-GwYjzHckHJOU&q=Gurukulam+Global+School,Mathura+UP"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
          
          {/* Social Media Links */}
          <div className="mt-6 flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary-300 text-2xl"
                whileHover={{ scale: 1.2, rotate: 5 }}
                onHoverStart={() => setIsHovered(social.name)}
                onHoverEnd={() => setIsHovered(null)}
              >
                <i className={social.icon}></i>
                {isHovered === social.name && (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute text-sm mt-1"
                  >
                    {social.name}
                  </motion.span>
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Copyright Section */}
      <motion.div 
        className="text-center mt-12 pt-8 border-t border-primary-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-gray-400 font-comic">
          {new Date().getFullYear()} Gurukulam Global School. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
