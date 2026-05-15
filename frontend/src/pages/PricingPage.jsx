// src/pages/PricingPage.jsx

import './PricingPage.css';

function PricingPage() {

  const plans = [
    {
      title: 'Free',
      price: '$0',
      features: [
        '5 AI generations',
        'Basic templates',
        'Community support'
      ]
    },

    {
      title: 'Pro',
      price: '$29',
      features: [
        'Unlimited AI generations',
        'Premium templates',
        'Export React code'
      ]
    },

    {
      title: 'Team',
      price: '$99',
      features: [
        'Collaboration tools',
        'Priority AI speed',
        'Advanced analytics'
      ]
    }
  ];

  return (
    <div className="pricing-page">

      <div className="container">

        <div className="pricing-header">

          <h1>
            Flexible Pricing
          </h1>

          <p>
            Choose the perfect plan
            for your workflow.
          </p>

        </div>

        <div className="pricing-grid">

          {plans.map((plan, index) => (

            <div
              className="pricing-card"
              key={index}
            >

              <h2>
                {plan.title}
              </h2>

              <h3>
                {plan.price}
              </h3>

              <ul>

                {plan.features.map(
                  (feature, i) => (

                    <li key={i}>
                      {feature}
                    </li>

                  )
                )}

              </ul>

              <button>
                Get Started
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default PricingPage;