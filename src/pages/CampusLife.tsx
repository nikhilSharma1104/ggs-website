import React from 'react';
import { motion } from 'framer-motion';

const CampusLife = () => {
  const facilities = [
    {
      title: 'Sports Facilities',
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
      items: [
        'Music Room',
        'Dance Studio',
        'Art & Craft Center',
        'Theater Auditorium',
        'Robotics Lab',
      ],
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Campus Life</h1>

          {/* Campus Overview */}
          <section className="mb-16">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">Life at Gurukulam</h2>
              <p className="text-gray-600 mb-4">
                Our campus is designed to provide a nurturing environment where students can learn, 
                grow, and discover their passions. With state-of-the-art facilities and a vibrant 
                community, campus life at Gurukulam is an enriching experience.
              </p>
            </div>
          </section>

          {/* Facilities */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Facilities</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {facilities.map((facility) => (
                <div key={facility.title} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">{facility.title}</h3>
                  <ul className="space-y-2">
                    {facility.items.map((item) => (
                      <li key={item} className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Student Life */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Student Life</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Clubs & Activities',
                  description: 'Join various clubs and participate in exciting activities',
                  items: ['Science Club', 'Literary Club', 'Sports Teams', 'Art Club', 'Debate Society'],
                },
                {
                  title: 'Events & Celebrations',
                  description: 'Participate in various cultural and academic events',
                  items: ['Annual Day', 'Sports Meet', 'Cultural Festivals', 'Science Fair', 'Literary Week'],
                },
              ].map((section) => (
                <div key={section.title} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{section.title}</h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Student Support */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Student Support</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Health & Wellness',
                  description: 'On-campus medical facility with qualified staff',
                },
                {
                  title: 'Counseling Services',
                  description: 'Professional counselors for academic and personal guidance',
                },
                {
                  title: 'Transportation',
                  description: 'Safe and comfortable bus service for students',
                },
              ].map((support) => (
                <div key={support.title} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{support.title}</h3>
                  <p className="text-gray-600">{support.description}</p>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default CampusLife;
