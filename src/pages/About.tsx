import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { label: 'Years of Excellence', value: '25+' },
    { label: 'Students', value: '1000+' },
    { label: 'Faculty Members', value: '100+' },
    { label: 'Acres Campus', value: '15' },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container">
        {/* Mission & Vision */}
        <section className="py-16 bg-gradient-to-r from-yellow-400 to-orange-500">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-playfair font-bold text-white">About Us</h1>
            <p className="text-xl text-white mt-4">Discover our mission, vision, and values!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="bg-orange-200 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-orange-600">Our Mission</h2>
                <p className="text-orange-600">To provide a nurturing environment that fosters holistic development.</p>
              </div>
              <div className="bg-orange-200 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-orange-600">Our Vision</h2>
                <p className="text-orange-600">To empower children to become lifelong learners and responsible citizens.</p>
              </div>
              <div className="bg-orange-200 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-orange-600">Our Values</h2>
                <p className="text-orange-600">Integrity, Respect, and Excellence in all we do.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16 bg-blue-600 text-white rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* History Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our History</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              Founded in 1998, Gurukulam Global School began with a vision to provide quality 
              education that combines traditional values with modern teaching methodologies.
            </p>
            <p className="text-gray-600 mb-4">
              Over the years, we have grown from a small institution to a leading educational 
              center, consistently achieving academic excellence and nurturing well-rounded individuals.
            </p>
            <p className="text-gray-600">
              Today, we stand proud as an institution that has shaped thousands of young minds 
              and continues to set new benchmarks in educational excellence.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Excellence', desc: 'Striving for the highest standards in everything we do' },
              { title: 'Integrity', desc: 'Maintaining honesty and strong moral principles' },
              { title: 'Innovation', desc: 'Embracing new ideas and methods in education' },
              { title: 'Inclusivity', desc: 'Celebrating diversity and ensuring equal opportunities' },
              { title: 'Leadership', desc: 'Developing future leaders through guidance and opportunity' },
              { title: 'Community', desc: 'Fostering a strong sense of belonging and cooperation' },
            ].map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
