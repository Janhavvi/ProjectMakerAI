// src/components/landing/Features.jsx

import { motion } from 'framer-motion';
import './Features.css';

function Features() {
  const features = [
    {
      title: 'AI Website Generator',
      description:
        'Generate complete responsive websites using AI prompts instantly.'
    },

    {
      title: 'Drag & Drop Builder',
      description:
        'Edit sections visually with a powerful live editor.'
    },

    {
      title: 'AI SEO Optimization',
      description:
        'Automatically generate SEO-friendly content and metadata.'
    },

    {
      title: 'Export Ready Code',
      description:
        'Download production-ready React, HTML, CSS, and JS files.'
    },

    {
      title: 'AI Design System',
      description:
        'Generate futuristic color palettes, layouts, and animations.'
    },

    {
      title: 'Responsive AI Layouts',
      description:
        'AI automatically optimizes your website for all devices.'
    }
  ];

  return (
    <section className="features section">

      <div className="container">

        <div className="features-header">

          <span>FEATURES</span>

          <h2>
            Powerful AI Features For
            Modern Website Creation
          </h2>

        </div>

        <div className="features-grid">

          {features.map((feature, index) => (
            <motion.div
              className="feature-card"
              key={index}

              initial={{ opacity: 0, y: 40 }}

              whileInView={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}

              viewport={{ once: true }}
            >

              <div className="feature-icon">
                ✨
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;