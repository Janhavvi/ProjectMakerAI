import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import './Navbar.css';

function Navbar() {
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ProjectMaker AI
      </Link>

      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/generate">Generate</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
      </div>

      {isLoggedIn ? (
        <Button variant="secondary" size="sm" className="navbar-action" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button to="/register" size="sm" className="navbar-action">
          Start Free
        </Button>
      )}
    </nav>
  );
}

export default Navbar;
