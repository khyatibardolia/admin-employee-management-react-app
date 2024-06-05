import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: JSON.parse(localStorage.getItem('employees')) || [],
  employee: {},
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee(state, action) {
      state.employees.push(action.payload);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    getEmployeeDetails(state, action) {
      if (state.employees?.length) {
        state.employee = state.employees.find(
          (emp) => emp.id === action.payload
        );
      }
    },
  },
});

export const { addEmployee, getEmployeeDetails } = employeeSlice.actions;

export default employeeSlice.reducer;
