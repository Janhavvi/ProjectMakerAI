import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="hero-badge">AI Website Builder</span>

        <h1>
          Create Stunning Websites
          <span> Using AI Prompts</span>
        </h1>

        <p>
          Generate futuristic, responsive, production-ready websites instantly
          using powerful AI tools.
        </p>

        <div className="hero-buttons">
          <Link to="/generate" className="primary-btn">
            Start Building
          </Link>

          <a href="#features" className="secondary-btn">
            Watch Demo
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;