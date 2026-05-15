import { Link } from 'react-router-dom';
import './Auth.css';

function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Start generating AI websites instantly.</p>

        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </form>

        <p className="auth-bottom">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;