import { motion, useReducedMotion } from 'motion/react';

const BODY = [
  ['Situation', 'You are studying Biology and need to understand cellular respiration as a foundational process linking energy, food, and life.'],
  ['Task', 'Produce a structured explanation of cellular respiration suitable for a first-semester undergraduate.']
];

const BULLETS = [
  'The inputs and outputs of glycolysis, the Krebs cycle, and oxidative phosphorylation.',
  'The role of ATP as the cell\u2019s energy currency and why it matters.',
  'How the stages connect into a single pathway.'
];

export function Example() {
  const reduce = useReducedMotion();

  return (
    <section id="example" className="section example-section">
      <div className="section-head">
        <h2 className="section-title">The kind of brief it produces</h2>
        <p className="section-desc">
          A look at the output for a straightforward request. Every prompt is
          delivered as clean text you can paste straight into a model.
        </p>
      </div>

      <motion.div
        className="example-card"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="example-topbar">
          <span className="example-label">Sample output</span>
          <span className="example-model">Biology · Report</span>
        </div>
        <div className="example-body">
          {BODY.map(([label, text]) => (
            <div className="example-block" key={label}>
              <h3 className="example-block-title">{label}</h3>
              <p>{text}</p>
            </div>
          ))}
          <div className="example-block">
            <h3 className="example-block-title">Knowledge</h3>
            <ul>
              {BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="section-img-wrap">
        <motion.img
          className="section-img"
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80"
          alt="Structured document output"
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
