import { configureStore } from '@reduxjs/toolkit';
import adminReducer from 'store/slices/adminSlice';
import employeeReducer from 'store/slices/employeeSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    employees: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
