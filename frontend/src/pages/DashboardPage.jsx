// src/pages/DashboardPage.jsx

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  deleteProject,
  duplicateProject,
  getProjectAnalytics,
  getProjects,
  updateProject
} from '../services/projectService';
import './DashboardPage.css';

const fallbackProjects = [
  {
    _id: 'starter-1',
    title: 'AI SaaS Launchpad',
    prompt: 'Create a Vercel style AI SaaS landing page',
    folder: 'Landing page',
    status: 'Template',
    favorite: true,
    tags: ['Vercel', 'SaaS', 'Premium'],
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'starter-2',
    title: 'Studio Dashboard',
    prompt: 'Generate a glassmorphism dashboard for creators',
    folder: 'Dashboard',
    status: 'Template',
    favorite: false,
    tags: ['Dashboard', 'Analytics', 'Teams'],
    updatedAt: new Date().toISOString()
  }
];

const workspaceTabs = [
  'overview',
  'projects',
  'analytics',
  'chat',
  'billing',
  'settings'
];

function DashboardPage({ initialView = 'overview' }) {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  const [userName] = useState(storedUser?.name || 'Creator');
  const [activeView, setActiveView] = useState(
    workspaceTabs.includes(initialView) ? initialView : 'overview'
  );
  const [projects, setProjects] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [query, setQuery] = useState('');
  const [folder, setFolder] = useState('All');
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  const loadWorkspace = async () => {
    try {
      setLoading(true);
      const [projectData, analyticsData] = await Promise.all([
        getProjects(),
        getProjectAnalytics()
      ]);

      setProjects(projectData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.log('DASHBOARD LOAD ERROR:', error);
      setProjects(fallbackProjects);
      setNotice('Showing local workspace examples until the backend is reachable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspace();
  }, []);

  const folders = useMemo(() => {
    const names = projects.map((project) => project.folder || 'Launchpad');
    return ['All', ...new Set(names)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchText = `${project.title} ${project.prompt} ${(project.tags || []).join(' ')}`.toLowerCase();
      const matchesSearch = searchText.includes(query.toLowerCase());
      const matchesFolder = folder === 'All' || (project.folder || 'Launchpad') === folder;

      return matchesSearch && matchesFolder;
    });
  }, [folder, projects, query]);

  const stats = [
    {
      label: 'Projects',
      value: analytics?.totalProjects ?? projects.length,
      detail: 'Saved generations'
    },
    {
      label: 'Credits',
      value: `${analytics?.creditsUsed ?? projects.length * 8}/${analytics?.creditsLimit ?? 500}`,
      detail: 'AI usage this cycle'
    },
    {
      label: 'Favorites',
      value: analytics?.favoriteProjects ?? projects.filter((project) => project.favorite).length,
      detail: 'Pinned work'
    },
    {
      label: 'Exports',
      value: analytics?.exports ?? 0,
      detail: 'Source downloads'
    }
  ];

  const activities = [
    'AI saved your latest generation into project history',
    'Theme engine is ready for Apple, Vercel, Cyberpunk, Luxury, and Minimal SaaS styles',
    'Live preview supports desktop, tablet, and mobile frames',
    'Project API now supports update, delete, duplicate, and analytics'
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleFavorite = async (project) => {
    if (project._id?.startsWith('starter')) return;

    const updatedProject = await updateProject(project._id, {
      favorite: !project.favorite
    });

    setProjects((currentProjects) =>
      currentProjects.map((item) =>
        item._id === updatedProject._id ? updatedProject : item
      )
    );
  };

  const renameProject = async (project) => {
    if (project._id?.startsWith('starter')) return;

    const title = window.prompt('Rename project', project.title);

    if (!title?.trim()) return;

    const updatedProject = await updateProject(project._id, {
      title: title.trim()
    });

    setProjects((currentProjects) =>
      currentProjects.map((item) =>
        item._id === updatedProject._id ? updatedProject : item
      )
    );
  };

  const cloneProject = async (project) => {
    if (project._id?.startsWith('starter')) return;

    const copiedProject = await duplicateProject(project._id);
    setProjects((currentProjects) => [copiedProject, ...currentProjects]);
    setNotice(`Duplicated "${project.title}".`);
  };

  const removeProject = async (project) => {
    if (project._id?.startsWith('starter')) return;
    if (!window.confirm(`Delete "${project.title}"?`)) return;

    await deleteProject(project._id);
    setProjects((currentProjects) =>
      currentProjects.filter((item) => item._id !== project._id)
    );
  };

  const exportProject = (project) => {
    const code = project.generatedCode || '<!DOCTYPE html><html><body><h1>ProjectMaker AI export</h1></body></html>';
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.title.replace(/[^\w-]+/g, '-').toLowerCase()}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="dashboard-page">
      <div className="workspace-ambient" aria-hidden="true"></div>

      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-brand">
          <span>PM</span>
          ProjectMaker AI
        </Link>

        <nav className="dashboard-nav" aria-label="Workspace">
          {workspaceTabs.map((tab) => (
            <button
              type="button"
              className={activeView === tab ? 'active' : ''}
              key={tab}
              onClick={() => setActiveView(tab)}
            >
              {tab}
            </button>
          ))}
          <Link to="/generate">AI Generator</Link>
          <Link to="/templates">Templates</Link>
        </nav>

        <div className="sidebar-card">
          <span>Creator Pro</span>
          <strong>Premium workspace</strong>
          <p>Account-based generation, saved code, history, exports, and AI assistance.</p>
          <div className="credit-meter">
            <span style={{ width: `${Math.min(((analytics?.creditsUsed ?? 64) / (analytics?.creditsLimit ?? 500)) * 100, 100)}%` }}></span>
          </div>
        </div>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <span className="dashboard-kicker">Workspace</span>
            <h1>Welcome back, {userName}.</h1>
            <p>Manage saved generations, restyle projects, review AI suggestions, and export your code.</p>
          </div>

          <div className="dashboard-actions">
            <Link to="/generate" className="primary-action">New generation</Link>
          </div>
        </header>

        {notice && <div className="workspace-notice">{notice}</div>}

        <section className="stats-grid">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.detail}</p>
            </article>
          ))}
        </section>

        <section className="workspace-command">
          <div>
            <span className="section-eyebrow">AI command center</span>
            <h2>Open the builder, analyze an idea, or continue a saved project.</h2>
          </div>
          <div className="command-actions">
            <Link to="/generate">Open builder</Link>
            <button type="button" onClick={() => setActiveView('chat')}>Ask assistant</button>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="projects-panel">
            <div className="section-title">
              <div>
                <span>Saved projects</span>
                <h2>{activeView === 'projects' ? 'Project manager' : 'Recent generated websites'}</h2>
              </div>
              <Link to="/generate">Create project</Link>
            </div>

            <div className="project-tools">
              <input
                type="search"
                placeholder="Search projects, prompts, tags..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <select value={folder} onChange={(event) => setFolder(event.target.value)}>
                {folders.map((folderName) => (
                  <option key={folderName}>{folderName}</option>
                ))}
              </select>
            </div>

            <div className="project-list">
              {loading && ['one', 'two', 'three'].map((item) => (
                <div className="dashboard-project-card skeleton-card" key={item}></div>
              ))}

              {!loading && filteredProjects.map((project) => (
                <article className="dashboard-project-card" key={project._id}>
                  <div className="project-topline">
                    <div>
                      <span>{project.folder || 'Launchpad'}</span>
                      <h3>{project.title}</h3>
                    </div>
                    <button type="button" className={project.favorite ? 'favorite active' : 'favorite'} onClick={() => toggleFavorite(project)}>
                      {project.favorite ? 'Pinned' : 'Pin'}
                    </button>
                  </div>

                  <p>{project.prompt}</p>

                  <div className="project-tags">
                    {(project.tags?.length ? project.tags : ['AI website', project.status || 'Generated']).slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <button type="button" onClick={() => renameProject(project)}>Rename</button>
                    <button type="button" onClick={() => cloneProject(project)}>Duplicate</button>
                    <button type="button" onClick={() => exportProject(project)}>Export</button>
                    <button type="button" onClick={() => removeProject(project)}>Delete</button>
                  </div>
                </article>
              ))}

              {!loading && filteredProjects.length === 0 && (
                <div className="empty-state">
                  <h3>No projects found</h3>
                  <p>Start a new generation or clear the current search filters.</p>
                  <Link to="/generate">Generate website</Link>
                </div>
              )}
            </div>
          </div>

          <aside className="activity-panel">
            <div className="assistant-card">
              <span>AI assistant</span>
              <h2>What should we build next?</h2>
              <div className="chat-stream">
                <p><strong>You</strong> Need a premium SaaS app generator.</p>
                <p><strong>AI</strong> I can create the page, save it, improve the UI, refactor code, and prepare exports.</p>
              </div>
              <Link to="/generate">Start prompt</Link>
            </div>

            <div className="activity-list">
              {activities.map((activity, index) => (
                <div className="activity-item" key={activity}>
                  <span>{index + 1}</span>
                  <p>{activity}</p>
                </div>
              ))}
            </div>

            <div className="team-card">
              <span>Collaboration</span>
              <h3>Team workspace ready</h3>
              <p>Invite members, share projects, comment on generated sections, and track export history from one dashboard UI.</p>
              <div className="member-row">
                <span>JV</span>
                <span>AI</span>
                <span>+</span>
              </div>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

export default DashboardPage;
