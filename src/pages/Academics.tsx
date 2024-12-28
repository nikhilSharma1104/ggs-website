import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
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

const pulseAnimation = {
  animate: {
    scale: [1, 1.1, 1],
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const Academics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 text-6xl opacity-20"
        variants={floatingAnimation}
        animate="animate"
      >
        🎨
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-6xl opacity-20"
        variants={rotatingAnimation}
        animate="animate"
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-6xl opacity-20"
        variants={pulseAnimation}
        animate="animate"
      >
        🌟
      </motion.div>
      <motion.div
        className="absolute bottom-60 right-10 text-6xl opacity-20"
        variants={floatingAnimation}
        animate="animate"
      >
        📚
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
            Discover Your Learning Journey
            <motion.span 
              className="block text-3xl mt-2 text-primary-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Where Every Child Shines ✨
            </motion.span>
          </motion.h1>

          {/* Learning Journey Train */}
          <motion.div 
            className="mb-16 relative overflow-hidden bg-gradient-to-b from-sky-50 to-blue-100 p-8 rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Decorations */}
            <motion.div
              className="absolute top-10 left-10 text-6xl opacity-20"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ☁️
            </motion.div>
            <motion.div
              className="absolute top-20 right-20 text-6xl opacity-20"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ☁️
            </motion.div>
            <motion.div
              className="absolute bottom-20 left-1/4 text-6xl opacity-20"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              ☁️
            </motion.div>

            {/* Train Track with Scenery */}
            <div className="relative mb-8">
              {/* Track */}
              <div className="absolute w-full h-6 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 bottom-4 rounded-full shadow-inner z-10" />
              <div className="absolute w-full h-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 bottom-2 rounded-full z-10" />
            </div>
            
            {/* Journey Stations */}
            <div className="relative flex justify-between items-end mx-8 mb-16 z-20">
              {[
                {
                  title: "Early Explorers",
                  age: "Ages 3-8",
                  icon: "🌟",
                  color: "from-green-100 to-emerald-50",
                  features: [
                    "Play-based learning",
                    "Basic numeracy and literacy",
                    "Creative expression",
                    "Social skills development"
                  ],
                  decorations: ["🎨", "🎵", "🎮"]
                },
                {
                  title: "Young Discoverers",
                  age: "Ages 8-11",
                  icon: "🔍",
                  color: "from-blue-100 to-sky-50",
                  features: [
                    "Project-based learning",
                    "Scientific inquiry",
                    "Language proficiency",
                    "Digital literacy"
                  ],
                  decorations: ["🔬", "🌍", "💻"]
                },
                {
                  title: "Knowledge Seekers",
                  age: "Ages 11-14",
                  icon: "📚",
                  color: "from-purple-100 to-indigo-50",
                  features: [
                    "Critical thinking",
                    "Research skills",
                    "Subject specialization",
                    "Leadership development"
                  ],
                  decorations: ["🧮", "🔭", "📝"]
                },
                {
                  title: "Future Leaders",
                  age: "Ages 14-18",
                  icon: "🎓",
                  color: "from-rose-100 to-pink-50",
                  features: [
                    "Advanced academics",
                    "Career guidance",
                    "Life skills",
                    "Global perspective"
                  ],
                  decorations: ["🌏", "💼", "🎯"]
                }
              ].map((station, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Station Platform */}
                  <motion.div
                    className={`w-6 h-20 bg-gradient-to-b ${station.color} rounded-t-xl absolute bottom-0 left-1/2 -translate-x-1/2 shadow-lg z-10`}
                    whileHover={{ height: 80, width: 8 }}
                  >
                    {/* Platform Details */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg" />
                    </div>
                  </motion.div>

                  {/* Train Car */}
                  <motion.div
                    className={`w-56 h-48 bg-gradient-to-br ${station.color} p-4 rounded-2xl shadow-lg relative mb-8 cursor-pointer
                              hover:shadow-xl transition-all duration-300 border-2 border-white group`}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Train Windows */}
                    <div className="absolute -left-3 top-6 w-8 h-8 bg-white rounded-full border-4 border-gray-200" />
                    <div className="absolute -right-3 top-6 w-8 h-8 bg-white rounded-full border-4 border-gray-200" />
                    
                    {/* Train Top */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                      <div className="w-20 h-4 bg-gray-300 rounded-t-lg" />
                    </div>
                    
                    {/* Content */}
                    <div className="text-center mt-4">
                      <motion.div
                        className="text-5xl mb-3"
                        animate={{ 
                          rotate: [0, 10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {station.icon}
                      </motion.div>
                      <h3 className="font-bold text-primary-600 text-xl mb-1">{station.title}</h3>
                      <p className="text-sm text-primary-400 mb-2">{station.age}</p>

                      {/* Floating Decorations */}
                      {station.decorations.map((decoration, i) => (
                        <motion.span
                          key={i}
                          className="absolute text-2xl opacity-0 group-hover:opacity-100"
                          initial={false}
                          animate={{ 
                            y: [-20, -40],
                            x: [(i - 1) * 20, (i - 1) * 30],
                            rotate: [0, 360],
                            scale: [0, 1]
                          }}
                          transition={{ 
                            duration: 1,
                            delay: i * 0.2,
                            ease: "easeOut"
                          }}
                        >
                          {decoration}
                        </motion.span>
                      ))}
                    </div>

                    {/* Hover Content */}
                    <motion.div 
                      className="absolute inset-0 bg-white/95 rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                      initial={false}
                    >
                      <ul className="space-y-3">
                        {station.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            className="text-sm text-gray-600 flex items-start gap-2"
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <span className="text-primary-500 text-lg">•</span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Moving Train */}
            <motion.div
              className="absolute bottom-6 left-0 z-30"
              animate={{ 
                x: ['0%', '100%'],
                scale: [1, 1, 1, 1, 1.1, 1]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="flex items-center">
                <div className="w-24 h-16 bg-primary-500 rounded-r-xl relative">
                  {/* Train Front Details */}
                  <div className="absolute top-3 right-3 w-6 h-6 bg-yellow-300 rounded-full shadow-inner" />
                  <div className="absolute top-2 left-2 w-8 h-4 bg-gray-700 rounded-t-lg" />
                  <div className="absolute bottom-3 w-8 h-8 bg-gray-700 rounded-full -left-3 border-4 border-gray-600" />
                  <div className="absolute bottom-3 w-8 h-8 bg-gray-700 rounded-full right-2 border-4 border-gray-600" />
                  {/* Steam */}
                  <motion.div
                    className="absolute -top-4 left-0"
                    animate={{ y: [-10, -20], opacity: [0.8, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    💨
                  </motion.div>
                </div>
                <div className="w-6 h-3 bg-primary-600" />
              </div>
            </motion.div>
          </motion.div>

          {/* Educational Framework Section */}
          <motion.div className="mb-16 relative">
            {/* Background Decorations */}
            <motion.div 
              className="absolute -top-10 -left-10 w-20 h-20 text-4xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              🎓
            </motion.div>
            <motion.div 
              className="absolute -bottom-10 -right-10 w-20 h-20 text-4xl"
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              📝
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Modern Learning Approach */}
              <motion.div
                className="bg-gradient-to-br from-indigo-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4 mb-8">
                  <motion.div
                    className="text-4xl"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎯
                  </motion.div>
                  <h3 className="text-2xl font-comic font-bold text-primary-600">
                    Modern Learning Approach
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      title: "Holistic Development",
                      points: [
                        "Focus on cognitive, social, and emotional growth",
                        "Integration of arts, sports, and culture",
                        "Development of 21st-century skills"
                      ]
                    },
                    {
                      title: "Experiential Learning",
                      points: [
                        "Hands-on activities and projects",
                        "Real-world problem solving",
                        "Interactive learning experiences"
                      ]
                    },
                    {
                      title: "Flexible Pathways",
                      points: [
                        "Multiple entry and exit options",
                        "Choice-based credit system",
                        "Interdisciplinary approach"
                      ]
                    }
                  ].map((section, index) => (
                    <motion.div
                      key={index}
                      className="group relative"
                    >
                      <div className="bg-white/80 p-4 rounded-xl shadow-sm cursor-pointer">
                        <h4 className="font-bold text-primary-600 text-lg">{section.title}</h4>
                      </div>
                      <motion.div 
                        className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10"
                        initial={false}
                        animate={{ y: [-10, 0] }}
                        transition={{ duration: 0.2 }}
                      >
                        <ul className="space-y-2">
                          {section.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-primary-500 mt-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Innovative Curriculum */}
              <motion.div
                className="bg-gradient-to-br from-rose-50 to-orange-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4 mb-8">
                  <motion.div
                    className="text-4xl"
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📚
                  </motion.div>
                  <h3 className="text-2xl font-comic font-bold text-primary-600">
                    Innovative Curriculum
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      title: "Competency-Focused",
                      points: [
                        "Critical thinking and problem-solving",
                        "Digital and scientific literacy",
                        "Communication and collaboration"
                      ]
                    },
                    {
                      title: "Multilingual Education",
                      points: [
                        "Mother tongue/local language instruction",
                        "Three-language formula",
                        "Cultural awareness and appreciation"
                      ]
                    },
                    {
                      title: "Assessment Reform",
                      points: [
                        "Regular formative assessments",
                        "360-degree progress reports",
                        "Focus on learning outcomes"
                      ]
                    }
                  ].map((section, index) => (
                    <motion.div
                      key={index}
                      className="group relative"
                    >
                      <div className="bg-white/80 p-4 rounded-xl shadow-sm cursor-pointer">
                        <h4 className="font-bold text-primary-600 text-lg">{section.title}</h4>
                      </div>
                      <motion.div 
                        className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10"
                        initial={false}
                        animate={{ y: [-10, 0] }}
                        transition={{ duration: 0.2 }}
                      >
                        <ul className="space-y-2">
                          {section.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-primary-500 mt-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Learning Flow Section */}
          <motion.div 
            className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-comic font-bold text-primary-600 mb-8 text-center">
              Our Learning Flow 🌊
            </h2>
            <div className="relative">
              {/* Flow Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: "🌱",
                    title: "Foundation",
                    desc: "Building strong basics through play-based learning",
                    color: "from-green-100 to-emerald-50"
                  },
                  {
                    icon: "🔍",
                    title: "Exploration",
                    desc: "Discovering interests through diverse activities",
                    color: "from-blue-100 to-sky-50"
                  },
                  {
                    icon: "🎯",
                    title: "Mastery",
                    desc: "Developing expertise in chosen areas",
                    color: "from-purple-100 to-indigo-50"
                  },
                  {
                    icon: "🚀",
                    title: "Excellence",
                    desc: "Achieving personal and academic goals",
                    color: "from-rose-100 to-pink-50"
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 bg-gradient-to-br ${step.color} rounded-xl shadow-md relative z-10`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <motion.div 
                      className="text-4xl mb-4"
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-primary-600 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Connecting Lines (visible on md and larger screens) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary-200 -z-10 transform -translate-y-1/2" />
            </div>
          </motion.div>

          {/* Did You Know Section */}
          <motion.div 
            className="mb-16 bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.div
                className="text-4xl"
                animate={{ 
                  rotate: [0, 15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💡
              </motion.div>
              <h2 className="text-3xl font-comic font-bold text-primary-600">Did You Know?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  fact: "Our students spend 40% of their learning time in hands-on activities",
                  icon: "🔨"
                },
                {
                  fact: "We offer 15+ different co-curricular activities for holistic development",
                  icon: "🎨"
                },
                {
                  fact: "Our students participate in 5 major projects every academic year",
                  icon: "📊"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div 
                    className="text-3xl mb-4"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {item.icon}
                  </motion.div>
                  <p className="text-gray-700 font-medium">{item.fact}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Development Section */}
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
                { icon: "💻", skill: "Digital Literacy", desc: "Coding, AI & Technology" },
                { icon: "🤝", skill: "Collaboration", desc: "Teamwork & Leadership" },
                { icon: "🌱", skill: "Sustainability", desc: "Environmental Care" },
                { icon: "🎯", skill: "Critical Thinking", desc: "Problem Solving" },
                { icon: "🗣️", skill: "Communication", desc: "Expression & Presentation" },
                { icon: "🎨", skill: "Creativity", desc: "Innovation & Design" },
                { icon: "🌍", skill: "Global Awareness", desc: "Cultural Understanding" },
                { icon: "🧩", skill: "Adaptability", desc: "Flexible Learning" }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-primary-50 rounded-xl text-center cursor-pointer group"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="text-3xl mb-2"
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="font-bold text-primary-600">{skill.skill}</h3>
                  <p className="text-sm text-primary-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {skill.desc}
                  </p>
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
