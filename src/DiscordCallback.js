import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { discordLogin } from './api';
import { UserContext } from './UserContext';

const DiscordCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const handleDiscordCallback = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      if (code) {
        try {
          const user = await discordLogin(code);
          setUser(user);
          navigate('/home');
        } catch (error) {
          console.error('Discord login error:', error);
          navigate('/login');
        }
      }
    };

    handleDiscordCallback();
  }, [location, navigate, setUser]);

  return <div>Processing Discord login...</div>;
};

export default DiscordCallback;
