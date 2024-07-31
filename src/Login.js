import React, { useState, useContext, useEffect } from 'react';
import { login, discordLogin } from './api';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import discordOAuth from './discordOAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    if (code) {
      handleDiscordCallback(code);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      setUser(user);
      navigate('/home');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  const handleDiscordLogin = () => {
    window.location.href = discordOAuth.authorizationUrl;
  };

  const handleDiscordCallback = async (code) => {
    try {
      const user = await discordLogin(code);
      setUser(user);
      navigate('/');
    } catch (error) {
      setError('Discord login failed.');
      console.error('Discord login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button className="discord-login-button" onClick={handleDiscordLogin}>
        <img
          src="discord-icon-svgrepo-com.png"
          alt="Discord Logo"
          className="discord-login-icon"
        />
        Login with Discord
      </button>
      {error && <p className="error-message">{error}</p>}
      <p>Don't have an account? <a href="/register">Sign Up</a></p>
    </div>
  );
};

export default Login;
