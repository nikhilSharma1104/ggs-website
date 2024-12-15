import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FloatingShape = ({ emoji, className }: { emoji: string; className: string }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <span className="text-4xl">{emoji}</span>
  </motion.div>
);

const Events = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const upcomingEvents = [
    {
      date: '2024-12-20',
      title: 'Annual Sports Day 🏃‍♂️',
      description: 'Get ready for an amazing day of sports and fun!',
      time: '9:00 AM',
      venue: 'School Ground',
      emoji: '🎯'
    },
    {
      date: '2024-12-25',
      title: 'Christmas Celebration 🎄',
      description: 'Join us for a magical Christmas celebration!',
      time: '11:00 AM',
      venue: 'School Auditorium',
      emoji: '🎅'
    },
    {
      date: '2025-01-15',
      title: 'Science Exhibition 🔬',
      description: 'Discover amazing experiments and inventions!',
      time: '10:00 AM',
      venue: 'Science Block',
      emoji: '🚀'
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-secondary-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <FloatingShape emoji="🎨" className="top-20 left-10" />
      <FloatingShape emoji="🎭" className="top-40 right-20" />
      <FloatingShape emoji="⚽" className="bottom-20 left-20" />
      <FloatingShape emoji="🎪" className="bottom-40 right-10" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-comic font-bold text-primary-600 mb-8 text-center">
            Fun Events & Activities! 🎉
          </h1>

          {/* Upcoming Events */}
          <section className="mb-16">
            <h2 className="text-3xl font-comic font-bold text-primary-500 mb-6 text-center">
              Coming Up Next! 🌟
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.title}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border-2 border-secondary-300"
                >
                  <div className="text-4xl mb-4">{event.emoji}</div>
                  <div className="text-secondary-500 font-comic font-bold mb-2">{event.date}</div>
                  <h3 className="text-xl font-comic font-bold text-primary-600 mb-2">{event.title}</h3>
                  <p className="text-gray-600 font-comic mb-4">{event.description}</p>
                  <div className="space-y-2 text-sm font-comic text-primary-500">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">⏰</span>
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">📍</span>
                      {event.venue}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Event Calendar */}
          <section className="mb-16">
            <h2 className="text-3xl font-comic font-bold text-primary-500 mb-6 text-center">
              Event Calendar 📅
            </h2>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-lg border-2 border-secondary-300"
            >
              <div className="flex justify-between items-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                  className="p-2 hover:bg-secondary-100 rounded-full text-primary-500"
                >
                  <span className="text-2xl">👈</span>
                </motion.button>
                <h3 className="text-2xl font-comic font-bold text-primary-600">
                  {months[selectedMonth]} 2024
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))}
                  className="p-2 hover:bg-secondary-100 rounded-full text-primary-500"
                >
                  <span className="text-2xl">👉</span>
                </motion.button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-comic font-bold text-primary-500 p-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="text-center p-2 font-comic rounded-lg hover:bg-secondary-100 cursor-pointer"
                  >
                    {((i % 31) + 1)}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Fun Activities Section */}
          <section>
            <h2 className="text-3xl font-comic font-bold text-primary-500 mb-6 text-center">
              Fun Activities! 🎨
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Art & Craft Workshop 🎨",
                  date: "Every Saturday",
                  description: "Create amazing artworks and crafts!",
                },
                {
                  title: "Music & Dance 🎵",
                  date: "Every Wednesday",
                  description: "Express yourself through music and dance!",
                },
                {
                  title: "Story Time 📚",
                  date: "Every Monday",
                  description: "Discover magical stories and adventures!",
                },
                {
                  title: "Science Club 🔬",
                  date: "Every Friday",
                  description: "Explore the wonders of science!",
                },
              ].map((activity) => (
                <motion.div
                  key={activity.title}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border-2 border-secondary-300"
                >
                  <h3 className="text-xl font-comic font-bold text-primary-600 mb-2">
                    {activity.title}
                  </h3>
                  <div className="text-secondary-500 font-comic mb-2">{activity.date}</div>
                  <p className="text-gray-600 font-comic">{activity.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Events;
