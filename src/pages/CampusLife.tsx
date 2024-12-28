import React from 'react';
import { motion } from 'framer-motion';

interface Facility {
  title: string;
  description: string;
  icon: string;
  items: string[];
}

const CampusLife: React.FC = () => {
  const facilities: Facility[] = [
    {
      title: 'Sports Facilities',
      description: 'State-of-the-art sports facilities to nurture physical development and team spirit',
      icon: '⚽',
      items: [
        'Olympic-size Swimming Pool',
        'Indoor Sports Complex',
        'Football Ground',
        'Basketball Courts',
        'Cricket Field',
      ],
    },
    {
      title: 'Academic Facilities',
      description: 'Modern learning spaces equipped with the latest technology',
      icon: '📚',
      items: [
        'Modern Classrooms',
        'Science Laboratories',
        'Computer Labs',
        'Library & Resource Center',
        'Smart Learning Spaces',
      ],
    },
    {
      title: 'Extra-Curricular',
      description: 'Diverse spaces for artistic and creative expression',
      icon: '🎨',
      items: [
        'Music Room',
        'Dance Studio',
        'Art & Craft Center',
        'Theater Space',
        'Yoga Center',
      ],
    },
    {
      title: 'Student Life',
      description: 'Comfortable and engaging spaces for student activities',
      icon: '🎭',
      items: [
        'Student Lounge',
        'Cafeteria',
        'Meditation Garden',
        'Activity Rooms',
        'Outdoor Learning Spaces',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
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
              {["🏫", "🎨", "⚽", "🎭", "📚", "🎵"][i % 6]}
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
              Campus Life
              <motion.div
                className="h-1 w-24 bg-secondary-500 mx-auto mt-4"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Experience a vibrant and enriching environment that fosters growth and learning
            </p>
          </motion.div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Our Facilities
            <motion.div
              className="h-1 w-24 bg-secondary-500 mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1 }}
            />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/50 p-8 rounded-xl backdrop-blur-sm border border-white/10
                          hover:border-secondary-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {facility.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">{facility.title}</h3>
                <p className="text-white/80 mb-4">{facility.description}</p>
                <ul className="space-y-2">
                  {facility.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      className="text-white/70 flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + itemIndex * 0.1 }}
                    >
                      <span className="text-secondary-500">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-primary-800/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Take a Virtual Tour</h2>
            <p className="text-white/80 mb-8">
              Experience our campus facilities firsthand through our interactive virtual tour
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary-500 text-white px-8 py-3 rounded-full hover:bg-secondary-600 transition-colors"
            >
              Start Virtual Tour
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CampusLife;
