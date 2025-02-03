import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../ui/navbar';
import './home.css';
import Footer from '../ui/footer';

const Home: React.FC = () => {

  return (
    <div className="home-container">
      <Navbar />

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h2>Welcome to The Game Counter!</h2>
          <p>
            This is your one-stop place to keep track of how many times you've lost the game.
            Remember, if you think about the game... you lose!
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

      <Footer />
    </div>
  );
};

export default Home;
