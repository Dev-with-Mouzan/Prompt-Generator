import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { CaretDown, CaretRight, ArrowRight, SpinnerGap } from '@phosphor-icons/react';

export function TextInput({ id, label, hint, value, onChange, placeholder, required }) {
  return (
    <div className="field">
      <div className="field-head">
        <label className="field-label" htmlFor={id}>
          {label}
          {required ? <span className="field-req">*</span> : null}
        </label>
      </div>
      {hint ? <p className="field-hint">{hint}</p> : null}
      <input
        id={id}
        type="text"
        className="input"
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}

export function SelectField({ id, label, hint, value, onChange, options, required, placeholder }) {
  return (
    <div className="field">
      <div className="field-head">
        <label className="field-label" htmlFor={id}>
          {label}
          {required ? <span className="field-req">*</span> : null}
        </label>
      </div>
      {hint ? <p className="field-hint">{hint}</p> : null}
      <div className="select-wrap">
        <select
          id={id}
          className="input select"
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <CaretDown className="select-chevron" size={14} weight="bold" />
      </div>
    </div>
  );
}

export function AdvancedAccordion({ children, open, onToggle, badge }) {
  const reduce = useReducedMotion();
  const spring = reduce
    ? { duration: 0 }
    : { type: 'spring', stiffness: 320, damping: 32 };

  return (
    <div className={`accordion${open ? ' is-open' : ''}`}>
      <button type="button" className="accordion-head" onClick={onToggle} aria-expanded={open}>
        <motion.span
          className="accordion-icon"
          animate={{ rotate: open ? 90 : 0 }}
          transition={spring}
        >
          <CaretRight size={13} weight="bold" />
        </motion.span>
        <span className="accordion-title">Advanced settings</span>
        {badge ? <span className="accordion-badge">{badge}</span> : null}
        <span className="accordion-label">OPTIONAL</span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="advanced-body"
            className="accordion-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="accordion-grid">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function PrimaryButton({ loading, disabled, children }) {
  const blocked = loading || disabled;
  return (
    <motion.button
      type="submit"
      className="btn-primary"
      disabled={blocked}
      whileHover={blocked ? undefined : { scale: 1.01, y: -1 }}
      whileTap={blocked ? undefined : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 480, damping: 30 }}
    >
      <motion.span
        className="btn-primary-content"
        key={loading ? 'loading' : 'idle'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        aria-live="polite"
      >
        {loading ? (
          <>
            <SpinnerGap className="spin" size={18} weight="bold" />
            <span>Composing prompt…</span>
          </>
        ) : (
          <>
            <span>{children}</span>
            <ArrowRight size={18} weight="bold" className="btn-arrow" />
          </>
        )}
      </motion.span>
    </motion.button>
  );
}