import { FC, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, styled, Typography } from '@mui/material';
import { AddEditEmployeeModal } from 'components/AddEditEmployeeModal/AddEditEmployeeModal';
import { Employee } from 'store/slices/types';

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

type Props = {
  employee: Employee;
};

export const EmployeeInfo: FC<Props> = ({ employee }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
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
        <Button variant="contained" onClick={handleOpen}>
          Edit
        </Button>
      </Box>
      <AddEditEmployeeModal
        open={open}
        handleClose={handleClose}
        employee={employee}
        isEditMode
      />
    </Box>
  );
};
