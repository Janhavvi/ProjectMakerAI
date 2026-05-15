// src/pages/TemplatesPage.jsx

import './TemplatesPage.css';

function TemplatesPage() {

  const templates = [
    {
      title: 'AI Startup',
      category: 'Startup'
    },

    {
      title: 'Portfolio Pro',
      category: 'Portfolio'
    },

    {
      title: 'Business Landing',
      category: 'Business'
    },

    {
      title: 'School Project',
      category: 'Education'
    }
  ];

  return (
    <div className="templates-page">

      <div className="container">

        <div className="templates-header">

          <h1>
            Template Gallery
          </h1>

          <p>
            Browse premium futuristic
            AI-generated templates.
          </p>

        </div>

        <div className="templates-grid">

          {templates.map(
            (template, index) => (

              <div
                className="template-card"
                key={index}
              >

                <div className="template-image"></div>

                <div className="template-content">

                  <span>
                    {template.category}
                  </span>

                  <h3>
                    {template.title}
                  </h3>

                  <button>
                    Use Template
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default TemplatesPage;