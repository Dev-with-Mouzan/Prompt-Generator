import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Sun, Moon, ArrowRight } from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../lib/useTheme.js';

const SECTIONS = [
  { id: 'how', label: 'How it works' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' }
];

export function BrandMark({ size = 'md' }) {
  return (
    <span className={`brand-mark brand-mark--${size}`} aria-hidden="true">
      <span className="brand-mark-frame">
        <span className="brand-mark-glyph">
          &rsaquo;<span className="brand-mark-caret">_</span>
        </span>
      </span>
    </span>
  );
}

export function Header() {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const { pathname } = useLocation();

  function goToSection(id) {
    if (pathname !== '/') {
      window.location.hash = '#/';
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      }, 60);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    }
  }

  return (
    <header className="site-header">
      <div className="site-header-row">
        <Link to="/" className="brand-lockup" aria-label="Prompt Generator home">
          <BrandMark />
          <div className="brand-text">
            <motion.span
              className="brand-wordmark"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Prompt Generator
            </motion.span>
            <span className="brand-tagline">Precise AI prompts</span>
          </div>
        </Link>

        <div className="header-end">
          <nav className="site-nav" aria-label="Primary">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                className="nav-link"
                onClick={() => goToSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>
          <Link to="/app" className="nav-cta">
            <span>Open composer</span>
            <ArrowRight size={15} weight="bold" />
          </Link>
          <motion.button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <AnimatePresence initial={false} mode="wait">
              {theme === 'dark' ? (
                <motion.span
                  key="moon"
                  className="theme-icon"
                  initial={reduce ? false : { rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sun size={17} weight="bold" />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  className="theme-icon"
                  initial={reduce ? false : { rotate: 90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { rotate: -90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                >
                  <Moon size={17} weight="bold" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
