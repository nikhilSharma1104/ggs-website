import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
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
import NotFound from './pages/NotFound';
import AdmissionPopup from './components/AdmissionPopup';
import IntroCurtain from './components/IntroCurtain';
import { AdmissionContext } from './components/AdmissionContext';
import { FloatingActions, ScrollProgress } from './components/widgets';

const POPUP_KEY = 'ggs-admission-popup-dismissed';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const page = (el: React.ReactNode) => <PageTransition>{el}</PageTransition>;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={page(<Home />)} />
        <Route path="/about" element={page(<About />)} />
        <Route path="/academics" element={page(<Academics />)} />
        <Route path="/academics/foundational-stage" element={page(<FoundationalStage />)} />
        <Route path="/academics/preparatory-stage" element={page(<PreparatoryStage />)} />
        <Route path="/academics/middle-stage" element={page(<MiddleStage />)} />
        <Route path="/admissions" element={page(<Admissions />)} />
        <Route path="/campus-life" element={page(<CampusLife />)} />
        <Route path="/events" element={page(<Events />)} />
        <Route path="/gallery" element={page(<Gallery />)} />
        <Route path="/contact" element={page(<Contact />)} />
        <Route path="/prospectus" element={page(<Prospectus />)} />
        <Route path="/careers" element={page(<Careers />)} />
        <Route path="*" element={page(<NotFound />)} />
      </Routes>
    </AnimatePresence>
  );
};

const Shell: React.FC = () => {
  const location = useLocation();
  const [popupOpen, setPopupOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;

  const openAdmission = useCallback(() => setPopupOpen(true), []);
  const closeAdmission = useCallback(() => {
    setPopupOpen(false);
    try {
      sessionStorage.setItem(POPUP_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  // Auto-invite once per session, a few seconds after the intro finishes.
  useEffect(() => {
    if (!introDone) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(POPUP_KEY) === '1';
    } catch {
      /* ignore */
    }
    if (dismissed) return;
    const t = setTimeout(() => {
      if (pathRef.current !== '/admissions') setPopupOpen(true);
    }, 4000);
    return () => clearTimeout(t);
  }, [introDone]);

  const ctx = useMemo(() => ({ openAdmission }), [openAdmission]);

  return (
    <AdmissionContext.Provider value={ctx}>
      <IntroCurtain onDone={() => setIntroDone(true)} />
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        <Navbar onApply={openAdmission} />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
      <FloatingActions onAdmissions={openAdmission} />
      <AdmissionPopup isOpen={popupOpen} onClose={closeAdmission} />
    </AdmissionContext.Provider>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Shell />
      </Router>
    </HelmetProvider>
  );
}

export default App;
