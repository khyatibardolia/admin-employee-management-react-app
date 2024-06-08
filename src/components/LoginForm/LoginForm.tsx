import {
  FC,
  FormEvent,
  forwardRef,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  styled,
  useTheme,
  Snackbar,
  SnackbarCloseReason,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import PersonIcon from '@mui/icons-material/Person';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from 'hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from 'store/slices/adminSlice';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '30%',
  height: '50%',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    height: '70%',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '60%',
    height: '60%',
  },
  [theme.breakpoints.up('md')]: {
    width: '50%',
    height: '70%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '40%',
  },
}));

const IconContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '40px',
}));

const FormContainer = styled('form')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
}));

const StyledCardActions = styled(CardActions)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginBottom: '10px',
  padding: 0,
}));

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

export const LoginForm: FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );

  useEffect(() => {
    if (location.state?.fromLogout) {
      setSnackbarMessage('Logout successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const formik = useFormik({
    initialValues: {
      adminUsername: '',
      adminPassword: '',
    },
    validationSchema: Yup.object({
      adminUsername: Yup.string().required('Username is required'),
      adminPassword: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      try {
        dispatch(login(values));
        setSnackbarMessage('Successfully logged in!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/'), 800);
      } catch (error) {
        setSnackbarMessage('Invalid login details!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    },
  });

  const handleSnackbarClose = (
    _event?: SyntheticEvent<any> | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <StyledBox>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={(event, reason) => handleSnackbarClose(event, reason)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <StyledCard>
        <CardContent sx={{ padding: 0, width: '100%' }}>
          <IconContainer>
            <PersonIcon
              sx={{ fontSize: 90, color: theme.palette.primary.main }}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: 'center' }}
            >
              Admin Login
            </Typography>
          </IconContainer>

          <FormContainer
            onSubmit={(e: FormEvent<HTMLFormElement>) => formik.handleSubmit(e)}
          >
            <TextField
              fullWidth
              id="adminUsername"
              name="adminUsername"
              label="Admin Username"
              value={formik.values.adminUsername}
              onChange={formik.handleChange}
              error={
                formik.touched.adminUsername &&
                Boolean(formik.errors.adminUsername)
              }
              helperText={
                formik.touched.adminUsername && formik.errors.adminUsername
              }
              sx={{ marginBottom: '40px' }}
            />
            <TextField
              fullWidth
              id="adminPassword"
              name="adminPassword"
              label="Admin Password"
              type="password"
              value={formik.values.adminPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.adminPassword &&
                Boolean(formik.errors.adminPassword)
              }
              helperText={
                formik.touched.adminPassword && formik.errors.adminPassword
              }
              sx={{ marginBottom: '40px' }}
            />
            <StyledCardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ padding: '12px' }}
              >
                Log In
              </Button>
            </StyledCardActions>
          </FormContainer>
        </CardContent>
      </StyledCard>
    </StyledBox>
  );
};
