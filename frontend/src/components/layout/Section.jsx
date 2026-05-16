// src/components/layout/Section.jsx

/**
 * Premium Section Component
 * Provides consistent spacing and visual hierarchy
 */
function Section({
  children,
  title,
  subtitle,
  spacing = 'normal',
  className = '',
  id,
  ...props
}) {
  const spacingClasses = {
    tight: 'section-spacing-tight',
    normal: 'section-spacing-normal',
    loose: 'section-spacing-loose',
  };

  return (
    <section
      className={`section ${spacingClasses[spacing] || 'section-spacing-normal'} ${className}`}
      id={id}
      {...props}
    >
      {(title || subtitle) && (
        <div className="section-header">
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="section-content">
        {children}
      </div>
    </section>
  );
}

export default Section;
