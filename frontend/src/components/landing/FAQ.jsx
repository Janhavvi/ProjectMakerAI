// src/components/landing/FAQ.jsx

import { useState } from 'react';
import './FAQ.css';

function FAQ() {

  const faqs = [
    {
      question:
        'How does ProjectMaker AI work?',

      answer:
        'Users enter prompts and the AI generates complete responsive websites instantly.'
    },

    {
      question:
        'Can I export React code?',

      answer:
        'Yes. You can export full React, HTML, CSS, and JavaScript production-ready code.'
    },

    {
      question:
        'Does it support responsive design?',

      answer:
        'Yes. All generated websites are optimized for desktop, tablet, and mobile devices.'
    },

    {
      question:
        'Can I edit generated websites?',

      answer:
        'Absolutely. Use the visual drag-and-drop editor to customize layouts, colors, and sections.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(
      activeIndex === index ? null : index
    );
  };

  return (
    <section className="faq section">

      <div className="container">

        <div className="faq-header">

          <span>FAQ</span>

          <h2>
            Frequently Asked
            Questions
          </h2>

        </div>

        <div className="faq-list">

          {faqs.map((faq, index) => (

            <div
              className={
                activeIndex === index
                  ? 'faq-item active'
                  : 'faq-item'
              }

              key={index}
            >

              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >

                <h3>{faq.question}</h3>

                <span>
                  {activeIndex === index ? '-' : '+'}
                </span>

              </div>

              {activeIndex === index && (

                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FAQ;