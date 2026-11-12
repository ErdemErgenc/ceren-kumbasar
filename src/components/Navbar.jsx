import React, { useState, useEffect, useCallback } from 'react';

const SECTIONS = ['hakkinda', 'arsiv', 'sahne', 'ilanlar', 'yazilar', 'iletisim'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('ck-theme');
      if (savedTheme) {
        document.documentElement.dataset.theme = savedTheme;
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextTheme = isDark ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    try {
      localStorage.setItem('ck-theme', nextTheme);
    } catch {
      // ignore
    }
  };

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? y / docHeight : 0;
    setScrollProgress(progress);

    const mast = document.querySelector('.mast');
    if (mast) {
      const mastBottom = mast.offsetTop + mast.offsetHeight - 60;
      setIsStuck(y > mastBottom);
    }

    let cur = '';
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) {
        cur = id;
      }
    }
    setActiveSection(cur);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleScroll]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`nav ${isStuck ? 'stuck' : ''}`} id="nav" aria-label="Ana menü">
      <div className="wrap">
        <a className="brand" href="#top" onClick={closeMenu}>
          Ceren Kumbasar
        </a>
        <ul id="menu" className={menuOpen ? 'open' : ''}>
          <li>
            <a
              href="#hakkinda"
              className={activeSection === 'hakkinda' ? 'active' : ''}
              onClick={closeMenu}
            >
              Hakkında
            </a>
          </li>
          <li>
            <a
              href="#arsiv"
              className={activeSection === 'arsiv' ? 'active' : ''}
              onClick={closeMenu}
            >
              Arşiv
            </a>
          </li>
          <li>
            <a
              href="#sahne"
              className={activeSection === 'sahne' ? 'active' : ''}
              onClick={closeMenu}
            >
              Sahne
            </a>
          </li>
          <li>
            <a
              href="#ilanlar"
              className={activeSection === 'ilanlar' ? 'active' : ''}
              onClick={closeMenu}
            >
              Projeler
            </a>
          </li>
          <li>
            <a
              href="#yazilar"
              className={activeSection === 'yazilar' ? 'active' : ''}
              onClick={closeMenu}
            >
              Yazılar
            </a>
          </li>
          <li>
            <a
              href="#iletisim"
              className={activeSection === 'iletisim' ? 'active' : ''}
              onClick={closeMenu}
            >
              İletişim
            </a>
          </li>
        </ul>
        <div className="nav-r">
          <button
            className="ibtn"
            id="theme"
            aria-label="Açık/koyu tema"
            type="button"
            onClick={toggleTheme}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
            </svg>
          </button>
          <button
            className="ibtn mbtn"
            id="mbtn"
            aria-label="Menü"
            aria-expanded={menuOpen}
            aria-controls="menu"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>
      <span
        className="progress"
        id="progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </nav>
  );
}

