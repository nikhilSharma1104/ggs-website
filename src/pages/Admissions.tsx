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

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    grade: '',
    parentName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.studentName.trim()) newErrors.studentName = 'Please enter student name! 😊';
    if (!formData.parentName.trim()) newErrors.parentName = 'Please enter parent name! 👨‍👩‍👧‍👦';
    if (!formData.email.trim()) {
      newErrors.email = 'We need your email to reach you! 📧';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Oops! That email doesn\'t look right 🤔';
    }
    if (!formData.grade) newErrors.grade = 'Please select a grade! 📚';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form submitted:', formData);
    setFormData({
      studentName: '',
      grade: '',
      parentName: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen py-16 bg-secondary-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <FloatingShape emoji="📚" className="top-20 left-10" />
      <FloatingShape emoji="🎨" className="top-40 right-20" />
      <FloatingShape emoji="🌟" className="bottom-20 left-20" />
      <FloatingShape emoji="✏️" className="bottom-40 right-10" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-comic font-bold text-primary-600 mb-8 text-center">
            Join Our School Family! 🏫
          </h1>

          {/* Journey Path Visualization */}
          <div className="relative mb-16 py-8 overflow-hidden">
            <div className="absolute left-0 right-0 top-1/2 h-4 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 transform -translate-y-1/2 rounded-full"></div>
            <div className="relative flex justify-between max-w-4xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center group relative"
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                  <span className="text-3xl">📝</span>
                </div>
                <p className="text-center font-comic font-bold">Start</p>
                <div className="absolute invisible group-hover:visible bg-white p-4 rounded-xl shadow-xl w-64 -translate-y-1/2 top-1/2 left-full ml-4 z-10 border-2 border-yellow-300">
                  <h4 className="font-comic font-bold text-yellow-600 mb-2">Begin Your Journey!</h4>
                  <p className="text-sm text-gray-600">Fill out our simple online application form with your child's details. We've made it easy and quick - takes just 10 minutes!</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center group relative"
              >
                <div className="w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                  <span className="text-3xl">📞</span>
                </div>
                <p className="text-center font-comic font-bold">Connect</p>
                <div className="absolute invisible group-hover:visible bg-white p-4 rounded-xl shadow-xl w-64 -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2 z-10 border-2 border-pink-300">
                  <h4 className="font-comic font-bold text-pink-600 mb-2">Let's Chat!</h4>
                  <p className="text-sm text-gray-600">Our friendly admission team will call you within 24 hours to discuss the next steps and answer any questions you have.</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center group relative"
              >
                <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                  <span className="text-3xl">🎯</span>
                </div>
                <p className="text-center font-comic font-bold">Meet</p>
                <div className="absolute invisible group-hover:visible bg-white p-4 rounded-xl shadow-xl w-64 -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2 z-10 border-2 border-purple-300">
                  <h4 className="font-comic font-bold text-purple-600 mb-2">Visit & Assessment</h4>
                  <p className="text-sm text-gray-600">Schedule a visit to our campus! Your child will participate in fun activities while we assess their learning level. Don't forget to bring the required documents.</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center group relative"
              >
                <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                  <span className="text-3xl">🎉</span>
                </div>
                <p className="text-center font-comic font-bold">Welcome!</p>
                <div className="absolute invisible group-hover:visible bg-white p-4 rounded-xl shadow-xl w-64 -translate-y-1/2 top-1/2 right-full mr-4 z-10 border-2 border-blue-300">
                  <h4 className="font-comic font-bold text-blue-600 mb-2">Join Our Family!</h4>
                  <p className="text-sm text-gray-600">Congratulations! Receive your welcome kit, meet your teachers, and get ready for an amazing learning journey at Gurukulam.</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Admission Process */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-secondary-300">
                <h2 className="text-3xl font-comic font-bold text-primary-600 mb-6">
                  Admission Process 📋
                </h2>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start space-x-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl">1️⃣</div>
                    <div>
                      <h3 className="font-bold text-primary-600">Submit Application Form</h3>
                      <p className="text-gray-600">Fill out and submit the online application form</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl">2️⃣</div>
                    <div>
                      <h3 className="font-bold text-primary-600">Initial Contact</h3>
                      <p className="text-gray-600">Our team will call you to schedule the next steps</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl">3️⃣</div>
                    <div>
                      <h3 className="font-bold text-primary-600">Interview & Assessment</h3>
                      <p className="text-gray-600">Child's interview and assessment followed by document verification</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl">4️⃣</div>
                    <div>
                      <h3 className="font-bold text-primary-600">Welcome to Gurukulam!</h3>
                      <p className="text-gray-600">Receive your welcome kit and join our school family</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-secondary-300">
                <h2 className="text-2xl font-comic font-bold text-primary-600 mb-4">
                  Required Documents 📑
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-xl mr-2">📄</span>
                    Birth Certificate
                  </li>
                  <li className="flex items-center">
                    <span className="text-xl mr-2">📚</span>
                    Previous School Records
                  </li>
                  <li className="flex items-center">
                    <span className="text-xl mr-2">💉</span>
                    Medical Records
                  </li>
                  <li className="flex items-center">
                    <span className="text-xl mr-2">🖼️</span>
                    Passport Size Photos
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Application Form */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-secondary-300">
              <h2 className="text-3xl font-comic font-bold text-primary-600 mb-6">
                Apply Now! 📝
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-primary-600 font-comic mb-2">Student's Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className={`w-full p-3 border-2 rounded-xl ${
                      errors.studentName ? 'border-red-300' : 'border-secondary-300'
                    }`}
                    placeholder="Enter student's name"
                  />
                  {errors.studentName && (
                    <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-primary-600 font-comic mb-2">Grade Applying For</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className={`w-full p-3 border-2 rounded-xl ${
                      errors.grade ? 'border-red-300' : 'border-secondary-300'
                    }`}
                  >
                    <option value="">Select Grade</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                    <option value="4">Grade 4</option>
                    <option value="5">Grade 5</option>
                  </select>
                  {errors.grade && (
                    <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
                  )}
                </div>

                <div>
                  <label className="block text-primary-600 font-comic mb-2">Parent's Name</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className={`w-full p-3 border-2 rounded-xl ${
                      errors.parentName ? 'border-red-300' : 'border-secondary-300'
                    }`}
                    placeholder="Enter parent's name"
                  />
                  {errors.parentName && (
                    <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-primary-600 font-comic mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border-2 rounded-xl ${
                      errors.email ? 'border-red-300' : 'border-secondary-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-primary-600 font-comic mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-secondary-300 rounded-xl"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-primary-600 font-comic mb-2">Additional Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-secondary-300 rounded-xl h-32"
                    placeholder="Any additional information you'd like to share"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-primary-600 text-white font-comic font-bold py-3 px-6 rounded-xl hover:bg-primary-700 transition duration-300"
                >
                  Submit Application 🚀
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admissions;
