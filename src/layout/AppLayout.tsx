import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC, ReactNode } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';

const WhiteOutlinedButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.common.white,
  color: theme.palette.common.white,
  marginLeft: 'auto',
  '&:hover': {
    borderColor: theme.palette.common.white,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

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
            <WhiteOutlinedButton
              variant="outlined"
              onClick={() => navigate('/logout')}
            >
              Log out
            </WhiteOutlinedButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ marginTop: '64px', padding: '24px' }}>{children}</Box>
    </>
  );
};
