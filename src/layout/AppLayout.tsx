import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import Logout from 'pages/Logout/Logout';

export const AppLayout: FC = ({ children }) => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <GroupIcon sx={{ marginRight: '8px' }} />
            <Typography variant="h6" noWrap component="div">
              Manage Employees
            </Typography>
            <Logout />
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ marginTop: '64px', padding: '24px' }}>{children}</Box>
    </>
  );
};
