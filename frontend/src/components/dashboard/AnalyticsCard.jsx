// src/components/dashboard/AnalyticsCard.jsx

import './AnalyticsCard.css';

function AnalyticsCard({
  title,
  value,
  icon
}) {

  return (
    <div className="analytics-card">

      <div className="analytics-icon">
        {icon}
      </div>

      <div>

        <h3>
          {value}
        </h3>

        <p>
          {title}
        </p>

      </div>

    </div>
  );
}

export default AnalyticsCard;