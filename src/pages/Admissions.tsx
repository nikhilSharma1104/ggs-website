import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    grade: '',
    parentName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Admissions</h1>

          {/* Process Overview */}
          <section className="mb-16">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-600 mb-6">Admission Process</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Submit Inquiry', desc: 'Fill out the inquiry form below' },
                  { step: '2', title: 'Document Review', desc: 'Submit required documents for review' },
                  { step: '3', title: 'Assessment', desc: 'Student assessment and interview' },
                  { step: '4', title: 'Admission', desc: 'Confirmation and enrollment' },
                ].map((step) => (
                  <div key={step.step} className="text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Requirements</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">Required Documents</h3>
                  <ul className="space-y-3">
                    {[
                      'Birth Certificate',
                      'Previous School Records',
                      'Immunization Records',
                      'Passport Size Photographs',
                      'Parent ID Proof',
                      'Address Proof',
                    ].map((doc) => (
                      <li key={doc} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">Age Requirements</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Grade</th>
                        <th className="text-left py-2">Age Requirement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { grade: 'Pre-Primary', age: '3-4 years' },
                        { grade: 'Primary', age: '5-10 years' },
                        { grade: 'Middle School', age: '11-13 years' },
                        { grade: 'High School', age: '14-17 years' },
                      ].map((item) => (
                        <tr key={item.grade} className="border-b">
                          <td className="py-2">{item.grade}</td>
                          <td className="py-2">{item.age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Inquiry Form */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Admission Inquiry</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Student's Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Grade Applying For</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="pre-primary">Pre-Primary</option>
                    <option value="primary">Primary</option>
                    <option value="middle">Middle School</option>
                    <option value="high">High School</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Parent's Name</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    rows={4}
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Admissions;
