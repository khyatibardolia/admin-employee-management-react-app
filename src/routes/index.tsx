import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch } from 'hooks';
import { initializeAdmin } from 'store/slices/adminSlice';

const LoginComponent = React.lazy(() => import('pages/Login/Login'));
const HomeComponent = React.lazy(() => import('pages/Home/Home'));
const EmployeeDetailsComponent = React.lazy(
  () => import('pages/EmployeeDetails/EmployeeDetails')
);
const LogoutComponent = React.lazy(() => import('pages/Logout/Logout'));

export const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialAdminUsername = params.get('initialAdminUsername');
    const initialAdminPassword = params.get('initialAdminPassword');

    if (initialAdminUsername && initialAdminPassword) {
      dispatch(
        initializeAdmin({
          username: initialAdminUsername,
          password: initialAdminPassword,
        })
      );
      navigate('/login');
    }
  }, [dispatch, navigate, location.search]);

  return (
    <Suspense
      fallback={
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
        >
          <CircularProgress size={75} />
        </Box>
      }
    >
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<HomeComponent />} />
        <Route path="/employees/:id" element={<EmployeeDetailsComponent />} />
        <Route path="/logout" element={<LogoutComponent />} />
        <Route path="*" element={<LoginComponent />} />
      </Routes>
    </Suspense>
  );
};
