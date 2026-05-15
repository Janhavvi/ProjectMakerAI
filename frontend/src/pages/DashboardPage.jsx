// src/pages/DashboardPage.jsx

import { Link, useNavigate } from 'react-router-dom';
import './DashboardPage.css';

function DashboardPage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  const userName = storedUser?.name || 'Creator';

  const stats = [
    { label: 'Generated sites', value: '12', change: '+4 this week' },
    { label: 'Exports', value: '8', change: '3 React builds' },
    { label: 'Live edits', value: '36', change: 'AI assisted' },
    { label: 'Deployments', value: '5', change: 'Vercel + Netlify' }
  ];

  const projects = [
    {
      title: 'WeatherScope',
      type: 'Weather app',
      status: 'Ready to export',
      progress: 92,
      tags: ['API logic', 'Forecast', 'Responsive']
    },
    {
      title: 'FitForge',
      type: 'Fitness website',
      status: 'Live editing',
      progress: 78,
      tags: ['Pricing', 'Trainers', 'Animations']
    },
    {
      title: 'EduLaunch',
      type: 'Education landing',
      status: 'Draft',
      progress: 64,
      tags: ['Courses', 'Admissions', 'Faculty']
    }
  ];

  const activities = [
    'Generated a weather app with API logic',
    'Exported FitForge as HTML',
    'Applied cyberpunk theme transform',
    'Added smart sections to EduLaunch'
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-brand">ProjectMaker AI</Link>

        <nav className="dashboard-nav">
          <a href="#overview" className="active">Overview</a>
          <a href="#projects">Projects</a>
          <a href="#activity">Activity</a>
          <Link to="/generate">Generator</Link>
        </nav>

        <div className="sidebar-card">
          <span>Current plan</span>
          <strong>Creator</strong>
          <p>AI generation, live edits, previews, and exports are enabled.</p>
        </div>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header" id="overview">
          <div>
            <span className="dashboard-kicker">Dashboard</span>
            <h1>Welcome back, {userName}</h1>
            <p>Track generated websites, continue edits, and ship production-ready exports.</p>
          </div>

          <div className="dashboard-actions">
            <Link to="/generate" className="primary-action">Create Website</Link>
            <button type="button" className="ghost-action" onClick={logout}>Logout</button>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.change}</p>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <div className="projects-panel" id="projects">
            <div className="section-title">
              <div>
                <span>Projects</span>
                <h2>Recent generated websites</h2>
              </div>
              <Link to="/generate">New project</Link>
            </div>

            <div className="project-list">
              {projects.map((project) => (
                <article className="dashboard-project-card" key={project.title}>
                  <div className="project-topline">
                    <div>
                      <span>{project.type}</span>
                      <h3>{project.title}</h3>
                    </div>
                    <strong>{project.status}</strong>
                  </div>

                  <div className="progress-track">
                    <span style={{ width: `${project.progress}%` }}></span>
                  </div>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <Link to="/generate">Open</Link>
                    <button type="button">Export</button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="activity-panel" id="activity">
            <div className="section-title compact">
              <div>
                <span>Activity</span>
                <h2>Recent work</h2>
              </div>
            </div>

            <div className="activity-list">
              {activities.map((activity, index) => (
                <div className="activity-item" key={activity}>
                  <span>{index + 1}</span>
                  <p>{activity}</p>
                </div>
              ))}
            </div>

            <div className="next-step-card">
              <span>Next best step</span>
              <h3>Generate a complete app page</h3>
              <p>Try a weather, finance, portfolio, or dashboard prompt with live edit instructions.</p>
              <Link to="/generate">Open generator</Link>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

export default DashboardPage;
