// src/components/common/ThemeToggle.jsx

import { useState, useEffect } from 'react';
import './ThemeToggle.css';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;