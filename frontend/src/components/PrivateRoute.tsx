// frontend/src/components/PrivateRoute.tsx
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  element: ReactElement;
}

export default function PrivateRoute({ element }: PrivateRouteProps) {
  const { user } = useAuth();

  return user ? element : <Navigate to="/login" replace />;
}
