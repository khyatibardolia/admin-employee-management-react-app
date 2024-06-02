import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoginComponent = React.lazy(() => import('pages/Login/Login'));
const HomeComponent = React.lazy(() => import('pages/Home/Home'));
const EmployeeDetailsComponent = React.lazy(
  () => import('pages/EmployeeDetails/EmployeeDetails')
);
const LogoutComponent = React.lazy(() => import('pages/Logout/Logout'));

export const AppRoutes = () => {
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
