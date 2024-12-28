import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn, slideInLeft, slideInRight, staggerContainer, staggerItem } from '../components/animations';

interface SubjectCardProps {
  title: string;
  description: string;
  emoji: string;
  index: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ title, description, emoji, index }) => (
  <motion.div
    variants={staggerItem}
    className="relative group"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-secondary-500/50 
                transition-all duration-300 h-full shadow-xl hover:shadow-2xl"
    >
      <motion.div
        className="text-6xl mb-4"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {emoji}
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/80">{description}</p>
    </motion.div>
  </motion.div>
);

const PreparatoryStage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const subjects = [
    {
      title: "Language & Literature",
      description: "Developing strong reading comprehension and writing skills through engaging literature and creative writing exercises.",
      emoji: "📚"
    },
    {
      title: "Mathematics",
      description: "Building problem-solving abilities and numerical fluency through interactive mathematical concepts.",
      emoji: "🔢"
    },
    {
      title: "Environmental Studies",
      description: "Exploring the natural world and understanding our environment through hands-on activities and projects.",
      emoji: "🌍"
    },
    {
      title: "Arts & Crafts",
      description: "Fostering creativity and self-expression through various artistic mediums and craft projects.",
      emoji: "🎨"
    },
    {
      title: "Physical Education",
      description: "Developing motor skills, teamwork, and healthy habits through sports and physical activities.",
      emoji: "⚽"
    },
    {
      title: "Technology",
      description: "Introduction to basic digital literacy and computational thinking through age-appropriate activities.",
      emoji: "💻"
    }
  ];

  const activities = [
    {
      title: "Project-Based Learning",
      description: "Engaging in hands-on projects that integrate multiple subjects and real-world applications.",
      emoji: "🎯"
    },
    {
      title: "Group Activities",
      description: "Developing social skills and teamwork through collaborative learning experiences.",
      emoji: "👥"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900"
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated Background Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              {["📚", "✏️", "🎨", "🔬", "🎭", "🎵"][i % 6]}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Preparatory Stage
              <motion.div
                className="h-1 w-24 bg-secondary-500 mx-auto mt-4"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Building strong foundations for lifelong learning (Ages 8-11 years)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subjects Section */}
      <section ref={ref} className="py-20 relative overflow-hidden">
        {/* Floating Decorations */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-secondary-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          className="container mx-auto px-4"
          style={{ y, opacity }}
        >
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Core Subjects
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                A comprehensive curriculum designed to develop essential skills and knowledge
              </p>
            </div>
          </FadeIn>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {subjects.map((subject, index) => (
              <SubjectCard
                key={subject.title}
                {...subject}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Activities Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Learning Activities
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Engaging activities that promote active learning and skill development
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                variants={index === 0 ? slideInLeft : slideInRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                >
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {activity.emoji}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-white/80">
                    {activity.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <Link to="/academics">
              <motion.button
                className="px-6 py-3 bg-secondary-500 text-white rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back to Academics
              </motion.button>
            </Link>
            <Link to="/middle-stage">
              <motion.button
                className="px-6 py-3 bg-primary-500 text-white rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Middle Stage →
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PreparatoryStage;
