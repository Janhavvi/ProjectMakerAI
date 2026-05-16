// src/pages/LoginPage.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api from '../services/api';
import './Auth.css';

function LoginPage() {
  const navigate = useNavigate();
  const googleOrigin = window.location.origin;
  const [formData, setFormData] = useState({
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

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post('/auth/google', {
        credential: credentialResponse.credential
      });
      const authData = response.data?.data || response.data;

      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', JSON.stringify({
        name: authData.name,
        email: authData.email
      }));

      navigate('/generate');
    } catch (error) {
      console.log('GOOGLE LOGIN ERROR:', error.response?.data || error);
      setError(
        error.response?.data?.message ||
          `Google login failed. Add ${googleOrigin} to Authorized JavaScript origins in Google Cloud, or use email login.`
      );
    }
  };

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Enter your email and password.');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/auth/login', formData);
      const authData = response.data?.data || response.data;

      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', JSON.stringify({
        name: authData.name,
        email: authData.email
      }));

      navigate('/dashboard');
    } catch (loginError) {
      setError(loginError.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-panel">
          <span className="auth-kicker">ProjectMaker AI</span>
          <h1>Welcome back to your AI website studio.</h1>
          <p>
            Continue building websites with style presets, live AI edits,
            device previews, and export-ready code.
          </p>

          <div className="auth-feature-list">
            <span>Live AI editing</span>
            <span>Smart sections</span>
            <span>One-click export</span>
          </div>
        </section>

        <div className="auth-card">
          <h2>Login</h2>

          <p>
            Access your generated sites and continue building.
          </p>

          <div className="google-login-box">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() =>
                setError(
                  `Google blocked this origin. Add ${googleOrigin} in Google Cloud Console -> OAuth Client -> Authorized JavaScript origins.`
                )
              }
              theme="filled_black"
              size="large"
              shape="pill"
              text="continue_with"
            />
          </div>

          <div className="auth-divider">
            <span></span>
            <p>or login with email</p>
            <span></span>
          </div>

          <form onSubmit={handleEmailLogin}>
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
                placeholder="Enter password"
                value={formData.password}
                onChange={updateField}
              />
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="auth-bottom">
            Don’t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
