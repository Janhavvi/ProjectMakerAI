// src/pages/ProfilePage.jsx

import './ProfilePage.css';

function ProfilePage() {

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          A
        </div>

        <h2>
          Alex Morgan
        </h2>

        <p>
          AI Website Creator
        </p>

        <div className="profile-stats">

          <div>

            <h3>
              24
            </h3>

            <span>
              Projects
            </span>

          </div>

          <div>

            <h3>
              120
            </h3>

            <span>
              Generations
            </span>

          </div>

          <div>

            <h3>
              Pro
            </h3>

            <span>
              Plan
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;