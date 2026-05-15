// src/components/ai/AISettings.jsx

import './AISettings.css';

function AISettings() {

  return (
    <div className="ai-settings">

      <h2>
        AI Settings
      </h2>

      <div className="setting-group">

        <label>
          Website Category
        </label>

        <select>

          <option>
            Portfolio
          </option>

          <option>
            Startup
          </option>

          <option>
            Ecommerce
          </option>

          <option>
            School
          </option>

        </select>

      </div>

      <div className="setting-group">

        <label>
          Theme Mode
        </label>

        <select>

          <option>
            Dark
          </option>

          <option>
            Light
          </option>

        </select>

      </div>

      <div className="setting-group">

        <label>
          Website Style
        </label>

        <select>

          <option>
            Minimal
          </option>

          <option>
            Futuristic
          </option>

          <option>
            Glassmorphism
          </option>

        </select>

      </div>

    </div>
  );
}

export default AISettings;