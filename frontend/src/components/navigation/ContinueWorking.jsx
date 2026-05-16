// src/components/navigation/ContinueWorking.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ContinueWorking.css';

/**
 * Continue Working Component
 * Shows the current project being worked on
 */
function ContinueWorking() {
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    // Get current project from localStorage or context
    const saved = localStorage.getItem('currentProject');
    if (saved) {
      try {
        setCurrentProject(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing current project:', e);
      }
    }
  }, []);

  if (!currentProject) {
    return null;
  }

  return (
    <div className="continue-working">
      <div className="continue-header">
        <div className="continue-icon">▶</div>
        <div>
          <h3>Continue Working</h3>
          <p>Pick up where you left off</p>
        </div>
      </div>

      <Link to={currentProject.path} className="continue-project">
        <div className="project-preview">
          <div className="preview-icon">{currentProject.icon || '📄'}</div>
          <div className="preview-info">
            <div className="preview-name">{currentProject.name}</div>
            <div className="preview-type">{currentProject.type || 'Project'}</div>
          </div>
        </div>

        <div className="continue-action">
          <span>Continue</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </Link>
    </div>
  );
}

export default ContinueWorking;
