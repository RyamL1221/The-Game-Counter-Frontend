import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, LoginData } from '../util/login'; 
import { useAuth } from '../util/auth'; 
import { Navigate } from 'react-router-dom';  // For redirection
import Navbar from '../ui/navbar';  // Navbar import as in Register page
import './login.css';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const { token } = useAuth();  // Get token from auth context
  // if user is already logged in, redirect to dashboard
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
    try {
      const data = await loginUser(loginData);
      setToken(data.token);  // Save the JWT token in context and localStorage
      setMessage('Login successful!');
      setIsError(false);
      navigate('/dashboard');  // Redirect to the dashboard after login
    } catch (error: any) {
      setMessage(error.message);
      setIsError(true);
    }
  };

  return (
    <div className="home-container">  {/* Match structure with Register page */}
      <Navbar />  {/* Same Navbar from Register page */}

      <main className="main-content">
        <header className="header">
          <h1 className="login-glow">Login</h1>
          <p>Please enter your credentials to log in.</p>
          {message && (
            <p className={`message ${isError ? 'error' : ''}`}>
              {message}
            </p>
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
            />

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </header>
      </main>

    </div>
  );
};

export default Login;
