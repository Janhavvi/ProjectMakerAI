// src/components/dashboard/Topbar.jsx

import './Topbar.css';

function Topbar() {
  return (
    <div className="topbar">

      <div className="topbar-search">

        <input
          type="text"
          placeholder="Search projects..."
        />

      </div>

      <div className="topbar-actions">

        <button>
          Upgrade Pro
        </button>

        <div className="topbar-avatar">
          A
        </div>

      </div>

    </div>
  );
}

export default Topbar;