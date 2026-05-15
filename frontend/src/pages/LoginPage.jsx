// src/pages/LoginPage.jsx

import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api from '../services/api';
import './Auth.css';

function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post('/auth/google', {
        credential: credentialResponse.credential
      });

      localStorage.setItem('token', response.data.token);

      navigate('/generate');
    } catch (error) {
      console.log('GOOGLE LOGIN ERROR:', error.response?.data || error);
      alert(error.response?.data?.message || 'Google login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <p>
          Login to continue building AI-powered websites.
        </p>

        <div className="google-login-box">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert('Google login failed')}
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

        <form>
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />

          <button type="submit">
            Login
          </button>
        </form>

        <p className="auth-bottom">
          Don’t have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;