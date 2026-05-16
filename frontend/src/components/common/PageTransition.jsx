// src/components/common/PageTransition.jsx

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

/**
 * Page Transition Wrapper
 * Provides smooth transitions between routes
 */
function PageTransition({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);

    // Small delay to trigger transition animation
    const transitionTimer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 50);

    return () => clearTimeout(transitionTimer);
  }, [location, children]);

  return (
    <div className={`page-transition-wrapper ${isTransitioning ? 'transitioning' : ''}`}>
      {displayChildren}
    </div>
  );
}

export default PageTransition;
