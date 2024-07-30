import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome to Know-Your-Neighborhood</h1>
      <nav>
        <ul>
          <li><Link to="/contact-us">Contact Us</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/terms-conditions">Terms and Conditions</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
