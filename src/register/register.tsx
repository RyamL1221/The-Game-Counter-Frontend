// src/components/Register.tsx
import React, { useState, FormEvent } from 'react';
import './register.css';
import { registerUser, RegisterData } from '../util/register';
import Navbar from '../ui/navbar';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      setMessage('Registration successful!');
      setIsError(false);
      console.log('Registration successful:', data);
    } catch (error: any) {
      setMessage(error.message);
      setIsError(true);
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="home-container">
      <Navbar />

      <main className="main-content">
        <header className="header">
        <h1 className="register-glow">Register</h1>
        <p>Please fill in the details below to create an account.</p>
          {message && (
            <p className={`message ${isError ? 'error' : ''}`}>
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit} className="register-form">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="auth-button">
              Register
            </button>
          </form>
        </header>
      </main>
    </div>
  );
};

export default Register;
