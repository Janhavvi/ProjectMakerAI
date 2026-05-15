// src/layouts/DashboardLayout.jsx

function DashboardLayout({
  children
}) {

  return (
    <div className="dashboard-layout">

      <aside className="dashboard-sidebar">

        <h2>
          ProjectMaker AI
        </h2>

        <ul>
          <li>Dashboard</li>
          <li>Projects</li>
          <li>Templates</li>
          <li>Settings</li>
        </ul>

      </aside>

      <main className="dashboard-content">
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;