import React from 'react';
import { motion } from 'framer-motion';
import GradientBackground from '../components/GradientBackground';

const PreparatoryStage: React.FC = () => {
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
            Preparatory Stage
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Preparing students for advanced learning through structured education
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Academic Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Academic Focus</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                The Preparatory Stage (Classes 3-5) builds upon the foundational stage, introducing more structured learning while maintaining an engaging and interactive approach.
              </p>
              <p>
                Students develop critical thinking skills, subject expertise, and confidence through our comprehensive curriculum.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Learning Approach</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Interactive learning methods
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Project-based activities
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Experiential learning
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Regular assessments
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Core Subjects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Core Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Languages</h3>
              <ul className="space-y-2">
                <li>English</li>
                <li>Hindi</li>
                <li>Regional Language</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Mathematics</h3>
              <ul className="space-y-2">
                <li>Number System</li>
                <li>Basic Algebra</li>
                <li>Geometry</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Science</h3>
              <ul className="space-y-2">
                <li>Basic Sciences</li>
                <li>Environmental Studies</li>
                <li>Practical Activities</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Social Studies</h3>
              <ul className="space-y-2">
                <li>History</li>
                <li>Geography</li>
                <li>Civics</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Co-Curricular Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Co-Curricular Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Sports</h3>
              <ul className="space-y-2">
                <li>Physical Education</li>
                <li>Team Sports</li>
                <li>Yoga</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Arts</h3>
              <ul className="space-y-2">
                <li>Visual Arts</li>
                <li>Performing Arts</li>
                <li>Music</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Life Skills</h3>
              <ul className="space-y-2">
                <li>Leadership Activities</li>
                <li>Group Projects</li>
                <li>Community Service</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreparatoryStage;
