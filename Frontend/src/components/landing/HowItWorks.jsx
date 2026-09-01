import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const STEPS = [
  {
    verb: 'Describe',
    title: 'the task',
    body: 'Give the subject, topic, and what you want produced. An essay outline, a report, a coding exercise.'
  },
  {
    verb: 'Set',
    title: 'the guardrails',
    body: 'Pick the difficulty, how the AI may respond, word count, tone, citations, and any teacher rules.'
  },
  {
    verb: 'Get',
    title: 'the brief',
    body: 'Gemini and LangGraph resolve conflicts and return a structured Situation, Task, Objective, and Knowledge brief.'
  }
];

export function HowItWorks() {
  const reduce = useReducedMotion();
  const stepsRef = useRef(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    if (reduce) {
      setLineVisible(true);
      return;
    }
    const el = stepsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <section id="how" className="section how-section">
      <div className="section-head section-head--center">
        <motion.h2
          className="section-title"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          How it works
        </motion.h2>
        <motion.p
          className="section-desc"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Three steps abstract the whole pipeline. You stay with the writing;
          the structure takes care of itself.
        </motion.p>
      </div>

      <ol ref={stepsRef} className={`steps steps--center${lineVisible ? ' is-visible' : ''}`}>
        {STEPS.map((s, i) => (
          <motion.li
            key={s.verb + s.title}
            className="step"
            initial={reduce ? false : { opacity: 0, y: 28, x: i % 2 === 0 ? -16 : 16 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="step-mark"
              aria-hidden="true"
              initial={reduce ? false : { scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.15 + 0.1, type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="step-index">{i + 1}</span>
            </motion.span>
            <div className="step-body">
              <h3 className="step-title">
                <span className="step-verb">{s.verb}</span> {s.title}
              </h3>
              <p className="step-text">{s.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="section-img-wrap">
        <motion.img
          className="section-img"
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"
          alt="Network pipeline visualization"
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
