import { FC, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks';
import { RootState } from 'store';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Employee } from 'store/slices/types';
import { EmployeeInfo } from 'components/EmployeeInfo/EmployeeInfo';

const EmployeeDetails: FC = () => {
  const [employee, setEmployee] = useState<Employee>({
    id: '',
    age: 0,
    name: '',
    relationship: '',
    typeOfWork: '',
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { employees } = useAppSelector((state: RootState) => state.employees);

  useEffect(() => {
    if (id && employees?.length) {
      //get employee details
      const singleEmployeeDetails = employees?.find(
        (employee: Employee) => employee.id === id
      ) as Employee;
      setEmployee(singleEmployeeDetails);
    }
  }, [id, employees]);

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
      <EmployeeInfo employee={employee} />
    </Box>
  );
};

export default EmployeeDetails;
