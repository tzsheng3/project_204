import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { login as apiLogin } from './api';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const logoutTimerRef = useRef(null);

  const logout = useCallback((reason = 'manual') => {
    setUser(null);
    localStorage.removeItem('token');
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    localStorage.setItem('logoutReason', reason);
  }, []);

  const resetLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    logoutTimerRef.current = setTimeout(() => {
      logout('inactivity');
    }, 60000); 
  }, [logout]);

  const handleActivity = useCallback(() => {
    if (user) {
      resetLogoutTimer();
    }
  }, [user, resetLogoutTimer]);

  useEffect(() => {
    if (user) {
      resetLogoutTimer();
      
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
