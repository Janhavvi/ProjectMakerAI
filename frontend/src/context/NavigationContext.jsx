// src/context/NavigationContext.jsx

import { createContext, useState, useCallback } from 'react';

/**
 * Navigation Context
 * Manages navigation state, recent pages, and breadcrumb info
 */
export const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('/');
  const [previousPage, setPreviousPage] = useState(null);
  const [recentPages, setRecentPages] = useState([]);
  const [navigationStack, setNavigationStack] = useState([]);

  // Track page navigation
  const navigateTo = useCallback((path, metadata = {}) => {
    setPreviousPage(currentPage);
    setCurrentPage(path);

    // Add to recent pages
    setRecentPages(prev => {
      const filtered = prev.filter(p => p.path !== path);
      return [{ path, ...metadata, timestamp: Date.now() }, ...filtered].slice(0, 10);
    });

    // Add to navigation stack
    setNavigationStack(prev => [...prev, { path, ...metadata }].slice(-20));
  }, [currentPage]);

  // Get back navigation
  const goBack = useCallback(() => {
    if (previousPage) {
      navigateTo(previousPage);
    }
  }, [previousPage, navigateTo]);

  // Get context-aware quick actions
  const getQuickActions = useCallback(() => {
    const actions = [];

    // Based on current page, suggest next actions
    if (currentPage.includes('project-analyzer')) {
      actions.push({
        label: 'Generate Full Project',
        path: '/ai-project-generator',
        icon: '✨'
      });
    }

    if (currentPage.includes('saved-projects')) {
      actions.push({
        label: 'Create New Project',
        path: '/ai-project-generator',
        icon: '🆕'
      });
    }

    if (currentPage.includes('templates')) {
      actions.push({
        label: 'Customize Template',
        path: '/ai-project-generator',
        icon: '🎨'
      });
    }

    return actions;
  }, [currentPage]);

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        previousPage,
        recentPages,
        navigationStack,
        navigateTo,
        goBack,
        getQuickActions,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
