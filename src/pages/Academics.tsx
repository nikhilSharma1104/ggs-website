import React from 'react';
import { motion } from 'framer-motion';

const Academics = () => {
  const programs = [
    {
      level: 'Primary School',
      grades: 'Grades 1-5',
      description: 'Foundation years focusing on core subjects and developmental activities.',
      subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Art & Craft'],
    },
    {
      level: 'Middle School',
      grades: 'Grades 6-8',
      description: 'Building on fundamentals with introduction to specialized subjects.',
      subjects: ['Language Arts', 'Advanced Mathematics', 'Life Sciences', 'World History', 'Computer Science'],
    },
    {
      level: 'High School',
      grades: 'Grades 9-12',
      description: 'Comprehensive education preparing students for higher studies.',
      subjects: ['Literature', 'Calculus', 'Physics', 'Chemistry', 'Biology', 'Economics'],
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
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Academic Programs</h1>

          {/* Curriculum Overview */}
          <section className="mb-16">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">Curriculum Overview</h2>
              <p className="text-gray-600 mb-4">
                Our curriculum is designed to provide a comprehensive education that balances 
                academic excellence with personal development. We follow international standards 
                while incorporating local cultural values.
              </p>
              <p className="text-gray-600">
                Through innovative teaching methods and modern technology, we ensure that our 
                students receive an education that prepares them for future success.
              </p>
            </div>
          </section>

          {/* Academic Programs */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Programs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program) => (
                <div key={program.level} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{program.level}</h3>
                  <p className="text-sm text-gray-500 mb-3">{program.grades}</p>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <h4 className="font-semibold text-gray-700 mb-2">Key Subjects:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {program.subjects.map((subject) => (
                      <li key={subject}>{subject}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Teaching Methodology */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Teaching Methodology</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Interactive Learning',
                  description: 'Engaging students through discussions, projects, and hands-on activities.',
                },
                {
                  title: 'Technology Integration',
                  description: 'Using modern educational tools and digital resources to enhance learning.',
                },
                {
                  title: 'Personalized Attention',
                  description: 'Small class sizes ensuring individual attention and support.',
                },
                {
                  title: 'Regular Assessment',
                  description: 'Continuous evaluation to track progress and identify areas for improvement.',
                },
              ].map((method) => (
                <div key={method.title} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Academic Support */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Academic Support</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  'After-school tutoring programs',
                  'Learning resource center',
                  'Career counseling',
                  'Special education support',
                  'Advanced placement options',
                  'Study skills workshops',
                ].map((support) => (
                  <div key={support} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{support}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Academics;
