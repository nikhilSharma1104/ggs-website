import React from 'react';
import { motion } from 'framer-motion';

const Prospectus = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-comic font-bold text-primary-600 mb-4">
            School Prospectus 📚
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the Gurukulam experience through our comprehensive school prospectus
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative" style={{ paddingTop: '141.42%' }}> {/* Aspect ratio for A4 */}
            <iframe
              src="https://drive.google.com/file/d/YOUR_FILE_ID/preview"
              className="absolute top-0 left-0 w-full h-full"
              allow="autoplay"
            ></iframe>
          </div>
        </div>

        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="https://drive.google.com/file/d/YOUR_FILE_ID/view"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 text-white px-8 py-4 rounded-full font-comic font-bold flex items-center space-x-3 hover:bg-primary-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">📥</span>
            <span>Download Prospectus</span>
          </motion.a>
        </motion.div>

        <motion.div 
          className="mt-12 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="mb-2">Having trouble viewing? Contact us at:</p>
          <p className="font-bold text-primary-600">admissions@gurukulam.edu.in</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Prospectus;
