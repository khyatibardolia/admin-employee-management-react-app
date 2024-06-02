import { FC } from 'react';
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
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const FormContainer = styled(Box)(() => ({
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

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const LoginForm: FC = () => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <StyledBox>
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

          <FormContainer component="form" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ marginBottom: '40px' }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
