import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../ui/navbar';
import { useAuth } from '../util/auth';
import './home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [titleText, setTitleText] = useState("The Game Counter");
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  // Matrix effect on hover
  const startMatrixEffect = () => {
    if (isMatrixActive) return;
    setIsMatrixActive(true);
    const originalText = "The Game Counter";
    const characters = "10";
    let interval: ReturnType<typeof setInterval>;

    interval = setInterval(() => {
      const randomText = originalText
        .split('')
        .map(char => (char === ' ' ? ' ' : characters.charAt(Math.floor(Math.random() * characters.length))))
        .join('');
      setTitleText(randomText);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setTitleText(originalText);
      setIsMatrixActive(false);
    }, 1000);
  };

  return (
    <div className="home-container">
      <Navbar />

      <main className="main-content">
        <header className="header">
          <h1 className="title" onMouseEnter={startMatrixEffect}>
            {titleText}
          </h1>

          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                <button onClick={() => navigate('/dashboard')} className="auth-button">
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="auth-button"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="auth-button">
                  Login
                </button>
                <button onClick={() => navigate('/register')} className="auth-button">
                  Register
                </button>
              </>
            )}
          </div>

          <p>
            This is your one-stop place to keep track of how many times you've lost the game.
            Remember, if you think about the game... you lose!
          </p>
        </header>
      </main>
    </div>
  );
};

export default Home;
