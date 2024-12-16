import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Announcements from '../components/Announcements';
import Slider from 'react-slick';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings} className="absolute inset-0 z-0">
      <div>
        <img src="/images/slider-image1.jpg" alt="Slide 1" className="w-full h-auto" />
      </div>
      <div>
        <img src="/images/slider-image2.jpg" alt="Slide 2" className="w-full h-auto" />
      </div>
      <div>
        <img src="/images/slider-image3.jpg" alt="Slide 3" className="w-full h-auto" />
      </div>
    </Slider>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const galleryImages = [
    '/images/school-1.jpg',
    '/images/school-2.jpg',
    '/images/school-3.jpg',
    '/images/school-4.jpg',
    '/images/school-5.jpg',
    '/images/school-6.jpg',
  ];

  // Sample announcements data
  const announcementsData = [
    {
      id: 1,
      title: 'School Annual Day',
      date: '2024-12-20',
      description: 'Join us for a spectacular celebration of talent and achievements!',
      type: 'event' as const,
      emoji: '🎭'
    },
    {
      id: 2,
      title: 'Holiday Notice',
      date: '2024-12-25',
      description: 'School will remain closed for Christmas celebrations.',
      type: 'important' as const,
      emoji: '🎄'
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      date: '2024-12-18',
      description: 'Discussing student progress and future goals.',
      type: 'general' as const,
      emoji: '👨‍👩‍👧‍👦'
    },
  ];

  return (
    <div className="min-h-screen relative">
      <ImageSlider />
      <section className="relative h-[90vh] bg-gradient-to-r from-yellow-300 to-pink-300 overflow-hidden z-10">
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-50 animate-wiggle"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-200 rounded-full opacity-50 animate-pulse"></div>
        <img src="/images/children-playing.png" alt="Children Playing" className="absolute bottom-0 left-0 w-full h-auto" />

        <div className="container h-full flex flex-col items-center justify-center relative z-10">
          <h1 className="text-6xl font-comic font-bold text-white text-center drop-shadow-lg">Welcome to Gurukulam Global School</h1>
          <p className="text-2xl font-comic font-bold text-yellow-800 mt-4">Admissions Open!</p>
          <div className="my-8">
            <h2 className="text-3xl font-comic font-bold text-center mb-4">Watch Our Introduction Video</h2>
            <div className="flex justify-center">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/6DHDX1rXrjU"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <Link to="/admissions" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300">
            Apply Now
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
        </div>
      </section>

      <section className="py-16 bg-primary-500">
        <div className="container">
          <h2 className="text-4xl font-comic font-bold text-center text-secondary-300 mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <span className="text-6xl transition-transform duration-300 hover:animate-bounce">🌱</span>
              <h3 className="text-xl font-comic font-bold mt-2">Holistic Development</h3>
              <p className="text-gray-700">Our curriculum emphasizes the overall development of children, focusing on academics, physical, emotional, and social growth.</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <span className="text-6xl transition-transform duration-300 hover:animate-bounce">🧪</span>
              <h3 className="text-xl font-comic font-bold mt-2">Experiential Learning</h3>
              <p className="text-gray-700">We incorporate hands-on learning experiences that encourage active engagement with the environment.</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <span className="text-6xl transition-transform duration-300 hover:animate-bounce">🤝</span>
              <h3 className="text-xl font-comic font-bold mt-2">Inclusive Education</h3>
              <p className="text-gray-700">We provide an inclusive environment that caters to diverse learning needs, ensuring every child feels valued.</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <span className="text-6xl transition-transform duration-300 hover:animate-bounce">💻</span>
              <h3 className="text-xl font-comic font-bold mt-2">Technology Integration</h3>
              <p className="text-gray-700">Our approach integrates technology to enhance learning experiences and prepare students for a digital future.</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <span className="text-6xl transition-transform duration-300 hover:animate-bounce">🧠</span>
              <h3 className="text-xl font-comic font-bold mt-2">Focus on Critical Thinking</h3>
              <p className="text-gray-700">We encourage students to think critically and creatively, preparing them for real-world challenges.</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <span className="text-6xl transition-transform duration-300 hover:animate-bounce">🌟</span>
              <h3 className="text-xl font-comic font-bold mt-2">Value-Based Education</h3>
              <p className="text-gray-700">Our curriculum instills values such as empathy, respect, and responsibility, aligning with NEP 2020 and NCF 2024.</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <span className="text-6xl transition-transform duration-300 hover:animate-bounce">👥</span>
              <h3 className="text-xl font-comic font-bold mt-2">Collaborative Learning</h3>
              <p className="text-gray-700">We promote collaborative learning through group activities, helping students develop teamwork skills.</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <span className="text-6xl transition-transform duration-300 hover:animate-bounce">🌍</span>
              <h3 className="text-xl font-comic font-bold mt-2">Foreign Language Classes</h3>
              <p className="text-gray-700">We offer foreign language classes to help students develop multilingual skills, enhancing their communication abilities and cultural awareness.</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <span className="text-6xl transition-transform duration-300 hover:animate-bounce">🌟</span>
              <h3 className="text-xl font-comic font-bold mt-2">Sanskar (Values) Classes</h3>
              <p className="text-gray-700">Our Sanskar classes focus on instilling moral values and ethical behavior, ensuring that students grow into responsible and compassionate individuals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <Announcements announcements={announcementsData} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-3xl font-comic font-bold text-primary-600 mb-2">Our Gallery</h2>
                <p className="text-gray-600 font-comic max-w-2xl mx-auto">
                  Take a peek into the vibrant life at Gurukulam Global School through our photo gallery
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group overflow-hidden rounded-xl shadow-lg aspect-w-16 aspect-h-9"
                    >
                      <img
                        src={image}
                        alt={`School Gallery ${index + 1}`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <Link
                    to="/gallery"
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-comic font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
                  >
                    View Full Gallery
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
        <span className="text-2xl">📞</span> {/* Phone emoji */}
      </a>
    </div>
  );
};

export default Home;
