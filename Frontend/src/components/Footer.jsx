import { Link } from 'react-router-dom';

const NAV = [
  { id: 'how', label: 'How it works' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' }
];

function goToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-left">
        <span className="footer-brand">Prompt Generator</span>
        <span className="footer-line">Powered by Gemini · FastAPI · LangGraph</span>
      </div>
      <nav className="footer-nav" aria-label="Footer">
        {NAV.map((n) => (
          <button key={n.id} type="button" className="footer-link" onClick={() => goToSection(n.id)}>
            {n.label}
          </button>
        ))}
        <Link to="/app" className="footer-link">
          Composer
        </Link>
      </nav>
    </footer>
  );
}
