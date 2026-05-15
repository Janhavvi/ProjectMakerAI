// src/components/landing/CTA.jsx

import { motion } from 'framer-motion';
import './CTA.css';

function CTA() {
  return (
    <section className="cta section">

      <div className="container">

        <motion.div
          className="cta-box"

          initial={{
            opacity: 0,
            y: 50
          }}

          whileInView={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.7
          }}

          viewport={{ once: true }}
        >

          <span>
            START BUILDING TODAY
          </span>

          <h2>
            Create Your AI Website
            In Minutes
          </h2>

          <p>
            Generate premium futuristic websites
            instantly with powerful AI tools,
            visual editing, and export-ready code.
          </p>

          <div className="cta-buttons">

            <button className="cta-primary-btn">
              Start Free
            </button>

            <button className="cta-secondary-btn">
              View Templates
            </button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default CTA;