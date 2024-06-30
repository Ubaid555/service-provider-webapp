// Filename - NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Import your custom CSS

const NotFound = () => {
 return (
    <div className="not-found">
       <img src='Images/error-404.png' alt="404 Not Found" className="not-found-image" />
        <div className="whole-page">
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">Oops! The page you are looking for does not exist.</p>

        <div className="not-found-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/services">Services</Link>
        </div>
        <p className="not-found-contact">Need help? <a href="mailto:awanhanzala6@gmail.com">Contact us</a></p>
        </div>
    </div>
 );
};

export default NotFound;
