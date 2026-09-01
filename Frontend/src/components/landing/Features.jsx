import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowsClockwise,
  SealCheck,
  Stack,
  TextT,
  Ruler,
  Quotes
} from '@phosphor-icons/react';

const PIPELINE = ['Validate', 'Normalize', 'Resolve', 'Generate', 'Guard'];

/* Each cell gets a unique entrance: direction, delay, and scale */
const CELLS = [
  { dir: { x: -40, y: 30 }, delay: 0, scale: 0.92 },
  { dir: { x: 0, y: 30 }, delay: 0.08, scale: 0.95 },
  { dir: { x: 40, y: 30 }, delay: 0.16, scale: 0.95 },
  { dir: { x: -30, y: 20 }, delay: 0.24, scale: 0.95 },
  { dir: { x: 30, y: 20 }, delay: 0.32, scale: 0.95 },
  { dir: { x: 0, y: 40 }, delay: 0.40, scale: 0.93 },
];

const EASE = [0.16, 1, 0.3, 1];

export function Features() {
  const reduce = useReducedMotion();

  const reveal = (i) => {
    const c = CELLS[i];
    return {
      initial: reduce ? false : { opacity: 0, ...c.dir, scale: c.scale },
      whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
      viewport: { once: true, amount: 0.25 },
      transition: {
        duration: 0.7,
        delay: c.delay,
        ease: EASE,
      },
    };
  };

  const iconReveal = (i) => ({
    initial: reduce ? false : { scale: 0, rotate: -30 },
    whileInView: { scale: 1, rotate: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: {
      duration: 0.5,
      delay: CELLS[i].delay + 0.15,
      type: 'spring',
      stiffness: 260,
      damping: 18,
    },
  });

  return (
    <section id="features" className="section features-section">
      <div className="section-head">
        <motion.h2
          className="section-title"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Everything worth controlling
        </motion.h2>
        <motion.p
          className="section-desc"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          The composer is a focused set of controls. Each one feeds directly
          into how the model is told to respond.
        </motion.p>
      </div>

      <div className="bento">
        <motion.article
          className="bento-cell bento-cell--lead"
          {...reveal(0)}
        >
          <motion.div {...iconReveal(0)}>
            <SealCheck className="bento-icon" size={28} weight="duotone" />
          </motion.div>
          <h3 className="bento-title">A consistent structure</h3>
          <p className="bento-text">
            Every brief follows the same architecture: Situation, Task,
            Objective, and a focused list of knowledge points. No two requests
            drift apart in format.
          </p>
          <span className="pill">Situation</span>
          <span className="pill">Task</span>
          <span className="pill">Objective</span>
        </motion.article>

        <motion.article className="bento-cell" {...reveal(1)}>
          <motion.div {...iconReveal(1)}>
            <TextT className="bento-icon" size={26} weight="duotone" />
          </motion.div>
          <h3 className="bento-title">Tone and level</h3>
          <p className="bento-text">
            Set an academic tone and a difficulty so the depth matches the
            audience.
          </p>
        </motion.article>

        <motion.article className="bento-cell bento-cell--guard" {...reveal(2)}>
          <motion.div {...iconReveal(2)}>
            <ArrowsClockwise className="bento-icon" size={26} weight="duotone" />
          </motion.div>
          <h3 className="bento-title">Conflict-aware rules</h3>
          <p className="bento-text">
            Teacher constraints and AI usage policy are merged. Contradictions
            are resolved before the prompt is built.
          </p>
        </motion.article>

        <motion.article className="bento-cell" {...reveal(3)}>
          <motion.div {...iconReveal(3)}>
            <Quotes className="bento-icon" size={26} weight="duotone" />
          </motion.div>
          <h3 className="bento-title">Format and citations</h3>
          <p className="bento-text">
            Request an essay, an outline, or APA and MLA citations in one line.
          </p>
        </motion.article>

        <motion.article className="bento-cell" {...reveal(4)}>
          <motion.div {...iconReveal(4)}>
            <Ruler className="bento-icon" size={26} weight="duotone" />
          </motion.div>
          <h3 className="bento-title">Word count control</h3>
          <p className="bento-text">
            Cap the response so briefs stay as long or as short as the task
            needs.
          </p>
        </motion.article>

        <motion.article className="bento-cell bento-cell--pipeline" {...reveal(5)}>
          <motion.div {...iconReveal(5)}>
            <Stack className="bento-icon" size={26} weight="duotone" />
          </motion.div>
          <h3 className="bento-title">A real pipeline</h3>
          <p className="bento-text">
            The prompt passes through guarded stages before it reaches you, not
            a single raw call.
          </p>
          <div className="pipe" aria-hidden="true">
            {PIPELINE.map((node, i) => (
              <motion.div
                className="pipe-node"
                key={node}
                initial={reduce ? false : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: EASE }}
              >
                <span className="pipe-chip">{node}</span>
                {i < PIPELINE.length - 1 ? <span className="pipe-arrow">&rarr;</span> : null}
              </motion.div>
            ))}
          </div>
        </motion.article>
      </div>

      <div className="section-img-wrap">
        <motion.img
          className="section-img"
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
          alt="Code editor with structured controls"
          loading="lazy"
          initial={reduce ? false : { scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </div>
    </section>
  );
}
