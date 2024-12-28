import React from 'react';
import { motion } from 'framer-motion';

interface Event {
  title: string;
  date: string;
  description: string;
  category: string;
  icon: string;
}

const Events: React.FC = () => {
  const events: Event[] = [
    {
      title: "Annual Sports Day",
      date: "January 15, 2024",
      description: "A day filled with athletic competitions, team sports, and celebration of physical fitness.",
      category: "Sports",
      icon: "🏆"
    },
    {
      title: "Science Exhibition",
      date: "February 5, 2024",
      description: "Students showcase their innovative science projects and experiments.",
      category: "Academic",
      icon: "🔬"
    },
    {
      title: "Cultural Festival",
      date: "March 10, 2024",
      description: "A vibrant celebration of art, music, dance, and cultural performances.",
      category: "Cultural",
      icon: "🎭"
    },
    {
      title: "Parent-Teacher Meet",
      date: "April 2, 2024",
      description: "Interactive session between parents and teachers to discuss student progress.",
      category: "Academic",
      icon: "👥"
    },
    {
      title: "Environment Day",
      date: "June 5, 2024",
      description: "Activities and workshops focused on environmental awareness and conservation.",
      category: "Social",
      icon: "🌱"
    },
    {
      title: "Literary Week",
      date: "July 15-20, 2024",
      description: "A week dedicated to literature, featuring book fairs, poetry competitions, and storytelling sessions.",
      category: "Academic",
      icon: "📚"
    }
  ];

  const categories = ["All", "Sports", "Academic", "Cultural", "Social"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredEvents = events.filter(event => 
    selectedCategory === "All" ? true : event.category === selectedCategory
  );

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
              {["🎭", "🎨", "🎵", "🏆", "📚", "🎪"][i % 6]}
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
              School Events
              <motion.div
                className="h-1 w-24 bg-secondary-500 mx-auto mt-4"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Join us in celebrating learning, creativity, and achievement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-white transition-colors
                  ${selectedCategory === category 
                    ? 'bg-secondary-500' 
                    : 'bg-primary-800/50 hover:bg-primary-700/50'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/50 p-6 rounded-xl backdrop-blur-sm border border-white/10
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
                  {event.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-secondary-500 mb-2">{event.date}</p>
                <p className="text-white/80 mb-4">{event.description}</p>
                <span className="inline-block px-3 py-1 bg-primary-700/50 text-white/70 rounded-full text-sm">
                  {event.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-20 bg-primary-800/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Academic Calendar</h2>
            <p className="text-white/80 mb-8">
              Stay updated with all our upcoming events and important dates
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary-500 text-white px-8 py-3 rounded-full hover:bg-secondary-600 transition-colors"
            >
              View Calendar
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;
