import React from 'react';
import { motion } from 'framer-motion';

interface Announcement {
  id: number;
  title: string;
  date: string;
  description: string;
  type: 'important' | 'general' | 'event';
  emoji: string;
}

interface Props {
  announcements: Announcement[];
}

const Announcements = ({ announcements }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-secondary-300 overflow-hidden">
      <div className="bg-primary-500 p-4">
        <h2 className="text-2xl font-comic font-bold text-white flex items-center">
          <span className="text-3xl mr-2">📢</span>
          Latest Announcements
        </h2>
      </div>
      
      <div className="p-4 space-y-4">
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-xl border-2 ${
              announcement.type === 'important'
                ? 'border-red-200 bg-red-50'
                : announcement.type === 'event'
                ? 'border-secondary-200 bg-secondary-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-3xl">{announcement.emoji}</span>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-comic font-bold text-primary-600">
                    {announcement.title}
                  </h3>
                  <span className="text-sm text-gray-500 font-comic">
                    {announcement.date}
                  </span>
                </div>
                <p className="mt-1 text-gray-600 font-comic">
                  {announcement.description}
                </p>
                <div className="mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm font-comic text-primary-500 hover:text-primary-600"
                  >
                    Read More →
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4 bg-secondary-50 border-t-2 border-secondary-200"
      >
        <a
          href="/announcements"
          className="block text-center font-comic text-primary-600 hover:text-primary-700"
        >
          View All Announcements 🔍
        </a>
      </motion.div>
    </div>
  );
};

export default Announcements;
