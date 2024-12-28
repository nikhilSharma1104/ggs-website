import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MiddleStage: React.FC = () => {
  const features = [
    {
      icon: "🔬",
      title: "Subject Specialization",
      description: "In-depth study of core subjects with specialized focus"
    },
    {
      icon: "🎯",
      title: "Skill Development",
      description: "Focus on 21st-century skills and vocational exposure"
    },
    {
      icon: "🌐",
      title: "Global Perspective",
      description: "Understanding of global issues and cultural diversity"
    },
    {
      icon: "💡",
      title: "Critical Thinking",
      description: "Emphasis on analytical and problem-solving skills"
    }
  ];

  const curriculum = [
    {
      grade: "Middle Stage (Ages 11-14)",
      subjects: [
        "Languages (First, Second, and Third)",
        "Mathematics",
        "Science",
        "Social Science",
        "Art Education",
        "Health & Physical Education",
        "Vocational Education",
        "Life Skills & Values"
      ],
      pedagogicalApproaches: [
        "Inquiry-based learning",
        "Project-based learning",
        "Collaborative learning",
        "Technology integration",
        "Experiential learning",
        "Research-oriented tasks"
      ],
      learningOutcomes: [
        "Advanced conceptual understanding",
        "Critical thinking and analysis",
        "Scientific temperament",
        "Digital and technological competence",
        "Social and environmental awareness",
        "Leadership and collaboration skills"
      ]
    }
  ];

  const academicPrograms = [
    {
      title: "Core Academics",
      description: "Advanced study of fundamental subjects",
      components: [
        "In-depth subject knowledge",
        "Practical applications",
        "Interdisciplinary connections",
        "Research projects"
      ]
    },
    {
      title: "Skill Development",
      description: "Building essential life and career skills",
      components: [
        "Digital literacy",
        "Communication skills",
        "Problem-solving",
        "Leadership training"
      ]
    },
    {
      title: "Enrichment Programs",
      description: "Additional learning opportunities",
      components: [
        "STEM activities",
        "Language labs",
        "Arts and culture",
        "Sports excellence"
      ]
    },
    {
      title: "Career Guidance",
      description: "Early exposure to career options",
      components: [
        "Career counseling",
        "Industry exposure",
        "Skill assessment",
        "Vocational awareness"
      ]
    }
  ];

  const assessmentSystem = [
    {
      title: "Continuous Assessment",
      methods: [
        "Regular tests and quizzes",
        "Project evaluations",
        "Portfolio assessment",
        "Practical examinations"
      ]
    },
    {
      title: "Skill Assessment",
      methods: [
        "21st-century skills",
        "Subject competencies",
        "Practical skills",
        "Soft skills"
      ]
    },
    {
      title: "Personal Development",
      methods: [
        "Leadership qualities",
        "Team collaboration",
        "Communication skills",
        "Social responsibility"
      ]
    },
    {
      title: "Holistic Evaluation",
      methods: [
        "Multiple intelligence assessment",
        "Co-curricular activities",
        "Sports and fitness",
        "Art and creativity"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Breadcrumb Navigation */}
        <div className="absolute top-8 left-8 z-20">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/academics" className="inline-flex items-center text-sm font-medium text-white hover:text-secondary-500">
                  <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                  </svg>
                  Academics
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-secondary-500 md:ml-2">Middle Stage</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          {/* Floating Elements */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-secondary-500/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
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

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Middle Stage
            <span className="block text-2xl md:text-3xl text-secondary-500 mt-4">
              Classes 6-8 (Ages 11-14)
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Nurturing academic excellence and personal growth
          </motion.p>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/50 p-6 rounded-xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-primary-800/30">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Curriculum
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {curriculum.map((curriculumItem, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/50 p-8 rounded-xl"
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">{curriculumItem.grade}</h3>
                <h4 className="text-xl font-bold text-white mb-4">Subjects</h4>
                <ul className="space-y-3">
                  {curriculumItem.subjects.map((subject, idx) => (
                    <motion.li
                      key={idx}
                      className="text-white/80 flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="w-2 h-2 bg-secondary-500 rounded-full" />
                      <span>{subject}</span>
                    </motion.li>
                  ))}
                </ul>
                <h4 className="text-xl font-bold text-white mb-4">Pedagogical Approaches</h4>
                <ul className="space-y-3">
                  {curriculumItem.pedagogicalApproaches.map((approach, idx) => (
                    <motion.li
                      key={idx}
                      className="text-white/80 flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="w-2 h-2 bg-secondary-500 rounded-full" />
                      <span>{approach}</span>
                    </motion.li>
                  ))}
                </ul>
                <h4 className="text-xl font-bold text-white mb-4">Learning Outcomes</h4>
                <ul className="space-y-3">
                  {curriculumItem.learningOutcomes.map((outcome, idx) => (
                    <motion.li
                      key={idx}
                      className="text-white/80 flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="w-2 h-2 bg-secondary-500 rounded-full" />
                      <span>{outcome}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Academic Programs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {academicPrograms.map((program, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/50 p-8 rounded-xl"
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">{program.title}</h3>
                <p className="text-white/80">{program.description}</p>
                <ul className="space-y-3">
                  {program.components.map((component, idx) => (
                    <motion.li
                      key={idx}
                      className="text-white/80 flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="w-2 h-2 bg-secondary-500 rounded-full" />
                      <span>{component}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment System Section */}
      <section className="py-20 bg-primary-800/30">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Assessment System
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {assessmentSystem.map((assessment, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/50 p-8 rounded-xl"
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">{assessment.title}</h3>
                <ul className="space-y-3">
                  {assessment.methods.map((method, idx) => (
                    <motion.li
                      key={idx}
                      className="text-white/80 flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="w-2 h-2 bg-secondary-500 rounded-full" />
                      <span>{method}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <Link to="/preparatory-stage">
              <motion.button
                className="px-6 py-3 bg-secondary-500 text-white rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Preparatory Stage
              </motion.button>
            </Link>
            <Link to="/academics">
              <motion.button
                className="px-6 py-3 bg-primary-500 text-white rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Academics
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiddleStage;
