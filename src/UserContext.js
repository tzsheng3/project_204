import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { login as apiLogin } from './api';

const UserContext = createContext();

// Provider component to manage user authentication state and context
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const logoutTimerRef = useRef(null);

  // Function to log out the user
  const logout = useCallback((reason = 'manual') => {
    setUser(null);
    localStorage.removeItem('token');
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    localStorage.setItem('logoutReason', reason);
  }, []);

  // Function to reset the inactivity logout timer
  const resetLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    logoutTimerRef.current = setTimeout(() => {
      logout('inactivity');
    }, 300000); // Log out after 5 minutes of inactivity
  }, [logout]);

  // Function to handle user activity and reset the timer
  const handleActivity = useCallback(() => {
    if (user) {
      resetLogoutTimer();
    }
  }, [user, resetLogoutTimer]);

  // Effect to monitor user activity and reset the timer
  useEffect(() => {
    if (user) {
      resetLogoutTimer();

      // List of events to detect user activity
      const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];

      events.forEach(event => {
        window.addEventListener(event, handleActivity);
      });

      return () => {
        if (logoutTimerRef.current) {
          clearTimeout(logoutTimerRef.current);
        }
        events.forEach(event => {
          window.removeEventListener(event, handleActivity);
        });
      };
    }
  }, [user, handleActivity, resetLogoutTimer]);

  // Function to log in the user and set the user state
  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      setUser(data);
      localStorage.setItem('token', data.token);
      resetLogoutTimer();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
