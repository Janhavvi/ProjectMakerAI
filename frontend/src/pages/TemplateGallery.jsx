import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const TemplateGallery = () => {
  const templates = [
    { id: 1, name: 'Landing Page', category: 'landing' },
    { id: 2, name: 'Blog', category: 'blog' },
    { id: 3, name: 'Portfolio', category: 'portfolio' },
  ];

  return (
    <DashboardLayout>
      <div className="template-gallery">
        <h1>Template Gallery</h1>
        <div className="templates-grid">
          {templates.map((template) => (
            <div key={template.id} className="template-card">
              <h3>{template.name}</h3>
              <p>{template.category}</p>
              <button>Use Template</button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TemplateGallery;
