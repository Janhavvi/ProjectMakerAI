// src/pages/Dashboard.jsx

import './Dashboard.css';

function Dashboard() {

  const projects = [
    'AI Startup Website',
    'Portfolio Website',
    'School Project'
  ];

  return (
    <div className="dashboard">

      <aside className="dashboard-sidebar">

        <h2>ProjectMaker AI</h2>

        <ul>
          <li>Dashboard</li>
          <li>Projects</li>
          <li>Templates</li>
          <li>Settings</li>
        </ul>

      </aside>

      <main className="dashboard-main">

        <div className="dashboard-header">

          <h1>
            Your Projects
          </h1>

          <button>
            Create Project
          </button>

        </div>

        <div className="project-grid">

          {projects.map((project, index) => (

            <div
              className="project-card"
              key={index}
            >

              <h3>{project}</h3>

              <p>
                AI-generated website project.
              </p>

              <button>
                Open Project
              </button>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Dashboard;