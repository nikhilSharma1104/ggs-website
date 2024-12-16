import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import CampusLife from './pages/CampusLife';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Prospectus from './pages/Prospectus';
import AdmissionPopup from './components/AdmissionPopup';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

function App() {
  const [showAdmissionPopup, setShowAdmissionPopup] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowAdmissionPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/academics" element={<Academics />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/campus-life" element={<CampusLife />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/prospectus" element={<Prospectus />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
        {showAdmissionPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
              <AdmissionPopup 
                isOpen={showAdmissionPopup}
                onClose={() => setShowAdmissionPopup(false)} 
              />
            </div>
          </div>
        )}
      </motion.div>
    </Router>
  );
}

export default App;
