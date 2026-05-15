import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

function Hero() {
  const stylePills = [
    'Apple',
    'Framer',
    'Vercel',
    'Cyberpunk',
    'Glass',
    'Anime',
    'Neo',
    'SaaS',
    'Gaming'
  ];

  return (
    <section className="hero">
      <div className="hero-grid-bg"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-copy">
          <span className="hero-badge">Prompt to site, screenshot clone, live edit, instant theme transform</span>

          <h1>
            Build startup-level websites with an AI creation studio
          </h1>

          <p>
            Turn a prompt, screenshot, URL, or voice idea into a full website, then transform
            its style, sections, animations, SEO, exports, and device previews from one workspace.
          </p>

          <div className="hero-buttons">
            <Link to="/generate" className="primary-btn">
              Start Building
            </Link>

            <a href="#features" className="secondary-btn">
              Explore Features
            </a>
          </div>
        </div>

        <motion.div
          className="hero-preview"
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          aria-label="ProjectMaker AI builder preview"
        >
          <div className="preview-topbar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="preview-body">
            <aside className="preview-sidebar">
              <span className="sidebar-label">AI Style Engine</span>
              <div className="style-pill-list">
                {stylePills.map((style) => (
                  <span key={style}>{style}</span>
                ))}
              </div>
            </aside>

            <div className="preview-canvas">
              <div className="canvas-nav"></div>
              <div className="canvas-hero">
                <span></span>
                <strong>FitForge</strong>
                <p>Fitness website rebuilt from prompt, voice, and screenshot</p>
              </div>
              <div className="canvas-sections">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <div className="preview-command">
            <span>Live edit</span>
            <p>Make navbar transparent, add plans, switch to cyberpunk, export React.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
