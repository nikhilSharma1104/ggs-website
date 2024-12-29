import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import YouTube from 'react-youtube';

interface FloatingElementProps {
  emoji: string;
  className?: string;
  delay?: number;
}

interface BouncingEmojiProps {
  emoji: string;
  delay?: number;
  className?: string;
}

interface RainbowTextProps {
  children: string;
  className?: string;
}

interface FunFact {
  emoji: string;
  title: string;
  description: string;
}

interface FunFactCardProps {
  fact: FunFact;
  index: number;
}

interface Activity {
  emoji: string;
  title: string;
  description: string;
  color: string;
}

interface ActivityCardProps {
  activity: {
    emoji: string;
    title: string;
    description: string;
  };
  index: number;
}

interface SectionProps {
  title: string;
  subtitle: string;
  description: string;
  className?: string;
  children: React.ReactNode;
}

interface HeroSectionProps {
  onOpenVideo: () => void;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, description, className, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      className={`relative py-20 overflow-hidden ${className}`}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-secondary-500/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
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
        className="container mx-auto px-4 relative"
        style={{ y, opacity }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            whileHover={{ scale: 1.05 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-xl text-white/80"
            whileHover={{ scale: 1.05 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
        
        {children}
      </motion.div>
    </motion.section>
  );
};

const BouncingEmoji: React.FC<BouncingEmojiProps> = ({ emoji, delay = 0, className = "" }) => (
  <motion.div
    className={`text-4xl ${className}`}
    animate={{
      y: [-10, 10],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      delay,
    }}
  >
    {emoji}
  </motion.div>
);

const FloatingElement: React.FC<FloatingElementProps> = ({ emoji, className, delay = 0 }) => (
  <motion.div
    className={`absolute text-6xl ${className}`}
    animate={{
      y: [-20, 20],
      x: [-20, 20],
      rotate: [0, 360],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      delay,
    }}
  >
    {emoji}
  </motion.div>
);

const RainbowText: React.FC<RainbowTextProps> = ({ children, className = "" }) => {
  const colors = ["text-red-500", "text-orange-500", "text-yellow-500", "text-green-500", "text-blue-500", "text-purple-500"];
  return (
    <span className="inline-flex">
      {children.split("").map((letter: string, i: number) => (
        <motion.span
          key={i}
          className={`${colors[i % colors.length]} ${className}`}
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
};

const Cloud: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      x: [0, 100, 0],
      y: [-5, 5, -5],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <div className="text-6xl">☁️</div>
  </motion.div>
);

const Bird: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      x: [-100, window.innerWidth + 100],
      y: [0, -20, 0, -10, 0],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <div className="text-3xl">🦅</div>
  </motion.div>
);

const Butterfly: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      x: [-50, 50],
      y: [-30, 30],
      rotate: [-10, 10],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    <div className="text-2xl">🦋</div>
  </motion.div>
);

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVideo }) => {
  return (
    <motion.div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-secondary-500/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
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

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-secondary-500">Gurukulam</span> Global School
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Nurturing Minds, Shaping Futures, Building Tomorrow's Leaders
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/academics">
                <motion.button
                  className="px-8 py-4 bg-secondary-500 text-white rounded-full font-semibold
                           hover:bg-secondary-600 transition-colors duration-300
                           shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Now
                </motion.button>
              </Link>
              <Link to="/admissions">
                <motion.button
                  className="px-8 py-4 bg-primary-500 text-white rounded-full font-semibold
                           hover:bg-primary-600 transition-colors duration-300
                           border-2 border-white/20 hover:border-white/30
                           shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now 🎓
                </motion.button>
              </Link>
              <motion.button
                onClick={onOpenVideo}
                className="px-8 py-4 bg-primary-500 text-white rounded-full font-semibold
                         hover:bg-primary-600 transition-colors duration-300
                         border-2 border-white/20 hover:border-white/30
                         shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Virtual Tour 🎥
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative z-10 bg-gradient-to-br from-secondary-500/20 to-primary-500/20
                         rounded-2xl p-8 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🎓", title: "Academic Excellence" },
                  { icon: "🌟", title: "Holistic Growth" },
                  { icon: "🌍", title: "Global Vision" },
                  { icon: "🎨", title: "Creative Expression" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 p-4 rounded-xl text-center"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <motion.div
                      className="text-4xl mb-2"
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
                      {item.icon}
                    </motion.div>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Decorative Circles */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-500/20 rounded-full blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.1, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FunFactCard: React.FC<FunFactCardProps> = ({ fact, index }) => (
  <motion.div
    className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 border border-primary-700/30"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
  >
    <BouncingEmoji emoji={fact.emoji} className="mb-4" />
    <h3 className="text-xl font-bold mb-2 text-white">{fact.title}</h3>
    <p className="text-white/80">{fact.description}</p>
  </motion.div>
);

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="p-8 rounded-3xl bg-primary-800/50 shadow-lg relative overflow-hidden border border-primary-700/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -10 }}
    >
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-secondary-500/10 rounded-full -translate-x-16 -translate-y-16"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <BouncingEmoji emoji={activity.emoji} className="mb-4" />
      <motion.h3
        className="text-xl font-bold mb-2 text-white"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {activity.title}
      </motion.h3>
      <motion.p
        className="text-white/80"
        animate={{ opacity: isHovered ? 1 : 0.8 }}
      >
        {activity.description}
      </motion.p>

      {/* Hover Info */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 bg-primary-900/90 p-6 flex flex-col justify-center items-center backdrop-blur-sm"
          >
            <motion.div
              className="text-4xl mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {activity.emoji}
            </motion.div>
            <h4 className="text-xl font-bold text-white mb-2">{activity.title}</h4>
            <p className="text-white/90 text-center">{activity.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TestimonialCard: React.FC<{ name: string; role: string; quote: string }> = ({ name, role, quote }) => (
  <motion.div
    className="bg-primary-800/50 p-6 rounded-xl relative group overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-secondary-500/10 to-transparent"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 1 }}
    />
    <motion.div
      className="text-4xl text-secondary-500 mb-4"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      "
    </motion.div>
    <motion.p
      className="text-white/90 mb-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {quote}
    </motion.p>
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="text-white font-bold">{name}</div>
      <div className="text-white/70 text-sm">{role}</div>
    </motion.div>
    <motion.div
      className="absolute bottom-0 right-0 w-20 h-20 bg-secondary-500/10 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </motion.div>
);

const Home: React.FC = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const funFacts: FunFact[] = [
    { emoji: "🎯", title: "Modern Education", description: "Innovative teaching methods with traditional values" },
    { emoji: "🌟", title: "Growing Community", description: "400+ students and growing since 2022" },
    { emoji: "🚀", title: "Digital Learning", description: "Smart classrooms and technology integration" },
    { emoji: "🌍", title: "Holistic Development", description: "Focus on academic and personal growth" },
  ];

  const activities = [
    { emoji: "🎨", title: "Creative Arts", description: "Nurturing artistic talents and creative expression" },
    { emoji: "🏃", title: "Sports & Fitness", description: "Promoting physical fitness and sportsmanship" },
    { emoji: "🌱", title: "Environmental Club", description: "Fostering environmental awareness and sustainability" },
  ];

  const features = [
    { emoji: "🏫", title: "Modern Campus", description: "New facilities with latest amenities" },
    { emoji: "👩‍🏫", title: "Expert Faculty", description: "Dedicated team of 20+ experienced teachers" },
    { emoji: "📚", title: "Quality Education", description: "95% success rate in academics" },
  ];

  const highlights = [
    { emoji: "👥", title: "Student Life", description: "Vibrant and engaging campus community" },
    { emoji: "🤝", title: "Parent Partnership", description: "Strong collaboration with parents" },
    { emoji: "👑", title: "Leadership Development", description: "Nurturing future leaders" },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-primary-900">
      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <YouTube
                videoId="6DHDX1rXrjU"
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    autoplay: 1,
                    start: 7,
                  },
                }}
                className="w-full h-full"
              />
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 text-white hover:text-secondary-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <HeroSection onOpenVideo={() => setShowVideoModal(true)} />

      {/* Why Choose Us - Animated Counter Section */}
      <section className="py-16 bg-secondary-500/10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              className="p-6 rounded-xl bg-primary-800/50"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-secondary-400 mb-2">2022</div>
              <div className="text-white/90">Established</div>
            </motion.div>
            <motion.div
              className="p-6 rounded-xl bg-primary-800/50"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-secondary-400 mb-2">95%</div>
              <div className="text-white/90">Success Rate</div>
            </motion.div>
            <motion.div
              className="p-6 rounded-xl bg-primary-800/50"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl font-bold text-secondary-400 mb-2">20+</div>
              <div className="text-white/90">Expert Teachers</div>
            </motion.div>
            <motion.div
              className="p-6 rounded-xl bg-primary-800/50"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-4xl font-bold text-secondary-400 mb-2">400+</div>
              <div className="text-white/90">Happy Students</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <Section
        title="Core Values"
        subtitle="Building Strong Foundations"
        description="Our core values shape every aspect of education, fostering intellectual curiosity, moral integrity, and global awareness in our students."
        className="bg-primary-800/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {funFacts.map((fact, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <BouncingEmoji emoji={fact.emoji} className="mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">{fact.title}</h3>
              <p className="text-white/80">{fact.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Our Activities */}
      <Section
        title="Our Activities"
        subtitle="Discover the vibrant life at Gurukulam"
        description="Engage in a wide range of activities that foster growth and development."
        className="bg-primary-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} index={index} />
          ))}
        </div>
      </Section>

