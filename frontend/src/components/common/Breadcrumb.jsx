// src/components/common/Breadcrumb.jsx

import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

/**
 * Smart Breadcrumb Navigation
 * Provides context-aware breadcrumb trails
 */
function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Map routes to readable labels
  const breadcrumbLabels = {
    'dashboard': 'Dashboard',
    'projects': 'Projects',
    'saved-projects': 'Saved Projects',
    'ai-project-generator': 'AI Generator',
    'project-analyzer': 'Project Analyzer',
    'templates': 'Templates',
    'editor': 'Editor',
    'preview': 'Preview',
    'settings': 'Settings',
    'profile': 'Profile',
    'pricing': 'Pricing',
    'billing': 'Billing',
    'analytics': 'Analytics',
    'chat': 'AI Assistant',
    'favorites': 'Favorites',
  };

  // Don't show breadcrumb on home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">
            <svg className="breadcrumb-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            Home
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const label = breadcrumbLabels[value] || value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <li key={to} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
              <span className="breadcrumb-separator">/</span>
              {isLast ? (
                <span className="breadcrumb-current">{label}</span>
              ) : (
                <Link to={to} className="breadcrumb-link">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
