import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Announcements from '../components/Announcements';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings} className="absolute inset-0 z-0">
      <div>
        <img src="/images/slider-image1.jpg" alt="Slide 1" className="w-full h-auto" />
      </div>
      <div>
        <img src="/images/slider-image2.jpg" alt="Slide 2" className="w-full h-auto" />
      </div>
      <div>
        <img src="/images/slider-image3.jpg" alt="Slide 3" className="w-full h-auto" />
      </div>
    </Slider>
  );
};

const Home = () => {
  const navigate = useNavigate();

  // Sample announcements data
  const announcementsData = [
    {
      id: 1,
      title: 'School Annual Day',
      date: '2024-12-20',
      description: 'Join us for a spectacular celebration of talent and achievements!',
      type: 'event' as const,
      emoji: '🎭'
    },
    {
      id: 2,
      title: 'Holiday Notice',
      date: '2024-12-25',
      description: 'School will remain closed for Christmas celebrations.',
      type: 'important' as const,
      emoji: '🎄'
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      date: '2024-12-18',
      description: 'Discussing student progress and future goals.',
      type: 'general' as const,
      emoji: '👨‍👩‍👧‍👦'
    },
  ];

  const features = [
    {
      title: "Academic Excellence",
      description: "Comprehensive curriculum fostering critical thinking and creativity",
      icon: "🎓",
      color: "from-blue-100 to-blue-200",
    },
    {
      title: "Sports & Activities",
      description: "Wide range of sports and extracurricular activities",
      icon: "⚽",
      color: "from-green-100 to-green-200",
    },
    {
      title: "Modern Facilities",
      description: "State-of-the-art infrastructure and learning resources",
      icon: "🏫",
      color: "from-purple-100 to-purple-200",
    },
    {
      title: "Skilled Faculty",
      description: "Experienced and dedicated teaching staff",
      icon: "👩‍🏫",
      color: "from-pink-100 to-pink-200",
    },
  ];

  const stats = [
    { value: "500+", label: "Students", icon: "👥" },
    { value: "50+", label: "Teachers", icon: "👨‍🏫" },
    { value: "30+", label: "Activities", icon: "🎨" },
    { value: "15+", label: "Years", icon: "🌟" },
  ];

  return (
    <div className="min-h-screen relative">
      <ImageSlider />
      
      {/* Hero Section with responsive classes */}
      <section className="relative min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-white overflow-hidden">
        {/* Dynamic Sky Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Sun - Responsive positioning */}
          <motion.div
            className="absolute top-[10%] right-[10%] w-20 md:w-32 lg:w-40"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: 360
            }}
            transition={{ 
              scale: { duration: 3, repeat: Infinity },
              rotate: { duration: 200, repeat: Infinity, ease: "linear" }
            }}
          >
            <div className="w-full pb-[100%] bg-yellow-300 rounded-full shadow-lg relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-orange-400 rounded-full animate-pulse" />
            </div>
          </motion.div>

          {/* Clouds - Responsive sizing */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white opacity-80"
              initial={{ 
                x: -200,
                y: 50 + (i * 40),
                scale: 0.5 + (Math.random() * 0.5)
              }}
              animate={{ 
                x: ['0vw', '100vw'],
              }}
              transition={{ 
                duration: 30 + (i * 5),
                repeat: Infinity,
                ease: "linear",
                delay: i * 2
              }}
              style={{
                top: `${10 + (i * 5)}%`,
                fontSize: `${2 + (i * 0.5)}rem`
              }}
            >
              ☁️
            </motion.div>
          ))}
        </div>

        {/* Main Content Container */}
        <div className="relative container mx-auto px-4 pt-8 pb-16">
          {/* Hero Text - Responsive typography */}
          <div className="space-y-2">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-primary-800"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to Gurukulam Global School
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Nurturing Minds, Shaping Futures
            </motion.p>

            {/* Main Content Layout */}
            <div className="relative min-h-[500px] w-full overflow-hidden">
              {/* School Building */}
              <div className="absolute left-8 bottom-8 w-[20%] max-w-[160px] z-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Attractive School Building */}
                  <div className="relative">
                    {/* Flag */}
                    <motion.div 
                      className="absolute -top-6 right-4 z-20"
                      animate={{ rotateZ: [-2, 2, -2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-1 h-8 bg-primary-700" />
                      <div className="w-6 h-4 bg-primary-500 rounded-sm" />
                    </motion.div>

                    {/* Roof */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-[110%]">
                      <div className="w-full aspect-[3/1.2] bg-primary-600 rounded-t-xl shadow-lg" />
                    </div>
                    
                    {/* Main Building */}
                    <div className="relative bg-white rounded-lg shadow-xl p-1">
                      {/* Windows Grid */}
                      <div className="grid grid-cols-2 gap-0.5 mb-1">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="aspect-square bg-gradient-to-br from-sky-100 to-sky-200 rounded-md border border-sky-300 relative overflow-hidden"
                            animate={{
                              backgroundColor: ['#BAE6FD', '#93C5FD', '#BAE6FD'],
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.2,
                              repeat: Infinity,
                            }}
                          >
                            <div className="absolute inset-[15%] bg-white/20" />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Door */}
                      <motion.div
                        className="w-1/2 aspect-[1/1.3] mx-auto bg-primary-600 rounded-t-lg relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="absolute inset-[10%] bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-md">
                          <div className="absolute inset-0 flex">
                            <div className="flex-1 border-r border-yellow-600" />
                            <div className="flex-1" />
                          </div>
                        </div>
                        {/* Door Handle */}
                        <div className="absolute right-[20%] top-1/2 w-1.5 h-1.5 bg-primary-800 rounded-full" />
                      </motion.div>
                    </div>

                    {/* Steps */}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-[60%]">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-full h-[2px] bg-gray-300 mb-[1px]"
                          style={{
                            transform: `translateY(${i * 1}px) scale(${1 - i * 0.1})`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Trees */}
                    <div className="absolute -left-3 bottom-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm" />
                      <div className="w-0.5 h-1 bg-green-800 mx-auto" />
                    </div>
                    <div className="absolute -right-3 bottom-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm" />
                      <div className="w-0.5 h-1 bg-green-800 mx-auto" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Road Pathway */}
              <div className="absolute right-0 bottom-0 w-[85%] h-full">
                <motion.div
                  className="absolute bottom-12 right-0 w-full h-[80px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {/* Road Base */}
                  <div className="absolute bottom-0 right-0 w-full h-10 bg-gray-800 rounded-l-full">
                    {/* Road Markings */}
                    <div className="absolute top-1/2 w-full h-1 flex space-x-6">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-full w-8 bg-yellow-400"
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.1,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Milestone Points */}
                  {[
                    { icon: "🎯", text: "Start", right: "75%" },
                    { icon: "📚", text: "Learn", right: "55%" },
                    { icon: "🎓", text: "Grow", right: "35%" },
                    { icon: "⭐", text: "Excel", right: "15%" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="absolute bottom-12"
                      style={{ right: item.right }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.2 }}
                      >
                        {/* Highlight Point */}
                        <motion.div
                          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary-400 rounded-full opacity-25"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.25, 0.5, 0.25],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        <div className="relative flex flex-col items-center">
                          <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center text-lg">
                            {item.icon}
                          </div>
                          <span className="mt-1 text-[10px] font-medium text-primary-700 whitespace-nowrap">
                            {item.text}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute bottom-14 right-[30%] text-lg"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🎈
                  </motion.div>
                  <motion.div
                    className="absolute bottom-16 right-[60%] text-lg"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Engaging Call-to-Action Section */}
          <div className="relative z-30 mt-8 md:mt-16">
            <div className="max-w-4xl mx-auto text-center px-4">
              <motion.p
                className="text-lg md:text-xl text-primary-600 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Begin your journey of excellence with us! 🌟
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Academics CTA */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <Link 
                    to="/academics" 
                    className="block bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-2xl p-6 shadow-lg transform transition-all duration-300"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                        📚
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold">
                        Discover Academic Excellence
                      </h3>
                      <p className="text-sm md:text-base text-white/90">
                        Explore our world-class curriculum and innovative learning approaches
                      </p>
                      <span className="inline-flex items-center text-white/90 group-hover:text-white">
                        Learn more 
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </div>
                  </Link>
                </motion.div>

                {/* Admissions CTA */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <Link 
                    to="/admissions" 
                    className="block bg-gradient-to-br from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white rounded-2xl p-6 shadow-lg transform transition-all duration-300"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                        🎓
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold">
                        Begin Your Journey
                      </h3>
                      <p className="text-sm md:text-base text-white/90">
                        Take the first step towards a bright future with us
                      </p>
                      <span className="inline-flex items-center text-white/90 group-hover:text-white">
                        Apply now 
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Additional Engagement Text */}
              <motion.div
                className="mt-8 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <p className="text-sm md:text-base text-gray-600">
                  Join our community of learners and innovators. 
                  <span className="block mt-1">
                    Where every child's potential is nurtured and dreams take flight! ✨
                  </span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-blue-100 to-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-comic font-bold text-primary-600 text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg hover:shadow-xl transition-shadow duration-300`}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ 
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-primary-600 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className="text-4xl font-bold text-primary-600 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-20 bg-gradient-to-b from-blue-100 to-white relative overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 text-9xl opacity-10"
          animate={{ 
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          📢
        </motion.div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-comic font-bold text-primary-600 text-center mb-12">
              Latest Updates
            </h2>

            <div className="bg-white rounded-2xl shadow-xl p-6 relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                📌
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                🔔
              </div>

              {/* Announcements Component */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Announcements announcements={announcementsData} />
              </motion.div>

              {/* View All Button */}
              <motion.div
                className="text-center mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/announcements"
                  className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-bold transition-colors duration-300"
                >
                  <span>View All Updates</span>
                  <span className="text-xl">→</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-b from-sky-50 to-blue-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-comic font-bold text-primary-600 text-center mb-8">
              Take a Virtual Tour
            </h2>
            <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/6DHDX1rXrjU"
                title="School Virtual Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
