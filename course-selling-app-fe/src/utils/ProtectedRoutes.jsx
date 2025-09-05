import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const UserProtectedRoute = () => {
  const { isAuthenticated, userType } = useAuth();
  return isAuthenticated && userType === 'user' ? <Outlet /> : <Navigate to="/signin" />;
};

export const AdminProtectedRoute = () => {
  const { isAuthenticated, userType } = useAuth();
  return isAuthenticated && userType === 'admin' ? <Outlet /> : <Navigate to="/admin/signin" />;
};