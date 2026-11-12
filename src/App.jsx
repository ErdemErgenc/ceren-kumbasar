import React, { useState, useEffect, useRef } from 'react';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Masthead from './components/Masthead';
import Ticker from './components/Ticker';
import FrontPage from './components/FrontPage';
import AboutSection from './components/AboutSection';
import ArchiveSection from './components/ArchiveSection';
import PhotoBand from './components/PhotoBand';
import StageSection from './components/StageSection';
import ProjectsSection from './components/ProjectsSection';
import ArticlesSection from './components/ArticlesSection';
import ContactSection from './components/ContactSection';
import Toast from './components/Toast';

export default function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal:not(.in)');
    revealElements.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        İçeriğe geç
      </a>

      <Topbar />
      <Navbar />

      <main id="main">
        <Masthead />
        <Ticker />
        <FrontPage />
        <AboutSection />
        <ArchiveSection />
        <PhotoBand />
        <StageSection />
        <ProjectsSection />
        <ArticlesSection />
        <ContactSection onShowToast={showToast} />
      </main>

      <Toast message={toastMessage} visible={toastVisible} />
    </>
  );
}

