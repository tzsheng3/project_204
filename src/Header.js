import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const checkLogoutReason = () => {
      const logoutReason = localStorage.getItem('logoutReason');
      if (logoutReason === 'inactivity') {
        alert('You have been logged out due to inactivity.');
        localStorage.removeItem('logoutReason');
        navigate('/login');
      }
    };

    checkLogoutReason();

    // Check logout reason on focus, in case the user returns to the tab after being away
    window.addEventListener('focus', checkLogoutReason);

    return () => {
      window.removeEventListener('focus', checkLogoutReason);
    };
  }, [navigate]);

  return (
    <header className="header">
      <nav>
        <ul>
          {user ? (
            <>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/terms-conditions">Terms and Conditions</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
