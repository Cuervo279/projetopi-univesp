import { JSX } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ element }: { element: JSX.Element }) {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" replace />;
}