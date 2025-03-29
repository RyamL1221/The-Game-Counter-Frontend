import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
        <nav className="footer-nav">
            <a href="/login" className="footer-link">Login</a>
            <a href="/register" className="footer-link">Register</a>
            <a href="/dashboard" className="footer-link">Dashboard</a>
        </nav>
        </footer>
    );
}

export default Footer;