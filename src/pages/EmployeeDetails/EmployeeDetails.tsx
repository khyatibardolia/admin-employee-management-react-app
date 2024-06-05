import { FC, useEffect, useState } from 'react';
import { Box, Button, Avatar, Typography, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getEmployeeDetails } from 'store/slices/employeeSlice';
import { RootState } from 'store';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonIcon from '@mui/icons-material/Person';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(1),
  fontSize: '1.5rem',
}));

const Value = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '1.2rem',
}));

const EmployeeDetails: FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const employee = useAppSelector(
    (state: RootState) => state.employees.employee
  );

  const toggleEditMode = () => setIsEditMode((prev) => !prev);
  const handleSave = () => {
    toggleEditMode();
  };

  useEffect(() => {
    if (id) {
      dispatch(getEmployeeDetails(id));
    }
  }, [id, dispatch]);

  if (!employee) {
    return <Typography>Sorry, unable to fetch employee data.</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
        <Typography variant="h4" align="center">
          Employee Details
        </Typography>
        <Box sx={{ width: 1 / 6 }} /> {/* This is to balance the space */}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '40px',
        }}
      >
        <StyledAvatar>
          <PersonIcon sx={{ fontSize: 60 }} />
        </StyledAvatar>
        <Box sx={{ fontSize: '2rem', width: '100%', maxWidth: 400 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Title>Name:</Title>
            <Value>{employee.name}</Value>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Title>Age:</Title>
            <Value>{employee.age}</Value>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Title>Relationship:</Title>
            <Value>{employee.relationship}</Value>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Title>Type of Work:</Title>
            <Value>{employee.typeOfWork}</Value>
          </Box>
        </Box>
        <Box mt={2}>
          {isEditMode ? (
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button variant="contained" onClick={toggleEditMode}>
              Edit
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeDetails;
