import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Academics', href: '/academics' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Campus Life', href: '/campus-life' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.nav
      className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-primary-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        bounce: isMobile ? 0.1 : 0.3,
        duration: isMobile ? 0.4 : 0.6
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? -20 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              bounce: isMobile ? 0.1 : 0.3,
              duration: isMobile ? 0.3 : 0.5
            }}
          >
            <Link to="/" className="flex items-center space-x-2 md:space-x-3">
              <img
                src="/logo.png"
                alt="Gurukulam Global School"
                className={`transition-all duration-300 h-8 md:h-12 ${
                  isScrolled ? 'md:h-10' : 'md:h-12'
                }`}
              />
              <div className="flex flex-col">
                <span className={`font-bold text-sm md:text-xl lg:text-2xl text-white transition-all duration-300 ${
                  isScrolled ? 'md:text-lg' : 'md:text-xl'
                }`}>
                  Gurukulam Global School
                </span>
                <span className={`text-xs md:text-sm text-secondary-400 transition-opacity duration-300 ${
                  isScrolled ? 'opacity-0 h-0' : 'opacity-100'
                }`}>
                  Nurturing Future Leaders
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>

          {/* Desktop Menu */}
          <motion.div
            className="hidden md:flex space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: isMobile ? 0.3 : 0.5 }}
          >
            {navigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * (isMobile ? 0.1 : 0.2),
                  duration: isMobile ? 0.3 : 0.5
                }}
              >
                <Link
                  to={item.href}
                  className={`relative px-4 py-2 rounded-lg text-white hover:text-secondary-500 transition-colors ${
                    location.pathname === item.href
                      ? 'text-secondary-500'
                      : ''
                  }`}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-500"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden bg-primary-800/95 backdrop-blur-lg rounded-b-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: isMobile ? 0.2 : 0.3,
                ease: "easeInOut"
              }}
            >
              <div className="px-4 py-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * (isMobile ? 0.05 : 0.1),
                      duration: isMobile ? 0.2 : 0.3
                    }}
                  >
                    <Link
                      to={item.href}
                      className={`block py-3 px-4 rounded-lg text-white hover:text-secondary-500 hover:bg-primary-700/50 transition-colors ${
                        location.pathname === item.href
                          ? 'text-secondary-500 bg-primary-700/50'
                          : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
