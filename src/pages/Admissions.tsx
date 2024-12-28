import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { submitAdmissionApplication } from '../services/admissionService';

interface FloatingElementProps {
  emoji: string;
  className?: string;
  delay?: number;
}

interface AdmissionStep {
  title: string;
  description: string;
  icon: string;
}

interface RequiredDocument {
  name: string;
  description: string;
  icon: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ emoji, className, delay = 0 }) => (
  <motion.div
    className={`absolute text-4xl ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  >
    {emoji}
  </motion.div>
);

const Admissions: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    grade: '',
    parentName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const admissionSteps: AdmissionStep[] = [
    {
      title: "Submit Application",
      description: "Fill out the online application form with all required information",
      icon: "📝"
    },
    {
      title: "Document Verification",
      description: "Submit required documents for verification",
      icon: "📋"
    },
    {
      title: "Entrance Assessment",
      description: "Complete the grade-appropriate entrance assessment",
      icon: "✍️"
    },
    {
      title: "Personal Interview",
      description: "Attend an interview with our academic team",
      icon: "🤝"
    },
    {
      title: "Admission Confirmation",
      description: "Receive admission decision and complete the enrollment process",
      icon: "🎉"
    }
  ];

  const requiredDocuments: RequiredDocument[] = [
    {
      name: "Birth Certificate",
      description: "Original birth certificate for age verification",
      icon: "📜"
    },
    {
      name: "Previous Academic Records",
      description: "Last 2 years' report cards and transfer certificate",
      icon: "📚"
    },
    {
      name: "Medical Records",
      description: "Immunization records and general health certificate",
      icon: "🏥"
    },
    {
      name: "Passport Photos",
      description: "Recent passport-size photographs",
      icon: "📸"
    },
    {
      name: "Address Proof",
      description: "Current residential address proof",
      icon: "🏠"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setSubmitError(null);
      try {
        await submitAdmissionApplication(formData);
        setIsSubmitted(true);
        // Reset form
        setFormData({
          studentName: '',
          grade: '',
          parentName: '',
          email: '',
          phone: '',
          message: '',
        });
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Failed to submit application');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          {[...Array(20)].map((_, i) => (
            <FloatingElement
              key={i}
              emoji={["📚", "✏️", "🎨", "🎭", "🏫", "🎓"][i % 6]}
              className={`top-${Math.random() * 100}% left-${Math.random() * 100}%`}
              delay={i * 0.2}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Join Our Community
              <motion.div
                className="h-1 w-24 bg-secondary-500 mx-auto mt-4"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Begin your educational journey with us
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Admission Process
            <motion.div
              className="h-1 w-24 bg-secondary-500 mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1 }}
            />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {admissionSteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/50 p-6 rounded-xl backdrop-blur-sm border border-white/10
                          hover:border-secondary-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-20 bg-primary-800/30">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Required Documents
            <motion.div
              className="h-1 w-24 bg-secondary-500 mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1 }}
            />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {requiredDocuments.map((doc, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/50 p-6 rounded-xl backdrop-blur-sm border border-white/10
                          hover:border-secondary-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {doc.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{doc.name}</h3>
                <p className="text-white/80">{doc.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Application Form
            <motion.div
              className="h-1 w-24 bg-secondary-500 mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1 }}
            />
          </motion.h2>

          <div className="max-w-2xl mx-auto">
            <AnimatePresence>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-primary-800/50 p-8 rounded-xl text-center"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Application Submitted!</h3>
                  <p className="text-white/80 mb-6">
                    Thank you for your interest in joining our school. We will review your application
                    and contact you soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-secondary-500 text-white px-6 py-2 rounded-full hover:bg-secondary-600 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="bg-primary-800/50 p-8 rounded-xl backdrop-blur-sm border border-white/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2" htmlFor="studentName">
                        Student Name
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        className={`w-full bg-primary-700/50 text-white border ${
                          errors.studentName ? 'border-red-500' : 'border-white/10'
                        } rounded-lg p-3 focus:outline-none focus:border-secondary-500`}
                      />
                      {errors.studentName && (
                        <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white mb-2" htmlFor="grade">
                        Grade Applying For
                      </label>
                      <select
                        id="grade"
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        className={`w-full bg-primary-700/50 text-white border ${
                          errors.grade ? 'border-red-500' : 'border-white/10'
                        } rounded-lg p-3 focus:outline-none focus:border-secondary-500`}
                      >
                        <option value="">Select Grade</option>
                        <optgroup label="Pre-Primary">
                          <option value="playgroup">Playgroup (2-3 years)</option>
                          <option value="nursery">Nursery (3-4 years)</option>
                          <option value="lkg">Lower Kindergarten (4-5 years)</option>
                          <option value="ukg">Upper Kindergarten (5-6 years)</option>
                        </optgroup>
                        <optgroup label="Primary">
                          <option value="grade1">Grade 1</option>
                          <option value="grade2">Grade 2</option>
                          <option value="grade3">Grade 3</option>
                          <option value="grade4">Grade 4</option>
                          <option value="grade5">Grade 5</option>
                        </optgroup>
                        <optgroup label="Middle">
                          <option value="grade6">Grade 6</option>
                          <option value="grade7">Grade 7</option>
                          <option value="grade8">Grade 8</option>
                        </optgroup>
                      </select>
                      {errors.grade && (
                        <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white mb-2" htmlFor="parentName">
                        Parent/Guardian Name
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className={`w-full bg-primary-700/50 text-white border ${
                          errors.parentName ? 'border-red-500' : 'border-white/10'
                        } rounded-lg p-3 focus:outline-none focus:border-secondary-500`}
                      />
                      {errors.parentName && (
                        <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-primary-700/50 text-white border ${
                          errors.email ? 'border-red-500' : 'border-white/10'
                        } rounded-lg p-3 focus:outline-none focus:border-secondary-500`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white mb-2" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-primary-700/50 text-white border ${
                          errors.phone ? 'border-red-500' : 'border-white/10'
                        } rounded-lg p-3 focus:outline-none focus:border-secondary-500`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white mb-2" htmlFor="message">
                        Additional Information
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full bg-primary-700/50 text-white border border-white/10 rounded-lg p-3 focus:outline-none focus:border-secondary-500"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    {submitError && (
                      <p className="text-red-500 mb-4">{submitError}</p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isLoading}
                      className={`bg-secondary-500 text-white px-8 py-3 rounded-full 
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary-600'} 
                        transition-colors`}
                    >
                      {isLoading ? 'Submitting...' : 'Submit Application'}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
