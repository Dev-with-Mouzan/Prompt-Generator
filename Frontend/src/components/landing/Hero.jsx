import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowDown } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export function Hero() {
  const reduce = useReducedMotion();

  function scrollToHow() {
    document.getElementById('how')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-copy">
        <motion.h1
          className="hero-title"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Compose a precise
          <br />
          <em className="hero-em">prompt.</em>
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          Describe the task and set the guardrails. The result is a clean,
          teacher-safe brief you can paste into any model.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/app" className="btn-hero-primary">
            <span>Open the composer</span>
            <ArrowRight size={18} weight="bold" />
          </Link>
          <button type="button" className="btn-hero-ghost" onClick={scrollToHow}>
            <ArrowDown size={16} weight="bold" />
            <span>See how it works</span>
          </button>
        </motion.div>
      </div>


    </section>
  );
}
