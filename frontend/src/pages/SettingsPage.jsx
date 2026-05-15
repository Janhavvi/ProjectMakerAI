// src/pages/SettingsPage.jsx

import {
  useContext
} from 'react';

import {
  ThemeContext
} from '../context/ThemeContext';

import './SettingsPage.css';

function SettingsPage() {

  const {
    theme,
    toggleTheme
  } = useContext(ThemeContext);

  return (
    <div className="settings-page">

      <div className="settings-card">

        <h1>
          Settings
        </h1>

        <div className="setting-item">

          <div>

            <h3>
              Theme Mode
            </h3>

            <p>
              Switch between dark
              and light mode.
            </p>

          </div>

          <button
            onClick={toggleTheme}
          >

            {theme === 'dark'
              ? 'Light Mode'
              : 'Dark Mode'}

          </button>

        </div>

        <div className="setting-item">

          <div>

            <h3>
              Notifications
            </h3>

            <p>
              Manage email and
              platform notifications.
            </p>

          </div>

          <input
            type="checkbox"
            defaultChecked
          />

        </div>

        <div className="setting-item">

          <div>

            <h3>
              Auto Save
            </h3>

            <p>
              Automatically save
              project changes.
            </p>

          </div>

          <input
            type="checkbox"
            defaultChecked
          />

        </div>

      </div>

    </div>
  );
}

export default SettingsPage;