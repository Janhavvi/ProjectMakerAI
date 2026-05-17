// src/components/common/PageTransition.jsx

import { useLocation } from 'react-router-dom';
import './PageTransition.css';

/**
 * Page Transition Wrapper
 * Provides smooth transitions between routes
 */
function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div className="page-transition-wrapper" key={location.pathname}>
      {children}
    </div>
  );
}

export default PageTransition;
