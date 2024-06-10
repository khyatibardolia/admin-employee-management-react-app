import { createSlice } from '@reduxjs/toolkit';
import { Employee } from 'store/slices/types';
import { getLocalStorageItem, setLocalStorageItem } from 'utils/localStorage';

export interface EmployeeState {
  employees: Employee[];
}

const storedEmployees = getLocalStorageItem('employees');

const initialState: EmployeeState = {
  employees: storedEmployees ? JSON.parse(storedEmployees) : [],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee(state, action) {
      state.employees.push(action.payload);
      setLocalStorageItem('employees', JSON.stringify(state.employees));
    },
    editEmployeeDetails(state, action) {
      const { id, ...updatedEmployee } = action.payload;
      const index = state.employees.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...updatedEmployee,
        };
        setLocalStorageItem('employees', JSON.stringify(state.employees));
      }
    },
  },
});

export const { addEmployee, editEmployeeDetails } = employeeSlice.actions;

export default employeeSlice.reducer;
