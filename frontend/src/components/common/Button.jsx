// src/components/common/Button.jsx

import './Button.css';

function Button({
  text,
  onClick,
  type = 'button',
  variant = 'primary'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-button ${variant}`}
    >
      {text}
    </button>
  );
}

export default Button;