import React from 'react';
import { motion } from 'framer-motion';

const PROSPECTUS_URL = "https://drive.google.com/file/d/1yHQGHM3gKBAm8_DiNpRdLp6L3gXrDn9G/view"; // Replace with your actual prospectus link

const Prospectus: React.FC = () => {
  const handleViewProspectus = () => {
    window.open(PROSPECTUS_URL, '_blank');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <button
        onClick={handleViewProspectus}
        className="flex items-center space-x-2 bg-secondary-500 text-white px-6 py-3 rounded-lg
          shadow-lg hover:bg-secondary-600 transition-all duration-300"
      >
        <i className="fas fa-book-open text-lg"></i>
        <span className="font-medium ml-2">View Prospectus</span>
      </button>
    </motion.div>
  );
};

export default Prospectus;
