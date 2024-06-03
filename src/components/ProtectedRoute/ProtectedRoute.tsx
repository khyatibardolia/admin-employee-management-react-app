import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: FC = () => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
