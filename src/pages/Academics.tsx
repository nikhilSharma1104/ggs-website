import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn, slideInLeft, slideInRight, staggerContainer, staggerItem } from '../components/animations';

interface StageCardProps {
  title: string;
  description: string;
  link: string;
  emoji: string;
  index: number;
}

const StageCard: React.FC<StageCardProps> = ({ title, description, link, emoji, index }) => (
  <motion.div
    variants={staggerItem}
    className="relative group"
  >
    <Link to={link}>
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
        <motion.div
          className="absolute bottom-4 right-4 text-secondary-500"
          whileHover={{ x: 5 }}
        >
          →
        </motion.div>
      </motion.div>
    </Link>
  </motion.div>
);

const Academics: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stages = [
    {
      title: "Foundational Stage",
      description: "Ages 3-8 years (Nursery to Class 2): Building strong foundations through play-based learning and foundational literacy.",
      link: "/academics/foundational-stage",
      emoji: "🌱"
    },
    {
      title: "Preparatory Stage",
      description: "Ages 8-11 years (Classes 3-5): Transitioning to more formal education while maintaining experiential learning.",
      link: "/academics/preparatory-stage",
      emoji: "📚"
    },
    {
      title: "Middle Stage",
      description: "Ages 11-14 years (Classes 6-8): Developing critical thinking and subject expertise through integrated learning.",
      link: "/academics/middle-stage",
      emoji: "🔬"
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
              Academic Excellence
              <motion.div
                className="h-1 w-24 bg-secondary-500 mx-auto mt-4"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Nurturing young minds through innovative teaching methods and comprehensive curriculum
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stages Section */}
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
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {stages.map((stage, index) => (
              <StageCard
                key={stage.title}
                {...stage}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Our Academic Features
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Discover what makes our academic program unique and effective
              </p>
            </div>
          </FadeIn>

          <motion.div 
            variants={slideInLeft}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎯
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">
                Personalized Learning
              </h3>
              <p className="text-white/80">
                Tailored education plans that adapt to each student's unique learning style and pace
              </p>
            </motion.div>

            <motion.div 
              variants={slideInRight}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌟
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">
                Holistic Development
              </h3>
              <p className="text-white/80">
                Focus on academic, social, emotional, and physical growth of every student
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Academics;
