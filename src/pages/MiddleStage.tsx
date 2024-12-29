import React from 'react';
import { motion } from 'framer-motion';

const MiddleStage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const glowVariants = {
    glow: {
      boxShadow: [
        "0 0 10px rgba(255, 255, 255, 0.3)",
        "0 0 20px rgba(255, 255, 255, 0.5)",
        "0 0 10px rgba(255, 255, 255, 0.3)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div 
          variants={cardVariants}
          className="text-center mb-12 relative z-10"
        >
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Middle Stage
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-secondary-500 mx-auto mb-4"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="text-xl text-white/80">Ages 11-13 years (Grades 6-8)</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl p-6 border border-primary-700 shadow-xl transform transition-all duration-300"
          >
            <motion.h2 
              className="text-2xl font-semibold text-white mb-4"
              variants={floatingVariants}
              animate="float"
            >
              Curriculum Framework
            </motion.h2>
            <ul className="space-y-3 text-white/80">
              {["Subject-oriented learning with integrated approach",
                "Focus on experiential and discovery-based learning",
                "Integration of art, sports, and vocational education",
                "Development of critical thinking and problem-solving skills"].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-secondary-500 mr-2">•</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl p-6 border border-primary-700 shadow-xl transform transition-all duration-300"
          >
            <motion.h2 
              className="text-2xl font-semibold text-white mb-4"
              variants={floatingVariants}
              animate="float"
            >
              Core Subjects
            </motion.h2>
            <ul className="space-y-3 text-white/80">
              {["Languages (Hindi, English, and Third Language)",
                "Mathematics with emphasis on practical applications",
                "Science and Technology with hands-on experiments",
                "Social Science integrating history, geography, and civics"].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-secondary-500 mr-2">•</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl p-8 mb-12 border border-primary-700 shadow-xl transform transition-all duration-300"
        >
          <motion.h2 
            className="text-2xl font-semibold text-white mb-6"
            variants={floatingVariants}
            animate="float"
          >
            Teaching-Learning Approach
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <motion.h3 
                className="text-xl font-medium text-white mb-3"
                variants={glowVariants}
                animate="glow"
              >
                Pedagogical Strategies
              </motion.h3>
              <ul className="space-y-3 text-white/80">
                {["Project-based and inquiry-based learning",
                  "Integration of technology in learning",
                  "Collaborative learning and group projects",
                  "Field trips and experiential learning opportunities"].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-secondary-500 mr-2">•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <motion.h3 
                className="text-xl font-medium text-white mb-3"
                variants={glowVariants}
                animate="glow"
              >
                Assessment Framework
              </motion.h3>
              <ul className="space-y-3 text-white/80">
                {["Continuous and Comprehensive Evaluation (CCE)",
                  "Project work and practical assessments",
                  "Regular formative and summative assessments",
                  "Portfolio development and self-assessment"].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-secondary-500 mr-2">•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl p-8 border border-primary-700 shadow-xl transform transition-all duration-300"
        >
          <motion.h2 
            className="text-2xl font-semibold text-white mb-6"
            variants={floatingVariants}
            animate="float"
          >
            Skill Development
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Academic Skills",
                items: ["Advanced reading and writing", "Mathematical reasoning", "Scientific inquiry and analysis"]
              },
              {
                title: "21st Century Skills",
                items: ["Critical thinking and problem-solving", "Digital literacy and communication", "Collaboration and leadership"]
              },
              {
                title: "Life Skills",
                items: ["Environmental consciousness", "Health and physical education", "Art and cultural appreciation"]
              }
            ].map((section, sectionIndex) => (
              <motion.div 
                key={sectionIndex}
                className="bg-gradient-to-br from-primary-700/50 to-primary-800/50 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.h3 
                  className="text-lg font-medium text-white mb-3"
                  variants={glowVariants}
                  animate="glow"
                >
                  {section.title}
                </motion.h3>
                <ul className="space-y-2 text-white/80">
                  {section.items.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (sectionIndex * 0.2) + (index * 0.1) }}
                      className="flex items-start"
                    >
                      <span className="text-secondary-500 mr-2">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MiddleStage;
