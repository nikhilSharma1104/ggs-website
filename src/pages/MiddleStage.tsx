import React from 'react';
import { motion } from 'framer-motion';
import GradientBackground from '../components/GradientBackground';

const MiddleStage: React.FC = () => {
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
            Middle Stage
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Developing critical thinking and advanced learning capabilities
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Stage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Stage Overview</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                The Middle Stage (Classes 6-8) focuses on developing advanced academic skills, critical thinking, and subject specialization. Students are encouraged to explore their interests while building a strong foundation in core subjects.
              </p>
              <p>
                Our curriculum integrates technology, practical learning, and real-world applications to prepare students for higher education.
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
            <h2 className="text-3xl font-bold text-white mb-6">Educational Approach</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Subject specialization
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Research-based learning
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Technology integration
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2">•</span>
                Practical applications
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Academic Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Academic Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Core Subjects</h3>
              <ul className="space-y-2">
                <li>Advanced Mathematics</li>
                <li>Sciences (Physics, Chemistry, Biology)</li>
                <li>Languages (English, Hindi, Third Language)</li>
                <li>Social Sciences</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Special Programs</h3>
              <ul className="space-y-2">
                <li>Computer Science & Coding</li>
                <li>Foreign Language Classes</li>
                <li>Environmental Studies</li>
                <li>Financial Literacy</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Skill Development</h3>
              <ul className="space-y-2">
                <li>Critical Thinking</li>
                <li>Research Skills</li>
                <li>Digital Literacy</li>
                <li>Communication Skills</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Extra-Curricular Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Extra-Curricular Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Sports</h3>
              <ul className="space-y-2">
                <li>Team Sports</li>
                <li>Individual Sports</li>
                <li>Fitness Training</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Arts & Culture</h3>
              <ul className="space-y-2">
                <li>Visual Arts</li>
                <li>Performing Arts</li>
                <li>Cultural Activities</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Clubs</h3>
              <ul className="space-y-2">
                <li>Science Club</li>
                <li>Coding Club</li>
                <li>Literary Club</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Leadership</h3>
              <ul className="space-y-2">
                <li>Student Council</li>
                <li>Community Service</li>
                <li>Mentorship Programs</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Assessment & Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Assessment & Growth</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Continuous Evaluation</h3>
              <ul className="space-y-2">
                <li>Regular Assessments</li>
                <li>Project Evaluation</li>
                <li>Performance Analysis</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Personal Growth</h3>
              <ul className="space-y-2">
                <li>Career Guidance</li>
                <li>Personality Development</li>
                <li>Life Skills Training</li>
              </ul>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Parent Partnership</h3>
              <ul className="space-y-2">
                <li>Regular PTMs</li>
                <li>Progress Reports</li>
                <li>Counseling Sessions</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MiddleStage;
