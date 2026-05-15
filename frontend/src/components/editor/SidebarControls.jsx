// src/components/editor/SidebarControls.jsx

import './SidebarControls.css';

function SidebarControls() {

  return (
    <div className="sidebar-controls">

      <h2>
        Editor Controls
      </h2>

      <div className="control-group">

        <label>
          Theme Color
        </label>

        <input type="color" />

      </div>

      <div className="control-group">

        <label>
          Font Size
        </label>

        <input
          type="range"
          min="12"
          max="40"
        />

      </div>

      <div className="control-group">

        <label>
          Border Radius
        </label>

        <input
          type="range"
          min="0"
          max="50"
        />

      </div>

      <button>
        Save Changes
      </button>

    </div>
  );
}

export default SidebarControls;