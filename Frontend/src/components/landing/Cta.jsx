import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export function Cta() {
  const reduce = useReducedMotion();

  return (
    <section className="cta">
      <motion.div
        className="cta-card"
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="cta-title">Ready to compose your next prompt?</h2>
        <p className="cta-desc">
          Turn your next question into a structured, teacher-safe brief in
          under a minute.
        </p>
        <Link to="/app" className="btn-hero-primary cta-btn">
          <span>Open the composer</span>
          <ArrowRight size={18} weight="bold" />
        </Link>
      </motion.div>
      <div className="section-img-wrap">
        <motion.img
          className="section-img"
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80"
          alt="Creative workspace"
          loading="lazy"
          initial={reduce ? false : { scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </section>
  );
}
