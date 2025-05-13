// src/login/Login.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { loginUser, LoginData } from '../util/login';
import { useAuth } from '../util/auth';
import Navbar from '../ui/navbar';
import './login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // If already logged in, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setLoading(true);

    try {
      const data = await loginUser(loginData);
      setToken(data.token);
      setMessage('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      setMessage(error.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <Navbar />

      <main className="main-content">
        <header className="header">
          <h1 className="login-glow">Login</h1>
          <p>Please enter your credentials to log in.</p>

          {message && (
            <p className={`message ${isError ? 'error' : 'success'}`}>{message}</p>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Forgot Password Link */}
          <p
            className="forgot-password-link"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </p>
        </header>
      </main>
    </div>
  );
};

export default Login;
