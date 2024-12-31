import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaChalkboardTeacher, FaUserTie, FaUsers, FaFileUpload } from 'react-icons/fa';

const Careers: React.FC = () => {
  const [formData, setFormData] = useState({
    position: '',
    department: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    resume: null as File | null,
    coverLetter: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFormData(prev => ({
      ...prev,
      resume: e.target.files![0]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('/api/careers/apply', formData);
      setSubmitStatus({
        type: 'success',
        message: 'Application submitted successfully! We will review your application and get back to you soon.'
      });
      setFormData({
        position: '',
        department: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        education: '',
        resume: null,
        coverLetter: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Error submitting application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-primary-900 min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <motion.section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background with Enhanced Particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: "blur(1px)",
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 30, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-white mb-6 relative inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Join Our{" "}
              <span className="text-secondary-500 relative">
                Team
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-secondary-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto font-light"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Shape the future of education with us
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Join Us Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Join GGS?</h2>
            <p className="text-xl text-white/80">
              Be part of an institution that values growth, innovation, and excellence in education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-primary-800/50 p-8 rounded-xl backdrop-blur-sm border border-white/10"
            >
              <div className="text-secondary-500 text-4xl mb-4">
                <FaChalkboardTeacher />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Professional Growth</h3>
              <p className="text-white/70">
                Regular training programs and workshops for continuous professional development. Stay ahead with modern teaching methodologies.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-primary-800/50 p-8 rounded-xl backdrop-blur-sm border border-white/10"
            >
              <div className="text-secondary-500 text-4xl mb-4">
                <FaUserTie />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Work Culture</h3>
              <p className="text-white/70">
                Join a collaborative environment that fosters innovation, creativity, and personal growth. Be part of a supportive community.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-primary-800/50 p-8 rounded-xl backdrop-blur-sm border border-white/10"
            >
              <div className="text-secondary-500 text-4xl mb-4">
                <FaUsers />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Benefits</h3>
              <p className="text-white/70">
                Enjoy competitive compensation, and opportunities for career advancement in a growing institution.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Apply Now</h2>
              <p className="text-xl text-white/80">
                Take the first step towards an enriching career in education
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-primary-800/50 p-8 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Position</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full bg-primary-700/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    required
                  >
                    <option value="">Select Position</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Administrative Staff">Administrative Staff</option>
                    <option value="Support Staff">Support Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full bg-primary-700/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-primary-700/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-primary-700/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-primary-700/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-primary-700/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full bg-primary-700/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Education</label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full bg-primary-700/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-white mb-2">Resume</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-lg hover:border-secondary-500/50 transition-colors">
                  <div className="space-y-1 text-center">
                    <FaFileUpload className="mx-auto h-12 w-12 text-white/50" />
                    <div className="flex text-sm text-white/70">
                      <label
                        htmlFor="resume-upload"
                        className="relative cursor-pointer rounded-md font-medium text-secondary-500 hover:text-secondary-400"
                      >
                        <span>Upload a file</span>
                        <input
                          id="resume-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-white/50">PDF, DOC up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-white mb-2">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-primary-700/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  required
                  placeholder="Tell us why you would be a great fit for this position..."
                />
              </div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-500/20 text-green-200 border border-green-500/30'
                      : 'bg-red-500/20 text-red-200 border border-red-500/30'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-secondary-500 text-white rounded-lg font-medium hover:bg-secondary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-primary-900 transition-colors
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
