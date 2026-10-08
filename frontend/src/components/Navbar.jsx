import React, { useState } from 'react';
import { ShieldCheck, Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar({ currentPath, onNavigate, theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'How it works', path: '/how-it-works' },
    { label: 'Privacy', path: '/privacy' }
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <button 
          className="brand-logo" 
          onClick={() => handleNavClick('/')}
          aria-label="ClaimShield AI Home"
        >
          <ShieldCheck className="brand-icon" size={22} />
          <span>CLAIMSHIELD</span>
        </button>

        <div className="nav-actions">
          <nav>
            <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <button
                    className={`nav-link ${currentPath === item.path ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.path)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button 
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