      {/* Campus Features */}
      <Section
        title="Campus Features"
        subtitle="State-of-the-art facilities for comprehensive development"
        description="Our campus is equipped with modern amenities to support various aspects of student growth."
        className="bg-primary-800/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ActivityCard key={index} activity={feature} index={index} />
          ))}
        </div>
      </Section>

      {/* Student Life Gallery */}
      <Section
        title="Student Life"
        subtitle="Moments That Define Us"
        description="Experience the vibrant campus life at our school, where every day brings new opportunities for learning, growth, and achievement."
        className="bg-primary-700/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="relative h-64 rounded-xl overflow-hidden group"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/images/academic.jpg" alt="Academic Life" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-75" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Academic Life</h3>
              <p className="text-white/90">Engaging learning experiences</p>
            </div>
          </motion.div>
          <motion.div
            className="relative h-64 rounded-xl overflow-hidden group"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/images/sports.jpg" alt="Sports" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-75" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Sports</h3>
              <p className="text-white/90">Building champions</p>
            </div>
          </motion.div>
          <motion.div
            className="relative h-64 rounded-xl overflow-hidden group"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/images/arts.jpg" alt="Arts & Culture" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-75" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Arts & Culture</h3>
              <p className="text-white/90">Nurturing creativity</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        title="What Parents Say"
        subtitle="Trusted by Families"
        description="Hear from our school community about their experiences and the positive impact our education has had on their children's development."
        className="bg-primary-800/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Priya Sharma"
            role="Parent"
            quote="The school's holistic approach to education has transformed my child's learning experience. The teachers are dedicated and caring."
          />
          <TestimonialCard
            name="Rajesh Kumar"
            role="Parent"
            quote="Outstanding academic program combined with excellent extracurricular activities. My children have flourished here."
          />
          <TestimonialCard
            name="Anita Patel"
            role="Parent"
            quote="The school's focus on values and character development sets it apart. We're extremely happy with our decision."
          />
        </div>
      </Section>

      {/* Student Life */}
      <Section
        title="Student Life"
        subtitle="Experience the Gurukulam difference"
        description="Life at Gurukulam is a perfect blend of academics, activities, and personal growth."
        className="bg-primary-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <ActivityCard key={index} activity={highlight} index={index} />
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <section className="py-20 bg-secondary-500 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Begin Your Journey With Us 🎓
            </motion.h2>
            <motion.p className="text-xl mb-8 text-white/90">
              Join our community of learners and future leaders
            </motion.p>
            <motion.div
              className="flex justify-center space-x-6"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to="/admissions"
                className="bg-white text-secondary-500 px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all duration-300 shadow-lg transform hover:rotate-2"
              >
                Apply Now 📝
              </Link>
              <Link
                to="/contact"
                className="bg-secondary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-secondary-700 transition-all duration-300 shadow-lg transform hover:-rotate-2"
              >
                Schedule a Visit 🏫
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
