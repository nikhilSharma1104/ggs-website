import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const PROSPECTUS_URL = "https://drive.google.com/file/d/1yHQGHM3gKBAm8_DiNpRdLp6L3gXrDn9G/view";

const Prospectus: React.FC = () => {
  const handleViewProspectus = () => {
    window.open(PROSPECTUS_URL, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <SEO
        title="School Prospectus - Gurukulam Global School"
        description="Download our school prospectus to learn more about our vision, values, and educational approach."
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/80 to-secondary-500/80"></div>
            <div className="relative z-10 p-8 text-white text-center">
              <h1 className="text-4xl font-bold mb-4">School Prospectus</h1>
              <p className="text-lg mb-6">
                Discover our vision, values, and educational approach
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewProspectus}
                className="bg-white text-primary-600 px-8 py-3 rounded-full font-medium 
                  shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
              >
                <i className="fas fa-book-open mr-2"></i>
                <span>View Prospectus</span>
              </motion.button>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Inside Our Prospectus</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-secondary-500 mr-2"></i>
                    Academic Programs
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-secondary-500 mr-2"></i>
                    School Facilities
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-secondary-500 mr-2"></i>
                    Admission Process
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-secondary-500 mr-2"></i>
                    Extra-Curricular Activities
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Why Choose Us</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <i className="fas fa-star text-secondary-500 mr-2"></i>
                    Excellence in Education
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-star text-secondary-500 mr-2"></i>
                    Experienced Faculty
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-star text-secondary-500 mr-2"></i>
                    Modern Infrastructure
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-star text-secondary-500 mr-2"></i>
                    Holistic Development
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Prospectus;
