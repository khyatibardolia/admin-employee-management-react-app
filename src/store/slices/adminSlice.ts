import { createSlice } from '@reduxjs/toolkit';

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
    dummyReducer() {},
  },
});

export default adminSlice.reducer;
