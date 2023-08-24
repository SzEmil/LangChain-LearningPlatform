import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ComponentType } from 'react';

type ProtectedRouteProps = {
  component: ComponentType;
  redirectTo?: string;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {

  const { isLoggedIn, isRefreshing } = useAuth();

  const shouldRedirect =
    isLoggedIn === true && isRefreshing === false;

  return shouldRedirect ? <Component /> : <Navigate to={redirectTo} />;
};
