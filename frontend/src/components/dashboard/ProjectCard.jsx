// src/components/dashboard/ProjectCard.jsx

import './ProjectCard.css';

function ProjectCard({
  title,
  description
}) {

  return (
    <div className="project-card">

      <div className="project-image"></div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <div className="project-actions">

        <button>
          Edit
        </button>

        <button>
          Export
        </button>

      </div>

    </div>
  );
}

export default ProjectCard;