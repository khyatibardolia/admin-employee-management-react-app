import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdminState {
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
    login(
      state,
      action: PayloadAction<{ adminUsername: string; adminPassword: string }>
    ) {
      if (
        action.payload.adminUsername ===
          localStorage.getItem('adminUsername') &&
        action.payload.adminPassword === localStorage.getItem('adminPassword')
      ) {
        state.loggedIn = true;
        localStorage.setItem('loggedIn', 'true');
      } else {
        throw new Error('Invalid credentials');
      }
    },
    logout(state) {
      state.loggedIn = false;
      localStorage.removeItem('loggedIn');
    },
  },
});

export const { initializeAdmin, login, logout } = adminSlice.actions;

export default adminSlice.reducer;
