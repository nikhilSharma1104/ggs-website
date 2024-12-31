import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import StudentLifeSection from '../components/StudentLifeSection';
import SEO from '../components/SEO';

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, description, children, className = '' }) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">{title}</h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

const HeroSection: React.FC<{ onOpenVideo: () => void }> = ({ onOpenVideo }) => {
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

const ActivityCard: React.FC<{ activity: { emoji: string; title: string; description: string; }; index: number }> = ({ activity, index }) => {
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
        {activity.emoji}
      </motion.div>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
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
  const [currentVideoId] = useState('YOUR_VIDEO_ID');
  const videoRef = useRef<any>(null);

  const sections = [
    'hero',
    'why-choose-us',
    'core-values',
    'activities',
    'features',
    'student-life',
    'testimonials'
  ];

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

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
    <div className="min-h-screen bg-primary-900">
      <SEO 
        title="Gurukulam Global School - Excellence in Education"
        description="Welcome to Gurukulam Global School, where we nurture young minds and build future leaders through holistic education and values."
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showVideoModal ? 1 : 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        onClick={() => setShowVideoModal(false)}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: showVideoModal ? 1 : 0.5, opacity: showVideoModal ? 1 : 0 }}
          className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <YouTube
            videoId={currentVideoId}
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

      <section id="hero" className={`min-h-screen ${activeSection === 'hero' ? 'active' : ''}`}>
        <HeroSection onOpenVideo={() => setShowVideoModal(true)} />
      </section>

      <section 
        id="why-choose-us" 
        className={`py-16 bg-secondary-500/10 relative overflow-hidden ${activeSection === 'why-choose-us' ? 'active' : ''}`}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2022", label: "Established" },
              { number: "95%", label: "Success Rate" },
              { number: "20+", label: "Expert Teachers" },
              { number: "400+", label: "Happy Students" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-primary-800/50"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-4xl font-bold text-secondary-400 mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="core-values" 
        className={`py-16 bg-primary-800/50 ${activeSection === 'core-values' ? 'active' : ''}`}
      >
        <Section
          title="Core Values"
          description="Our core values shape every aspect of education, fostering intellectual curiosity, moral integrity, and global awareness in our students."
          className="bg-primary-800/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { emoji: "🎯", title: "Modern Education", description: "Innovative teaching methods with traditional values" },
              { emoji: "🌟", title: "Growing Community", description: "400+ students and growing since 2022" },
              { emoji: "🚀", title: "Digital Learning", description: "Smart classrooms and technology integration" },
              { emoji: "🌍", title: "Holistic Development", description: "Focus on academic and personal growth" },
            ].map((fact, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
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
                  {fact.emoji}
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-white">{fact.title}</h3>
                <p className="text-white/80">{fact.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      <section 
        id="activities" 
        className={`py-16 bg-primary-900 ${activeSection === 'activities' ? 'active' : ''}`}
      >
        <Section
          title="Student Activities"
          description="Engaging activities that foster holistic development and lifelong learning."
          className="bg-primary-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} index={index} />
            ))}
          </div>
        </Section>
      </section>

      <section 
        id="features" 
        className={`py-16 bg-primary-800/50 ${activeSection === 'features' ? 'active' : ''}`}
      >
        <Section
          title="Campus Features"
          description="Our campus is equipped with modern amenities to support various aspects of student growth."
          className="bg-primary-800/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ActivityCard key={index} activity={feature} index={index} />
            ))}
          </div>
        </Section>
      </section>

      <section 
        id="student-life" 
        className={`py-16 bg-primary-700/50 ${activeSection === 'student-life' ? 'active' : ''}`}
      >
        <Section
          title="Student Life"
          description="Experience the vibrant campus life at our school, where every day brings new opportunities for learning, growth, and achievement."
          className="bg-primary-700/50"
        >
          <StudentLifeSection />
        </Section>
      </section>

      <section 
        id="testimonials" 
        className={`py-16 bg-primary-800/50 ${activeSection === 'testimonials' ? 'active' : ''}`}
      >
        <Section
          title="What Parents Say"
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
      </section>

      <section className="py-20 bg-secondary-500 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Join Our Community?
            </h2>
            <Link
              to="/admissions"
              className="inline-block px-8 py-4 bg-white text-secondary-500 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
