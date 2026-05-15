// src/components/common/Footer.jsx

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>ProjectMaker AI</h2>

          <p>
            Build futuristic AI-powered websites
            instantly using prompts.
          </p>
        </div>

        <div className="footer-links">

          <div className="footer-column">
            <h4>Product</h4>

            <a href="/">Features</a>
            <a href="/">Templates</a>
            <a href="/">Pricing</a>
            <a href="/">Updates</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>

            <a href="/">About</a>
            <a href="/">Careers</a>
            <a href="/">Blog</a>
            <a href="/">Contact</a>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>

            <a href="/">Documentation</a>
            <a href="/">Help Center</a>
            <a href="/">Community</a>
            <a href="/">Support</a>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 ProjectMaker AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;