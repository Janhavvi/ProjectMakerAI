import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ProjectMaker AI
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/generate">Generate</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </div>

      <Link to="/register" className="navbar-btn">
        Start Free
      </Link>
    </nav>
  );
}

export default Navbar;