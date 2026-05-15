// src/components/common/Loader.jsx

import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-circle"></div>

      <p>Generating AI Website...</p>
    </div>
  );
}

export default Loader;