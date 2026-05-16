import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/projectService';
import './AIToolPage.css';

function SavedProjectsPage({ favoritesOnly = false }) {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFavorite = !favoritesOnly || project.favorite;
      const matchesSearch = `${project.title} ${project.prompt}`.toLowerCase().includes(query.toLowerCase());
      return matchesFavorite && matchesSearch;
    });
  }, [favoritesOnly, projects, query]);

  return (
    <main className="ai-tool-page">
      <div className="ai-tool-shell">
        <header className="ai-tool-hero">
          <div>
            <span className="tool-kicker">{favoritesOnly ? 'Favorites' : 'Saved Projects'}</span>
            <h1>{favoritesOnly ? 'Pinned AI generations.' : 'Every generated project in one place.'}</h1>
            <p>Search, reopen, preview, and continue editing your account-based AI generations.</p>
          </div>
          <div className="tool-actions">
            <Link to="/generate">New website</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </header>

        <div className="tool-card">
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search saved projects..."
            style={{ minHeight: 64 }}
          />
        </div>

        <section className="project-mini-grid">
          {visibleProjects.map((project) => (
            <article className="project-mini-card" key={project._id}>
              <span className="tool-kicker">{project.projectType || project.folder || 'Website'}</span>
              <h3>{project.title}</h3>
              <p>{project.prompt}</p>
              <div className="tool-actions">
                <Link to={`/projects/${project._id}/editor`}>Open editor</Link>
                <Link to={`/projects/${project._id}/preview`}>Preview</Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default SavedProjectsPage;
