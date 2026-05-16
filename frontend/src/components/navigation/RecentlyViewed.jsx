// src/components/navigation/RecentlyViewed.jsx

import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavigationContext } from '../../context/NavigationContext';
import './RecentlyViewed.css';

/**
 * Recently Viewed Projects Component
 * Shows recently accessed projects for quick access
 */
function RecentlyViewed() {
  const { recentPages } = useContext(NavigationContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Filter for project pages
    const projectPages = recentPages.filter(page =>
      page.path.includes('projects') || page.path.includes('editor')
    ).slice(0, 5);

    setProjects(projectPages);
  }, [recentPages]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed">
      <div className="recently-viewed-header">
        <h3>Recently Viewed</h3>
        <Link to="/saved-projects" className="view-all-link">
          View All →
        </Link>
      </div>

      <div className="recently-viewed-list">
        {projects.map((project, index) => (
          <Link
            key={index}
            to={project.path}
            className="recently-viewed-item"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="project-icon">📄</div>
            <div className="project-info">
              <div className="project-name">{project.label || 'Project'}</div>
              <div className="project-time">
                {new Date(project.timestamp).toLocaleDateString()}
              </div>
            </div>
            <svg className="project-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;
