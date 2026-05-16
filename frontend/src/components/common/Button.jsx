import { Link } from 'react-router-dom';
import './Button.css';

function Button({
  text,
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  loadingText = 'Loading...',
  disabled = false,
  className = '',
  leftIcon,
  rightIcon,
  to,
  href,
  ...props
}) {
  const isDisabled = disabled || loading;
  const buttonContent = children || text;
  const classes = [
    'custom-button',
    variant,
    `custom-button--${variant}`,
    `custom-button--${size}`,
    fullWidth ? 'custom-button--full' : '',
    loading ? 'custom-button--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading ? <span className="custom-button__spinner" aria-hidden="true" /> : leftIcon}
      <span className="custom-button__label">{loading ? loadingText : buttonContent}</span>
      {!loading && rightIcon}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={isDisabled}
        onClick={isDisabled ? (event) => event.preventDefault() : onClick}
        {...props}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={isDisabled}
        onClick={isDisabled ? (event) => event.preventDefault() : onClick}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
