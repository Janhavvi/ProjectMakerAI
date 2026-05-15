// src/pages/PricingPage.jsx

import { Link } from 'react-router-dom';
import './PricingPage.css';

function PricingPage() {
  const plans = [
    {
      title: 'Free',
      price: '$0',
      cadence: 'forever',
      description: 'For testing prompts and building your first AI pages.',
      features: [
        '5 AI website generations',
        'Basic landing templates',
        'HTML/CSS export',
        'Community support'
      ],
      cta: 'Start Free'
    },
    {
      title: 'Pro',
      price: '$29',
      cadence: 'per month',
      description: 'For creators who want full builder power and exports.',
      features: [
        'Unlimited AI generations',
        'Live AI edit chat',
        'React and HTML export',
        'Screenshot-inspired builder',
        'SEO and performance tools'
      ],
      cta: 'Choose Pro',
      popular: true
    },
    {
      title: 'Team',
      price: '$99',
      cadence: 'per month',
      description: 'For teams shipping multiple client or product sites.',
      features: [
        'Shared project workspace',
        'Priority generation speed',
        'Team analytics',
        'Admin controls',
        'Dedicated support'
      ],
      cta: 'Start Team'
    }
  ];

  return (
    <main className="pricing-page">
      <section className="pricing-hero">
        <span className="pricing-kicker">Pricing</span>
        <h1>Pick the plan that matches your website workflow.</h1>
        <p>
          Start small, then unlock live AI editing, screenshot-inspired builds,
          React exports, and team-ready collaboration when you need them.
        </p>
      </section>

      <section className="pricing-grid">
        {plans.map((plan) => (
          <article
            className={plan.popular ? 'pricing-card popular' : 'pricing-card'}
            key={plan.title}
          >
            {plan.popular && <span className="popular-badge">Recommended</span>}

            <div className="plan-top">
              <div>
                <h2>{plan.title}</h2>
                <p>{plan.description}</p>
              </div>
            </div>

            <div className="plan-price">
              <strong>{plan.price}</strong>
              <span>{plan.cadence}</span>
            </div>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link to="/register" className="plan-button">
              {plan.cta}
            </Link>
          </article>
        ))}
      </section>

      <section className="pricing-note">
        <div>
          <span className="pricing-kicker">Included</span>
          <h2>All plans include the ProjectMaker builder experience.</h2>
        </div>
        <p>
          Prompt generation, device previews, theme switching, export controls,
          and project dashboard access are designed to scale with your plan.
        </p>
      </section>
    </main>
  );
}

export default PricingPage;
