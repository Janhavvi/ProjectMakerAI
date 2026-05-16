// src/components/navigation/QuickActions.jsx

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavigationContext } from '../../context/NavigationContext';
import './QuickActions.css';

/**
 * Smart Quick Actions Component
 * Context-aware actions based on current page
 */
function QuickActions() {
  const { getQuickActions } = useContext(NavigationContext);
  const actions = getQuickActions();

  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="quick-actions">
      <div className="quick-actions-header">
        <h3>Quick Actions</h3>
      </div>
      <div className="quick-actions-grid">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="quick-action-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
