import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleNavigation = (page: string) => {
    navigate(`/${page}`); // Redirect to the Dashboard page
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to The Game Counter</h1>
      <p className="home-description">
        Have you thought about <em>The Game</em>? Keep track of your losses and challenge your friends to see who can go the longest without losing!
      </p>
      <div className="home-button-container">
        <button onClick={() => handleNavigation("dashboard")} className="home-button">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
