// src/components/Register.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';
import './register.css';
import { registerUser, RegisterData } from '../util/register';
import Navbar from '../ui/navbar';

// Extend the core RegisterData to include security fields
interface RegisterFormData extends RegisterData {
  security_question: string;
  security_answer: string;
}

const securityQuestions = [
  "What was your childhood nickname?",
  "What is the name of your favorite childhood friend?",
  "In what city or town did your mother and father meet?",
  "What is the name of your favorite pet?",
  "What was the first concert you attended?"
];

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    security_question: '',
    security_answer: ''
  });
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
    <div className="register-page">
      <Navbar />
      <div className="register-container">
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

          <label htmlFor="security_question">Security Question:</label>
          <select
            id="security_question"
            name="security_question"
            value={formData.security_question}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Select a question --
            </option>
            {securityQuestions.map((q, idx) => (
              <option key={idx} value={q}>
                {q}
              </option>
            ))}
          </select>

          <label htmlFor="security_answer">Answer:</label>
          <input
            id="security_answer"
            name="security_answer"
            type="text"
            value={formData.security_answer}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
