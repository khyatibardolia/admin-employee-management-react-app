import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from 'layout/AppLayout';

const ProtectedRoute: FC = () => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return isLoggedIn ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
