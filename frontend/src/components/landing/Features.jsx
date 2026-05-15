// src/components/landing/Features.jsx

import { motion } from 'framer-motion';
import './Features.css';

function Features() {
  const features = [
    {
      icon: 'SE',
      title: 'AI Style Engine',
      description: 'Transform colors, layout, typography, animation, spacing, and sections across Apple, Framer, Vercel, cyberpunk, glass, anime, neobrutal, SaaS, and gaming styles.'
    },
    {
      icon: 'SS',
      title: 'Screenshot to Website',
      description: 'Upload a landing page, portfolio, Netflix-style screen, or class platform screenshot and recreate the structure as editable website sections.'
    },
    {
      icon: 'VO',
      title: 'Voice Website Builder',
      description: 'Use browser speech recognition to generate a modern portfolio, SaaS site, or dark animated page from spoken instructions.'
    },
    {
      icon: 'TH',
      title: 'One Click Theme Switcher',
      description: 'Instantly switch a generated site between dark, light, cyberpunk, luxury, neon, glassmorphism, and retro without regenerating.'
    },
    {
      icon: 'SC',
      title: 'AI Smart Components',
      description: 'Detect the industry and add useful sections automatically: menus and booking for restaurants, admissions for schools, trainers and plans for gyms.'
    },
    {
      icon: 'ED',
      title: 'Live AI Edit Chat',
      description: 'Ask for navbar changes, new pricing sections, purple colors, or extra animations and watch the site update in place.'
    },
    {
      icon: 'MD',
      title: 'Multi Device Live Preview',
      description: 'Review desktop, tablet, and mobile views side by side for a professional builder experience.'
    },
    {
      icon: 'DP',
      title: 'One Click Deploy',
      description: 'Ship with deploy buttons for Vercel and Netlify, plus export options for ZIP, React, and plain HTML, CSS, and JS.'
    },
    {
      icon: 'AN',
      title: 'AI Animation Generator',
      description: 'Generate hover effects, scroll reveals, gradients, parallax, loading screens, and polished motion that most builders miss.'
    },
    {
      icon: 'DG',
      title: 'Drag + AI Builder',
      description: 'Drag sections into place and let AI improve spacing, hierarchy, and copy.'
    },
    {
      icon: 'SEO',
      title: 'SEO + Performance AI',
      description: 'Create SEO tags, meta descriptions, sitemap content, optimized image guidance, and lighthouse-friendly structure.'
    },
    {
      icon: 'LD',
      title: 'AI Loader + Intro',
      description: 'Give every generated website a matching intro: floating books for study, neon loading for gaming, or premium glass for finance.'
    },
    {
      icon: 'PG',
      title: 'AI Page Generator',
      description: 'Generate landing pages, dashboards, login screens, admin panels, pricing pages, and blog pages automatically.'
    },
    {
      icon: 'IT',
      title: 'Industry Templates AI',
      description: 'Understand gyms, restaurants, AI SaaS, education, and portfolios, then output the sections users expect for each industry.'
    },
    {
      icon: 'ME',
      title: 'AI Website Memory',
      description: 'Let users ask to make the previous site more modern and keep continuity with earlier generated designs.'
    },
    {
      icon: 'RM',
      title: 'Remix Website',
      description: 'Paste any URL and generate a stronger version with fresh visuals and smarter sections.'
    },
    {
      icon: 'BG',
      title: 'AI Interactive Backgrounds',
      description: 'Add premium particles, neural networks, 3D gradients, glowing grids, and mouse-follow effects automatically.'
    }
  ];

  const mustHave = [
    'AI style engine',
    'Live AI edit chat',
    'Multi-device preview',
    'Screenshot to website',
    'One-click deploy',
    'Export ZIP',
    'Theme switcher',
    'Smart sections generator'
  ];

  const futureIdeas = [
    'AI backend APIs',
    'AI database schema generator',
    'AI Figma export',
    'AI React conversion',
    'AI ecommerce generator',
    'AI CMS builder',
    'AI code explanation mode',
    'AI bug fixer',
    'AI responsive fixer'
  ];

  return (
    <section className="features section" id="features">

      <div className="container">

        <div className="features-header">

          <span>FEATURES</span>

          <h2>
            Most unique features to make ProjectMaker feel startup-level
          </h2>

        </div>

        <div className="feature-spotlight">
          <div>
            <span className="spotlight-kicker">Standout combo</span>
            <h3>Prompt to AI website, live chat editing, screenshot clone, and one-click theme transform.</h3>
          </div>

          <p>
            This is the core flow that makes the product feel different: generate a website,
            edit it conversationally, recreate a screenshot, and switch the entire visual style instantly.
          </p>
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

              <div className="feature-icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </motion.div>
          ))}

        </div>

        <div className="feature-summary-grid">
          <div className="feature-summary">
            <span>Must have</span>
            <h3>Best features for this React, CSS, Node, Express, and MongoDB stack</h3>
            <div className="summary-list">
              {mustHave.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="feature-summary">
            <span>Future ideas</span>
            <h3>Advanced modules to add after the main builder feels solid</h3>
            <div className="summary-list">
              {futureIdeas.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Features;
