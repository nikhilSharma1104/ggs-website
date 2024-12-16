import React from 'react';
import { motion } from 'framer-motion';

// Floating animation variants
const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const rotatingAnimation = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const Academics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-16 relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 text-6xl opacity-20"
        variants={floatingAnimation}
        animate="animate"
      >
        📚
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-6xl opacity-20"
        variants={floatingAnimation}
        animate="animate"
      >
        🎨
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-6xl opacity-20"
        variants={rotatingAnimation}
        animate="animate"
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute bottom-60 right-10 text-6xl opacity-20"
        variants={floatingAnimation}
        animate="animate"
      >
        🌈
      </motion.div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl font-comic font-bold text-primary-600 mb-8 text-center relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Journey to Excellence 
            <span className="block text-3xl mt-2 text-primary-400">NEP 2020 & NCF 2024</span>
          </motion.h1>

          {/* Interactive Learning Path */}
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 transform -skew-y-3"></div>
            <motion.div 
              className="relative grid md:grid-cols-4 gap-8 p-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {[
                { icon: "🎈", title: "Play & Learn", desc: "Ages 3-8" },
                { icon: "✏️", title: "Discover", desc: "Ages 8-11" },
                { icon: "🔍", title: "Explore", desc: "Ages 11-14" },
                { icon: "🎓", title: "Excel", desc: "Ages 14-18" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="text-5xl mb-4"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-comic font-bold text-primary-600">{item.title}</h3>
                  <p className="text-primary-400">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* NEP Features with Interactive Cards */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-comic font-bold text-primary-600 mb-8 text-center">
              Learning Reimagined 🚀
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🌈",
                  title: "Multilingual Magic",
                  desc: "Learn in your mother tongue while mastering multiple languages",
                  color: "from-pink-100 to-purple-200"
                },
                {
                  icon: "🎨",
                  title: "Art Integration",
                  desc: "Express creativity through every subject",
                  color: "from-blue-100 to-green-200"
                },
                {
                  icon: "🔬",
                  title: "Experiential Learning",
                  desc: "Learn by doing, exploring, and creating",
                  color: "from-yellow-100 to-orange-200"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-br ${feature.color} p-6 rounded-2xl shadow-lg`}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="text-5xl mb-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-comic font-bold text-primary-600 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Skills Section */}
          <motion.div
            className="mb-16 bg-white p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-comic font-bold text-primary-600 mb-8 text-center">
              Skills for Tomorrow 🌟
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "💻", skill: "Coding & AI" },
                { icon: "🤝", skill: "Collaboration" },
                { icon: "🌱", skill: "Sustainability" },
                { icon: "🎯", skill: "Critical Thinking" },
                { icon: "🗣️", skill: "Communication" },
                { icon: "🎨", skill: "Creativity" },
                { icon: "🌍", skill: "Global Awareness" },
                { icon: "🧩", skill: "Problem Solving" }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-primary-50 rounded-xl text-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div 
                    className="text-3xl mb-2"
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="font-bold text-primary-600">{skill.skill}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fun Facts Carousel */}
          <motion.div
            className="bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-comic font-bold text-primary-600 mb-6 text-center">
              Did You Know? 🤔
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Our brain-friendly learning approach makes studying fun and effective! 🧠",
                "You'll learn coding and AI in exciting, hands-on projects! 🤖",
                "Every class is an adventure with art, music, and movement! 🎨"
              ].map((fact, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <p className="text-primary-600 text-center font-comic">{fact}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Academics;
