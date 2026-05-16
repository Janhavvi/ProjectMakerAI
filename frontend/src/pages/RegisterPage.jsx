import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Fill in all fields to create your account.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/auth/register', formData);
      const authData = response.data?.data || response.data;

      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', JSON.stringify({
        name: authData.name,
        email: authData.email
      }));

      navigate('/dashboard');
    } catch (registerError) {
      setError(registerError.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-panel">
          <span className="auth-kicker">Start free</span>
          <h1>Create, remix, preview, and export AI websites.</h1>
          <p>
            Your account keeps generated projects, recent edits, export history,
            and smart website ideas together.
          </p>

          <div className="auth-feature-list">
            <span>Prompt to website</span>
            <span>Theme transform</span>
            <span>Deploy-ready output</span>
          </div>
        </section>

        <div className="auth-card">
          <h2>Create Account</h2>
          <p>Start generating AI websites instantly.</p>

          <form onSubmit={handleRegister}>
            <label>
              Full name
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={updateField}
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={updateField}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={updateField}
              />
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="auth-bottom">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
