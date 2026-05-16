import './Loader.css';

function Loader({ label = 'Generating AI Website...' }) {
  return (
    <div className="loader-container" role="status" aria-live="polite">
      <div className="loader-circle" aria-hidden="true"></div>

      <p>{label}</p>
    </div>
  );
}

export default Loader;
