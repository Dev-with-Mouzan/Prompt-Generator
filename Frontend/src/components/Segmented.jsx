import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export function Segmented({ id, label, hint, options, value, onChange }) {
  const reduce = useReducedMotion();

  return (
    <div className="field">
      <div className="field-head">
        <label className="field-label" id={`${id}-label`}>
          {label}
        </label>
      </div>
      {hint ? <p className="field-hint">{hint}</p> : null}
      <div
        className="seg"
        role="radiogroup"
        aria-labelledby={`${id}-label`}
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              className={`seg-btn${active ? ' is-active' : ''}`}
              onClick={() => onChange(opt.value)}
            >
              {active ? (
                <motion.span
                  layoutId={`seg-fill-${id}`}
                  className="seg-fill"
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 460, damping: 38 }}
                />
              ) : null}
              <span className="seg-label">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}