import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Composer } from './Composer.jsx';
import { Output } from './Output.jsx';
import { generatePrompt } from '../lib/api.js';

export function ToolPage() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const lastPayload = useRef(null);

  async function handleGenerate(payload) {
    lastPayload.current = payload;
    setStatus('loading');
    setResult('');
    setError('');
    try {
      const prompt = await generatePrompt(payload);
      setResult(prompt);
      setStatus('success');
    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  }

  function handleRetry() {
    if (lastPayload.current) handleGenerate(lastPayload.current);
  }

  return (
    <main className="page app-page">
      <div className="toolbar">
        <motion.h1
          className="tool-heading"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Compose a precise prompt
        </motion.h1>
        <motion.p
          className="tool-desc"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Describe the task and set the guardrails. The result is a clean,
          teacher-safe brief you can paste into any model.
        </motion.p>
      </div>

      <div className="layout">
        <Composer onGenerate={handleGenerate} busy={status === 'loading'} />
        <Output status={status} result={result} error={error} onRetry={handleRetry} />
      </div>

      <footer className="site-footer">
        <span className="footer-line">Powered by Gemini</span>
      </footer>
    </main>
  );
}
