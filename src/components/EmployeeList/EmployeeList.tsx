import { FC } from 'react';
import {
  Link,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { useAppSelector } from 'hooks';
import { Employee } from 'store/slices/types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const CenteredMessage = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
  padding: '20px',
});

export const EmployeeList: FC = () => {
  const { employees } = useAppSelector((state) => state.employees);

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: '24px' }}
      aria-label="customized table"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Relationship</StyledTableCell>
            <StyledTableCell align="right">Type of work</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees?.length ? (
            employees.map((employee: Employee) => (
              <TableRow key={employee.id}>
                <StyledTableCell component="th" scope="row">
                  <Link href={`/employees/${employee.id}`}>
                    {employee.name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">{employee.age}</StyledTableCell>
                <StyledTableCell align="right">
                  {employee.relationship}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {employee.typeOfWork}
                </StyledTableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <StyledTableCell colSpan={4}>
                <CenteredMessage>
                  <Typography variant="h6">No Records Found!</Typography>
                </CenteredMessage>
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
