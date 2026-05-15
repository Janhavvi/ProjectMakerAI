// src/pages/LandingPage.jsx

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import CTA from '../components/landing/CTA';

function LandingPage() {
  return (
    <div id="features">

      <Navbar />

      <Hero />

      <Features />

      <Testimonials />

      <Pricing />

      <FAQ />

      <CTA />

      <Footer />

    </div>
  );
}

export default LandingPage;