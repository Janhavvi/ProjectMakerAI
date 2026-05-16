// src/components/landing/Pricing.jsx

import { motion } from 'framer-motion';
import Button from '../common/Button';
import './Pricing.css';

function Pricing() {

  const plans = [
    {
      name: 'Free',
      price: '$0',

      features: [
        '5 AI generations',
        'Basic templates',
        'Export HTML/CSS',
        'Community support'
      ],

      button: 'Get Started'
    },

    {
      name: 'Pro',
      price: '$29',

      features: [
        'Unlimited AI generations',
        'Premium templates',
        'React code export',
        'AI SEO tools',
        'Priority support'
      ],

      button: 'Upgrade Now',

      popular: true
    },

    {
      name: 'Team',
      price: '$99',

      features: [
        'Team collaboration',
        'Version history',
        'Realtime editing',
        'Admin controls',
        'Dedicated support'
      ],

      button: 'Start Team Plan'
    }
  ];

  return (
    <section className="pricing section">

      <div className="container">

        <div className="pricing-header">

          <span>PRICING</span>

          <h2>
            Flexible Pricing For
            Every Creator
          </h2>

        </div>

        <div className="pricing-grid">

          {plans.map((plan, index) => (

            <motion.div
              className={
                plan.popular
                  ? 'pricing-card popular'
                  : 'pricing-card'
              }

              key={index}

              initial={{
                opacity: 0,
                y: 40
              }}

              whileInView={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.2
              }}

              viewport={{ once: true }}
            >

              {plan.popular && (
                <div className="popular-badge">
                  MOST POPULAR
                </div>
              )}

              <h3>{plan.name}</h3>

              <div className="price">
                {plan.price}
                <span>/month</span>
              </div>

              <ul>

                {plan.features.map((feature, i) => (
                  <li key={i}>
                    ✓ {feature}
                  </li>
                ))}

              </ul>

              <Button to="/register" fullWidth>
                {plan.button}
              </Button>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Pricing;
