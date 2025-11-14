import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Debug logging
  console.log('ProtectedRoute check:', {
    isAuthenticated,
    user,
    path: location.pathname,
    localStorage: localStorage.getItem('epiko_auth_user')
  });

  if (!isAuthenticated) {
    console.warn('Not authenticated, redirecting to /welcome from:', location.pathname);
    // Redirect to welcome page, save the attempted location for later redirect
    return <Navigate to="/welcome" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
