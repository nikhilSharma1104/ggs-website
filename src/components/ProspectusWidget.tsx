import React from 'react';
import { motion } from 'framer-motion';

const PROSPECTUS_URL = "https://drive.google.com/file/d/1yHQGHM3gKBAm8_DiNpRdLp6L3gXrDn9G/view"; // Replace with your actual prospectus link

const ProspectusWidget: React.FC = () => {
  const handleViewProspectus = () => {
    window.open(PROSPECTUS_URL, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/80 to-secondary-500/80 z-10"></div>
        <div className="bg-gradient-to-r from-primary-100 to-secondary-100 h-48"></div>
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl mb-4"
          >
            <i className="fas fa-book-open"></i>
          </motion.div>
          <h3 className="text-2xl font-bold mb-2 text-center">School Prospectus</h3>
          <p className="text-sm text-center mb-4 opacity-90">
            Discover our vision, values, and educational approach
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewProspectus}
            className="bg-white text-primary-600 px-6 py-2 rounded-full font-medium 
              shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <span>View Now</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </motion.button>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <i className="fas fa-file-pdf text-red-500 mr-2"></i>
            <span>PDF Format</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-language text-primary-500 mr-2"></i>
            <span>English</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProspectusWidget;
