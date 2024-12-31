import React from 'react';
import { motion } from 'framer-motion';
import GradientBackground from '../components/GradientBackground';

const FoundationalStage: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <GradientBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-800/90" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.h1 
            {...fadeIn}
            className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary-300 to-secondary-500"
          >
            Foundational Stage
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Building strong foundations for lifelong learning
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Overview Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                The Foundational Stage at Gurukulam Global School is designed for children aged 3-8 years (Nursery to Class 2). This stage focuses on developing foundational literacy and numeracy, cognitive development, and social-emotional growth.
              </p>
              <p>
                Our curriculum follows the National Education Policy 2020 guidelines, emphasizing play-based learning and multilingual education.
              </p>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Play-based learning approach
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Activity-based curriculum
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Focus on language development
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Development of motor skills
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Social-emotional learning
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Curriculum Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Curriculum Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Language & Literacy</h3>
              <ul className="space-y-2">
                <li>Phonics and letter recognition</li>
                <li>Basic reading and writing skills</li>
                <li>Storytelling and comprehension</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Numeracy</h3>
              <ul className="space-y-2">
                <li>Number recognition and counting</li>
                <li>Basic mathematical concepts</li>
                <li>Spatial awareness</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Life Skills</h3>
              <ul className="space-y-2">
                <li>Personal hygiene and self-care</li>
                <li>Social interaction</li>
                <li>Environmental awareness</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FoundationalStage;
