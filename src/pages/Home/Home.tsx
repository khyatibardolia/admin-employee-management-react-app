import { FC, useState } from 'react';
import { Box, Button, Snackbar } from '@mui/material';
import { EmployeeList } from 'components/EmployeeList/EmployeeList';
import { AddEditEmployeeModal } from 'components/AddEditEmployeeModal/AddEditEmployeeModal';
import { useAppSelector } from 'hooks';

const Home: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { employees } = useAppSelector((state) => state.employees);

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginLeft: 'auto' }}
        onClick={handleOpen}
      >
        Add Employee
      </Button>
      {employees.length === 0 && (
        <Snackbar
          open={true}
          message="Add a new employee via the 'Add Employee' button."
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
      )}
      <EmployeeList />
      <AddEditEmployeeModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Home;
