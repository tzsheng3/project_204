import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

// Component to protect routes that require authentication
const ProtectedRoute = () => {
  const { user } = useContext(UserContext);

  // If no user is logged in, navigate to the login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
