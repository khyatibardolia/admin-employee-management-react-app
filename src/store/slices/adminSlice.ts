import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  adminUsername: string | null;
  adminPassword: string | null;
  loggedIn: boolean;
}

const initialState: AdminState = {
  adminUsername: null,
  adminPassword: null,
  loggedIn: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    initializeAdmin(
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) {
      state.adminUsername = action.payload.username;
      state.adminPassword = action.payload.password;
      localStorage.setItem('adminUsername', action.payload.username);
      localStorage.setItem('adminPassword', action.payload.password);
    },
  },
});

export const { initializeAdmin } = adminSlice.actions;

export default adminSlice.reducer;
