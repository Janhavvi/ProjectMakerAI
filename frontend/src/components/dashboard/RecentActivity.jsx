// src/components/dashboard/RecentActivity.jsx

import './RecentActivity.css';

function RecentActivity() {

  const activities = [
    'Generated AI startup landing page',
    'Exported React project',
    'Updated pricing section',
    'Generated SEO content'
  ];

  return (
    <div className="recent-activity">

      <h2>
        Recent Activity
      </h2>

      <div className="activity-list">

        {activities.map(
          (activity, index) => (

            <div
              className="activity-item"
              key={index}
            >

              <div className="activity-dot"></div>

              <p>
                {activity}
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default RecentActivity;