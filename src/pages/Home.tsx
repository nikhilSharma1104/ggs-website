import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Announcements from '../components/Announcements';

const Home = () => {
  const navigate = useNavigate();

  const galleryImages = [
    '/images/school-1.jpg',
    '/images/school-2.jpg',
    '/images/school-3.jpg',
    '/images/school-4.jpg',
    '/images/school-5.jpg',
    '/images/school-6.jpg',
  ];

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

  return (
    <div className="min-h-screen">
      <section className="relative h-[90vh] bg-gradient-to-r from-primary-500 to-primary-600 overflow-hidden">
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-400 rounded-full opacity-50 animate-wiggle"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-secondary-200 rounded-full opacity-50 animate-pulse"></div>
        <img src="/images/children-playing.png" alt="Children Playing" className="absolute bottom-0 left-0 w-full h-auto" />

        <div className="container h-full flex items-center relative z-10">
          <h1 className="text-5xl font-comic font-bold text-white">Welcome to Gurukulam Global School</h1>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-comic font-bold text-primary-600 mb-4">Our Gallery</h2>
            <p className="text-gray-600 font-comic max-w-2xl mx-auto">
              Take a peek into the vibrant life at Gurukulam Global School through our photo gallery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-xl shadow-lg aspect-w-16 aspect-h-9"
              >
                <img
                  src={image}
                  alt={`School Gallery ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-comic font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl font-comic font-bold text-primary-600 mb-2">Latest Announcements</h2>
          </motion.div>
          <Announcements announcements={announcementsData} />
        </div>
      </section>

      <section className="py-16 bg-primary-500">
        <div className="container">
          <h2 className="text-4xl font-comic font-bold text-center text-secondary-300 mb-12">Why Choose Us?</h2>
        </div>
      </section>
    </div>
  );
};

export default Home;
