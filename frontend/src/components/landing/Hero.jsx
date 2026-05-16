import { motion } from 'framer-motion';
import Button from '../common/Button';
import './Hero.css';

function Hero() {
  const tools = [
    ['Website Generator', 'Prompt to responsive pages'],
    ['Project Planner', 'Features, schema, APIs'],
    ['Design Assistant', 'Restyle and improve UI'],
    ['Saved Workspace', 'History, exports, favorites']
  ];

  const metrics = [
    ['8', 'AI tools'],
    ['500', 'starter credits'],
    ['24/7', 'workspace']
  ];

  return (
    <section className="hero">
      <div className="hero-aurora" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="hero-noise" aria-hidden="true"></div>

      <motion.div
        className="hero-shell"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="hero-badge">Premium account-based AI builder</span>
          <h1>
            Design, generate, and ship <span>polished websites</span> with AI.
          </h1>
          <p>
            Turn rough ideas into saved projects with generated pages, style upgrades,
            live previews, analytics, and export-ready code.
          </p>

          <div className="hero-buttons">
            <Button to="/register" size="lg">Start workspace</Button>
            <Button to="/login" variant="secondary" size="lg">Login</Button>
          </div>

          <div className="hero-metrics">
            {metrics.map(([value, label]) => (
              <motion.div
                key={label}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              >
                <strong>{value}</strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-bento"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.18 }
            }
          }}
        >
          <motion.div
            className="bento-card command-card"
            variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6 }}
          >
            <div className="command-card-top">
              <span>AI command</span>
              <em>Generating</em>
            </div>
            <h2>Create a polished fintech landing page with pricing, trust badges, and export-ready React.</h2>
            <div className="command-bar">
              <i></i>
              <Button type="button" size="sm">Generate</Button>
            </div>
          </motion.div>

          <motion.div
            className="bento-card preview-card"
            variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6 }}
          >
            <div className="mini-top">
              <span></span><span></span><span></span>
            </div>
            <div className="mini-preview">
              <strong>NovaPay</strong>
              <p>AI-generated SaaS homepage</p>
              <div className="preview-graph">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>

          <div className="tool-grid">
            {tools.map(([title, text]) => (
              <motion.article
                className="bento-card tool-card"
                key={title}
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ x: 4, y: -3 }}
              >
                <span>{title}</span>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="bento-card activity-card"
            variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6 }}
          >
            <span>Latest activity</span>
            <p><strong></strong>Saved landing page to workspace</p>
            <p><strong></strong>Design score improved to 86/100</p>
            <p><strong></strong>Export ready: React + ZIP</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
