// src/components/landing/Testimonials.jsx

import { motion } from 'framer-motion';
import './Testimonials.css';

function Testimonials() {

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Startup Founder',

      review:
        'ProjectMaker AI helped us launch our startup website in minutes. The design quality feels premium.'
    },

    {
      name: 'Sophia Lee',
      role: 'UI Designer',

      review:
        'The AI-generated layouts are futuristic and incredibly responsive. Amazing experience.'
    },

    {
      name: 'Daniel Carter',
      role: 'Developer',

      review:
        'Exporting clean React code saved me countless hours of frontend development.'
    }
  ];

  return (
    <section className="testimonials section">

      <div className="container">

        <div className="testimonials-header">

          <span>TESTIMONIALS</span>

          <h2>
            Loved By Creators
            Worldwide
          </h2>

        </div>

        <div className="testimonials-grid">

          {testimonials.map((item, index) => (

            <motion.div
              className="testimonial-card"
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

              <div className="stars">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="review">
                “{item.review}”
              </p>

              <div className="user-info">

                <div className="avatar">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;