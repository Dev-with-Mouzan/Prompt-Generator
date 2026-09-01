import { Routes, Route } from 'react-router-dom';
import { Background } from './components/Background.jsx';
import { Header } from './components/Header.jsx';
import { Home } from './components/landing/Home.jsx';
import { ToolPage } from './components/ToolPage.jsx';
import { useTheme } from './lib/useTheme.js';

export default function App() {
  return (
    <>
      <Background />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<ToolPage />} />
      </Routes>
    </>
  );
}
