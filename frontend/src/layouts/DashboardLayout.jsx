// src/layouts/DashboardLayout.jsx

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import './DashboardLayout.css';

/**
 * Premium Dashboard Layout
 * Responsive sidebar with modern navigation
 */
function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/projects', label: 'Projects', icon: '📁' },
    { path: '/saved-projects', label: 'Saved Projects', icon: '💾' },
    { path: '/templates', label: 'Templates', icon: '🎨' },
    { path: '/ai-project-generator', label: 'AI Generator', icon: '✨' },
    { path: '/project-analyzer', label: 'Analyzer', icon: '🔍' },
    { path: '/chat', label: 'AI Assistant', icon: '💬' },
    { path: '/billing', label: 'Billing', icon: '💳' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {/* Responsive Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🚀</span>
            {sidebarOpen && <span className="logo-text">ProjectMaker</span>}
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              title={item.label}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/profile" className="sidebar-user" title="Profile">
            <div className="user-avatar">👤</div>
            {sidebarOpen && <span>Profile</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content">
        <Breadcrumb />
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;