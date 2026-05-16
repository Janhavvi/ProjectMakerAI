// src/components/layout/Container.jsx

/**
 * Smart Container Component
 * Provides consistent max-width and responsive padding
 * Follows 12-column grid system
 */
function Container({
  children,
  size = 'md',
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'container-sm',
    md: 'container-md',
    lg: 'container-lg',
    xl: 'container-xl',
    full: 'container-full',
  };

  return (
    <div
      className={`container ${sizeClasses[size] || 'container-md'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
