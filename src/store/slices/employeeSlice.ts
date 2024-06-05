import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: JSON.parse(localStorage.getItem('employees')) || [],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee(state, action) {
      state.employees.push(action.payload);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    editEmployeeDetails(state, action) {
      const { id, ...updatedEmployee } = action.payload;
      const index = state.employees.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...updatedEmployee,
        };
        localStorage.setItem('employees', JSON.stringify(state.employees));
      }
    },
  },
});

export const { addEmployee, editEmployeeDetails } = employeeSlice.actions;

export default employeeSlice.reducer;
