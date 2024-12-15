import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Photos 📸', emoji: '🌈' },
    { id: 'events', name: 'School Events', emoji: '🎉' },
    { id: 'sports', name: 'Sports Day', emoji: '⚽' },
    { id: 'arts', name: 'Art & Craft', emoji: '🎨' },
    { id: 'activities', name: 'Activities', emoji: '🎮' },
  ];

  const images = [
    { id: 1, src: '/images/gallery/event1.jpg', category: 'events', title: 'Annual Day Celebration' },
    { id: 2, src: '/images/gallery/sports1.jpg', category: 'sports', title: 'Sports Competition' },
    { id: 3, src: '/images/gallery/art1.jpg', category: 'arts', title: 'Art Exhibition' },
    { id: 4, src: '/images/gallery/activity1.jpg', category: 'activities', title: 'Science Fair' },
    // Add more images as needed
  ];

  const filteredImages = images.filter(
    image => selectedCategory === 'all' || image.category === selectedCategory
  );

  return (
    <div className="min-h-screen py-16 bg-secondary-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <FloatingShape emoji="📸" className="top-20 left-10" />
      <FloatingShape emoji="🎨" className="top-40 right-20" />
      <FloatingShape emoji="🎭" className="bottom-20 left-20" />
      <FloatingShape emoji="🎪" className="bottom-40 right-10" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-comic font-bold text-primary-600 mb-8 text-center">
            Our Fun Gallery! 📸
          </h1>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-comic text-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-secondary-400 text-primary-700'
                    : 'bg-white text-primary-600 hover:bg-secondary-100'
                } shadow-md border-2 border-secondary-300`}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden border-4 border-secondary-300 shadow-lg">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-comic font-bold text-lg">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto rounded-2xl border-4 border-secondary-300"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-12 h-12 bg-secondary-400 text-primary-700 rounded-full flex items-center justify-center text-2xl shadow-lg border-2 border-secondary-300"
              >
                ✖️
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
