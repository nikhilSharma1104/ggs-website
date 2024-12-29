import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const stats = [
    { icon: "👨‍🏫", value: "20+", label: "Expert Teachers", description: "Highly qualified educators dedicated to excellence" },
    { icon: "👨‍🎓", value: "400+", label: "Students", description: "Growing student community since 2022" },
    { icon: "📈", value: "95%", label: "Success Rate", description: "Exceptional academic achievement" },
    { icon: "🌟", value: "2022", label: "Established", description: "A young and dynamic institution" },
  ];

  return (
    <div className="bg-primary-900 min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <motion.section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background with Enhanced Particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: "blur(1px)",
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 30, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content with Enhanced Typography */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-white mb-6 relative inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              About{" "}
              <span className="text-secondary-500 relative">
                Gurukulam
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-secondary-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto font-light"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Where tradition meets innovation in education
            </motion.p>
          </motion.div>

          {/* Stats Section with Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/50 p-6 rounded-xl backdrop-blur-sm border border-white/10
                         hover:bg-primary-700/50 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="text-secondary-500 mb-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className="text-4xl font-bold text-white mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-lg text-white/80 font-medium">{stat.label}</div>
                <div className="text-sm text-white/60 mt-2">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-1/4 right-10 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.section>

      {/* Vision & Mission with Interactive Cards */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Our Vision",
                icon: "🔭",
                content: [
                  "To be a globally recognized institution of academic excellence",
                  "Nurturing future leaders with strong ethical values",
                  "Creating innovative learning environments",
                  "Fostering research and intellectual curiosity"
                ]
              },
              {
                title: "Our Mission",
                icon: "🎯",
                content: [
                  "Providing world-class education with Indian values",
                  "Developing critical thinking and problem-solving skills",
                  "Building character through experiential learning",
                  "Creating responsible global citizens"
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/50 p-8 rounded-2xl relative overflow-hidden group"
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-500/10 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative z-10">
                  <motion.div
                    className="text-5xl mb-6"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {item.icon}
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-6">{item.title}</h2>
                  <div className="space-y-4">
                    {item.content.map((point, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-secondary-500 rounded-full" />
                        <p className="text-white/80">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Core Values Section */}
      <section className="py-20 bg-primary-800/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-5xl font-bold text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: "🎯", 
                title: "Excellence", 
                description: "Pursuing the highest standards in academic and personal development",
                details: ["Rigorous academic programs", "Continuous improvement", "Quality assessment"]
              },
              { 
                icon: "🤝", 
                title: "Integrity", 
                description: "Building character through ethical practices and moral values",
                details: ["Honest communication", "Ethical behavior", "Moral leadership"]
              },
              { 
                icon: "🌱", 
                title: "Growth", 
                description: "Fostering continuous learning and personal development",
                details: ["Skill development", "Personal growth", "Lifelong learning"]
              },
              { 
                icon: "🌍", 
                title: "Global Mindset", 
                description: "Embracing diversity and international perspectives",
                details: ["Cultural awareness", "Global citizenship", "International exposure"]
              },
              { 
                icon: "💡", 
                title: "Innovation", 
                description: "Encouraging creative thinking and problem-solving",
                details: ["Creative solutions", "Modern technology", "Research mindset"]
              },
              { 
                icon: "❤️", 
                title: "Compassion", 
                description: "Nurturing empathy and care for others",
                details: ["Community service", "Emotional intelligence", "Social responsibility"]
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className={`bg-primary-800/50 p-6 rounded-xl relative overflow-hidden group cursor-pointer
                         ${selectedValue === index ? 'ring-2 ring-secondary-500' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedValue(selectedValue === index ? null : index)}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-white/80 mb-4">{value.description}</p>
                
                <AnimatePresence>
                  {selectedValue === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 mt-4 border-t border-white/10 pt-4">
                        {value.details.map((detail, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-white/70 flex items-center space-x-2"
                          >
                            <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full" />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className="absolute inset-0 bg-secondary-500/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-5xl font-bold text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Journey of Excellence
          </motion.h2>
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-secondary-500/30" />

            {[
              { 
                year: "2022", 
                title: "Foundation", 
                description: "Establishment of Gurukulam Global School with a vision for excellence in education",
                achievements: ["Started with first batch of students", "Modern campus facilities", "Innovative teaching methodology"]
              },
              { 
                year: "2023", 
                title: "Growth", 
                description: "Rapid expansion and enhancement of facilities",
                achievements: ["Growing student community", "Enhanced infrastructure", "Enriched curriculum"]
              },
              { 
                year: "2024", 
                title: "Innovation", 
                description: "Integration of modern learning methods and technology",
                achievements: ["Smart classrooms", "Digital learning integration", "400+ student strength"]
              }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                className="flex gap-8 mb-16 relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-32 flex-shrink-0 text-secondary-500 font-bold text-3xl relative">
                  {milestone.year}
                  <motion.div
                    className="absolute right-0 top-3 w-4 h-4 bg-secondary-500 rounded-full z-10"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="flex-grow bg-primary-800/50 p-6 rounded-xl hover:bg-primary-700/50 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-3">{milestone.title}</h3>
                  <p className="text-white/80 mb-4">{milestone.description}</p>
                  <ul className="space-y-2">
                    {milestone.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="text-white/70 flex items-center space-x-2"
                      >
                        <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
