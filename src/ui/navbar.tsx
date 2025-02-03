import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    
    return (
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
    );
}

export default Navbar;