import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Report from './pages/Report';
import HowItWorks from './pages/HowItWorks';
import Privacy from './pages/Privacy';
import { MOCK_CLAIM_DATA } from './data/mockClaimData';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('claimshield_theme') || 'dark';
  });
  const [claimContext, setClaimContext] = useState(null);
  const [reportData, setReportData] = useState(MOCK_CLAIM_DATA);

  // Synchronize theme attribute on root element & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('claimshield_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const navigate = (path) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAnalysis = (userInput) => {
    setClaimContext(userInput);
    navigate('/analyze');
  };

  const handleAnalysisComplete = () => {
    navigate('/report');
  };

  const handleStartOver = () => {
    setClaimContext(null);
    navigate('/');
  };

  const renderCurrentView = () => {
    switch (currentPath) {
      case '/analyze':
        return <Analyze onAnalysisComplete={handleAnalysisComplete} />;
      case '/report':
        return <Report reportData={reportData} onStartOver={handleStartOver} />;
      case '/how-it-works':
        return <HowItWorks onGoHome={() => navigate('/')} />;
      case '/privacy':
        return <Privacy />;
      case '/':
      default:
        return <Home onStartAnalysis={handleStartAnalysis} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar 
        currentPath={currentPath} 
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {renderCurrentView()}

      <footer className="footer">
        <div style={{ 
          maxWidth: 'var(--max-width-wide)', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              <ShieldCheck size={16} style={{ color: 'var(--color-accent)' }} />
              <span>CLAIMSHIELD</span>
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Understand your policy. Protect your claim.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8125rem' }}>
            <button onClick={() => navigate('/how-it-works')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              How it works
            </button>
            <button onClick={() => navigate('/privacy')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              Privacy
            </button>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              GitHub
            </a>
          </div>
        </div>

        <div style={{ 
          maxWidth: 'var(--max-width-wide)', 
          margin: '0.85rem auto 0', 
          paddingTop: '0.85rem', 
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>
          AI-assisted analysis · Not legal advice
        </div>
      </footer>
    </div>
  );
}
