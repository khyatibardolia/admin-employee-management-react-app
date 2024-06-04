import { FC } from 'react';
import { Button, styled } from '@mui/material';

const WhiteOutlinedButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.common.white,
  color: theme.palette.common.white,
  marginLeft: 'auto',
  '&:hover': {
    borderColor: theme.palette.common.white,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Logout: FC = () => {
  return <WhiteOutlinedButton variant="outlined">Log out</WhiteOutlinedButton>;
};

export default Logout;
