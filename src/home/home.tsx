import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home: React.FC = () => {
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleGetStarted = () => {
    navigate('/dashboard'); // Redirect to the Dashboard page
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>The Game Counter</h1>
        </div>
        <div className="navbar-links">
          <button className="nav-button" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="nav-button" onClick={() => navigate('/register')}>
            Register
          </button>
          <button className="nav-button" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h2>Welcome to The Game Counter!</h2>
          <p>
            This is your one-stop place to keep track of how many times you've lost the game.
            If you lose the game, that means you're a sigma.
            Everyone loves a sigma.
          </p>
        </header>
        <section className="gif-section">
          <img
            src="https://i.pinimg.com/originals/55/e6/99/55e69978d4e283dcffa6779b48c9357e.gif"
            alt="Game Counter Gif"
            className="landing-gif"
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <nav className="footer-nav">
          <a href="/login" className="footer-link">Login</a>
          <a href="/register" className="footer-link">Register</a>
          <a href="/dashboard" className="footer-link">Dashboard</a>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
