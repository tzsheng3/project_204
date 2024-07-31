import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Login from './Login';
import Register from './Registration';
import DiscordCallback from './DiscordCallback';
import HomePage from './HomePage';
import ContactUsPage from './ContactUspage';
import AboutUsPage from './AboutUsPage';
import TermsConditionsPage from './TermsConditionsPage';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  return (
    // Provide user context to the entire application
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/discord/callback" element={<DiscordCallback />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
