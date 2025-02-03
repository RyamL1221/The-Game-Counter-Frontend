import React, { useState, FormEvent } from 'react';
import './register.css';

interface RegisterData {
  email: string;
  password: string;
}

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
      // Construct the API URL from the environment variable.
      const apiUrl = process.env.REACT_APP_BASE_URL;
      if (!apiUrl) {
        throw new Error('API URL is not defined in environment variables.');
      }
      
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      setMessage('Registration successful!');
      setIsError(false); // It's not an error
      console.log('Registration successful:', data);
    } catch (error: any) {
      setMessage(error.message);
      setIsError(true); // Mark as error
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && <p className={`message ${isError ? 'error' : ''}`}>{message}</p>}
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
