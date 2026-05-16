// src/components/landing/CTA.jsx

import { motion } from 'framer-motion';
import Button from '../common/Button';
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

            <Button to="/register" size="lg">
              Start Free
            </Button>

            <Button to="/templates" variant="secondary" size="lg">
              View Templates
            </Button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default CTA;
