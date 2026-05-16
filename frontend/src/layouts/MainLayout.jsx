// src/layouts/MainLayout.jsx

import { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import './MainLayout.css';

/**
 * Premium Main Layout
 * Provides consistent header/footer and page structure
 */
function MainLayout({ children }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="main-layout">
      <Navbar onMenuToggle={() => setNavOpen(!navOpen)} />

      <main className="main-content">
        <div className="content-container">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;