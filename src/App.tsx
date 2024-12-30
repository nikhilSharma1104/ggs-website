import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import CampusLife from './pages/CampusLife';
import FoundationalStage from './pages/FoundationalStage';
import PreparatoryStage from './pages/PreparatoryStage';
import MiddleStage from './pages/MiddleStage';
import Prospectus from './pages/Prospectus';
import Careers from './pages/Careers';
import AdmissionPopup from './components/AdmissionPopup';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

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
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/academics" element={<PageTransition><Academics /></PageTransition>} />
              <Route path="/academics/foundational-stage" element={<PageTransition><FoundationalStage /></PageTransition>} />
              <Route path="/academics/preparatory-stage" element={<PageTransition><PreparatoryStage /></PageTransition>} />
              <Route path="/academics/middle-stage" element={<PageTransition><MiddleStage /></PageTransition>} />
              <Route path="/admissions" element={<PageTransition><Admissions /></PageTransition>} />
              <Route path="/campus-life" element={<PageTransition><CampusLife /></PageTransition>} />
              <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
              <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/prospectus" element={<PageTransition><Prospectus /></PageTransition>} />
              <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
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
      </div>
    </Router>
  );
}

export default App;
