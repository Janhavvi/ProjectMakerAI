// src/components/dashboard/Sidebar.jsx

import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        ProjectMaker AI
      </div>

      <ul className="sidebar-menu">

        <li>
          Dashboard
        </li>

        <li>
          AI Generator
        </li>

        <li>
          Templates
        </li>

        <li>
          Projects
        </li>

        <li>
          Analytics
        </li>

        <li>
          Settings
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;