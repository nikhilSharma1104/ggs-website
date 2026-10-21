import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

import AdmissionPopup from './components/AdmissionPopup';
import IntroCurtain from './components/IntroCurtain';
import { AdmissionContext } from './components/AdmissionContext';
import { FloatingActions, ScrollProgress } from './components/widgets';

// Inner pages load on demand so phones only download the page being viewed.
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Contact = lazy(() => import('./pages/Contact'));
const Events = lazy(() => import('./pages/Events'));
const Gallery = lazy(() => import('./pages/Gallery'));
const CampusLife = lazy(() => import('./pages/CampusLife'));
const FoundationalStage = lazy(() => import('./pages/FoundationalStage'));
const PreparatoryStage = lazy(() => import('./pages/PreparatoryStage'));
const MiddleStage = lazy(() => import('./pages/MiddleStage'));
const Prospectus = lazy(() => import('./pages/Prospectus'));
const Careers = lazy(() => import('./pages/Careers'));
const NotFound = lazy(() => import('./pages/NotFound'));
const loadJourney = () => import('./components/journey/JourneyGame');
const JourneyGame = lazy(loadJourney);
const AssistantPanel = lazy(() => import('./components/assistant/AssistantPanel'));

const POPUP_KEY = 'ggs-admission-popup-dismissed';
const JOURNEY_KEY = 'ggs-journey-done';

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

  const page = (el: React.ReactNode) => (
    <PageTransition>
      <Suspense fallback={<div className="min-h-[100svh] bg-ink-950" />}>{el}</Suspense>
    </PageTransition>
  );

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

// Search engines, Lighthouse and other automated visitors go straight to content.
export const isAutomated = () =>
  typeof navigator !== 'undefined' && (navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(navigator.userAgent));

const readFlag = (store: 'local' | 'session', key: string) => {
  try {
    return (store === 'local' ? localStorage : sessionStorage).getItem(key) === '1';
  } catch {
    return false;
  }
};
const setFlag = (store: 'local' | 'session', key: string) => {
  try {
    (store === 'local' ? localStorage : sessionStorage).setItem(key, '1');
  } catch {
    /* ignore */
  }
};

const Shell: React.FC = () => {
  const location = useLocation();
  const [popupOpen, setPopupOpen] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const journeyShownRef = useRef(false);
  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;

  // Fetch the journey code while the intro curtain plays.
  useEffect(() => {
    loadJourney();
  }, []);

  const openAdmission = useCallback(() => setPopupOpen(true), []);
  const closeAdmission = useCallback(() => {
    setPopupOpen(false);
    setFlag('session', POPUP_KEY);
  }, []);
  const openJourney = useCallback(() => setJourneyOpen(true), []);
  const closeJourney = useCallback(() => {
    setJourneyOpen(false);
    setFlag('session', JOURNEY_KEY);
    // the journey ends on its own admissions call-to-action
    setFlag('session', POPUP_KEY);
  }, []);
  const openAssistant = useCallback(() => setAssistantOpen(true), []);

  // Opening the website starts the Gurukul Journey game;
  // otherwise invite to admissions once per session.
  useEffect(() => {
    if (!introDone || isAutomated()) return;
    // Every new visit to the home page opens with the journey (once per browser
    // session); ?journey forces it, e.g. for sharing or testing.
    const forced = new URLSearchParams(window.location.search).has('journey');
    if (forced || (!readFlag('session', JOURNEY_KEY) && pathRef.current === '/')) {
      journeyShownRef.current = true;
      setJourneyOpen(true);
      return;
    }
    if (readFlag('session', POPUP_KEY)) return;
    const t = setTimeout(() => {
      if (pathRef.current !== '/admissions' && !journeyShownRef.current) setPopupOpen(true);
    }, 4000);
    return () => clearTimeout(t);
  }, [introDone]);

  const ctx = useMemo(() => ({ openAdmission, openJourney, openAssistant }), [openAdmission, openJourney, openAssistant]);

  return (
    <AdmissionContext.Provider value={ctx}>
      <IntroCurtain onDone={() => setIntroDone(true)} skip={isAutomated()} />
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        <Navbar onApply={openAdmission} />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
      <FloatingActions onAdmissions={openAdmission} onAssistant={openAssistant} />
      <AdmissionPopup isOpen={popupOpen} onClose={closeAdmission} />
      <Suspense fallback={null}>
        {journeyOpen && <JourneyGame open={journeyOpen} onClose={closeJourney} onApply={openAdmission} onAsk={openAssistant} />}
        {assistantOpen && <AssistantPanel open={assistantOpen} onClose={() => setAssistantOpen(false)} />}
      </Suspense>
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
