import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const managementTeam = [
    {
      name: "Dr. John Doe",
      position: "Chairman",
      description: "With over 30 years of experience in education, Dr. Doe has been instrumental in shaping the vision of Gurukulam Global School.",
      image: "/images/chairman.jpg"
    },
    {
      name: "Mrs. Jane Smith",
      position: "Principal",
      description: "An educator par excellence with a passion for holistic development of children.",
      image: "/images/principal.jpg"
    },
    // Add more management team members as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-comic font-bold text-primary-600 mb-6">
            About Gurukulam Global School
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-comic">
            Welcome to Gurukulam Global School, where tradition meets innovation in education.
            Our mission is to nurture young minds and help them grow into responsible global citizens.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-comic font-bold text-primary-600">Our Vision</h2>
            <p className="text-gray-700 font-comic">
              To be a leading educational institution that empowers students with knowledge,
              skills, and values to excel in the global arena while staying rooted in Indian culture and traditions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-comic font-bold text-primary-600">Our Mission</h2>
            <p className="text-gray-700 font-comic">
              To provide quality education through innovative teaching methods,
              foster creativity, critical thinking, and character development in a nurturing environment.
            </p>
          </motion.div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-comic font-bold text-primary-600 text-center mb-12">
            Our Management Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-comic font-bold text-primary-600 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-secondary-500 font-comic mb-4">{member.position}</p>
                  <p className="text-gray-600 font-comic">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-comic font-bold text-primary-600 mb-6">
            Join Our Educational Journey
          </h2>
          <p className="text-gray-700 font-comic max-w-3xl mx-auto mb-8">
            At Gurukulam Global School, we believe in creating an environment where every child can
            discover their potential and grow into confident, capable individuals.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUs;
