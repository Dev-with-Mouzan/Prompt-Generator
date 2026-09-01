import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Copy, Check, ArrowUpRight } from '@phosphor-icons/react';
import { marked } from 'marked';

marked.use({ breaks: true, gfm: true });

const STATE_META = {
  idle: { chip: 'Standby' },
  loading: { chip: 'Composing' },
  success: { chip: 'Ready' },
  error: { chip: 'Failed' }
};

export function Output({ status, result, error, onRetry }) {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status !== 'success') setCopied(false);
  }, [status, result]);

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  const chip = STATE_META[status]?.chip ?? 'Standby';

  return (
    <motion.section
      className="card output"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="output-head">
        <span className="output-title">Result</span>
        <span className={`status-chip is-${status}`} aria-live="polite">
          {chip}
        </span>
      </div>

      <div className="output-body">
        <AnimatePresence mode="wait">
          {status === 'idle' ? (
            <motion.div
              key="idle"
              className="state"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="empty-mark" aria-hidden="true">
                <span className="empty-glyph">
                  &rsaquo;<span className="empty-caret">_</span>
                </span>
              </div>
              <p className="state-title">Nothing rendered yet</p>
              <p className="state-hint">
                The composed prompt lands here,
                ready to be copied into any model.
              </p>
              <div className="empty-skeleton" aria-hidden="true">
                <span className="sk sk--wide" />
                <span className="sk" />
                <span className="sk sk--med" />
                <span className="sk" />
                <span className="sk sk--narrow" />
              </div>
            </motion.div>
          ) : null}

          {status === 'loading' ? (
            <motion.div
              key="loading"
              className="state"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p className="composing-line" aria-live="polite">
                <span className="composing-dot" />
                Composing structured brief&hellip;
              </p>
              <div className="loading-sk" aria-hidden="true">
                <span className="sk-body" />
                <span className="sk-body" />
                <span className="sk-body" />
                <span className="sk-body" />
                <span className="sk-body sk--third" />
              </div>
            </motion.div>
          ) : null}

          {status === 'success' ? (
            <motion.div
              key="success"
              className="state state--result"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="result-toolbar">
                <motion.button
                  type="button"
                  className="btn-copy"
                  onClick={handleCopy}
                  disabled={!result}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  aria-live="polite"
                >
                  <AnimatePresence initial={false} mode="wait">
                    {copied ? (
                      <motion.span
                        key="ok"
                        className="btn-copy-label"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.16 }}
                      >
                        <Check size={15} weight="bold" />
                        <span>Copied</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        className="btn-copy-label"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.16 }}
                      >
                        <Copy size={15} />
                        <span>Copy</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: marked.parse(result) }}
              />
            </motion.div>
          ) : null}

          {status === 'error' ? (
            <motion.div
              key="error"
              className="state"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="state-title error-title">Composition failed</p>
              <p className="state-hint">{error}</p>
              <motion.button
                type="button"
                className="btn-retry"
                onClick={onRetry}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <ArrowUpRight size={15} weight="bold" />
                <span>Try again</span>
              </motion.button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
