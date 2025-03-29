
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, LoginData } from '../util/login';
import { useAuth } from '../util/auth';
import './login.css';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

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
      // Save the JWT in the auth context (and localStorage via our effect).
      setToken(data.token);
      setMessage('Login successful!');
      setIsError(false);
      // Redirect to a protected route (e.g., a dashboard)
      navigate('/dashboard');
    } catch (error: any) {
      setMessage(error.message);
      setIsError(true);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <p className={`message ${isError ? 'error' : ''}`}>{message}</p>}
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
