import { useState, useEffect } from 'react';
import './ThemeToggle.css';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={darkMode}
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? '☾' : '☀'}
    </button>
  );
}

export default ThemeToggle;
