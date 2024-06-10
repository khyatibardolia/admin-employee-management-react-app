import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from 'utils/localStorage';

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
      const { username, password } = action.payload;
      state.adminUsername = username;
      state.adminPassword = password;
      setLocalStorageItem('adminUsername', username);
      setLocalStorageItem('adminPassword', password);
    },
    login(
      state,
      action: PayloadAction<{ adminUsername: string; adminPassword: string }>
    ) {
      if (
        action.payload.adminUsername === getLocalStorageItem('adminUsername') &&
        action.payload.adminPassword === getLocalStorageItem('adminPassword')
      ) {
        state.loggedIn = true;
        setLocalStorageItem('loggedIn', 'true');
      } else {
        throw new Error('Invalid credentials');
      }
    },
    logout(state) {
      state.loggedIn = false;
      removeLocalStorageItem('loggedIn');
    },
  },
});

export const { initializeAdmin, login, logout } = adminSlice.actions;

export default adminSlice.reducer;
