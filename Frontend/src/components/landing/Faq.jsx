import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { CaretDown } from '@phosphor-icons/react';

const FAQS = [
  {
    q: 'How is this different from asking the model directly?',
    a: 'A direct chat prompt is a single instruction. This tool wraps the task in a structured brief with explicit constraints, so the model behaves consistently across subjects instead of improvising.'
  },
  {
    q: 'Does it answer the assignment for the learner?',
    a: 'No. The generated prompt is the instruction you hand to a model. You control the output through the AI usage policy and teacher rules, for example choosing explain-only or step-by-step responses.'
  },
  {
    q: 'Which AI models does the output work with?',
    a: 'Any model that reads text prompts. The output is plain, structured text, so it works with ChatGPT, Gemini, Claude, or local models without modification.'
  },
  {
    q: 'Is it free to use?',
    a: 'Yes. The tool is open source and the composer is free to use. You only need your own API key for the underlying model service.'
  },
  {
    q: 'What about academic integrity?',
    a: 'The teacher constraints are the safety net. You can forbid direct answers, code, examples, or definitions, and the pipeline folds those prohibitions into the instruction it sends.'
  }
];

export function Faq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

  const spring = reduce ? { duration: 0 } : { duration: 0.34, ease: [0.16, 1, 0.3, 1] };

  return (
    <section id="faq" className="section faq-section">
      <div className="section-head">
        <h2 className="section-title">Questions, answered</h2>
        <p className="section-desc">
          The short version of what this tool does and why it matters.
        </p>
      </div>

      <div className="faq-list">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.q}>
              <button
                type="button"
                className="faq-q"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={spring}>
                  <CaretDown size={16} weight="bold" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="a"
                    className="faq-a-wrap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={spring}
                  >
                    <p className="faq-a">{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="section-img-wrap">
        <motion.img
          className="section-img"
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80"
          alt="Team collaboration and questions"
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
