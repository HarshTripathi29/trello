import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token');
    },
    checkLogin: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
      }
    },
  },
});

export const { login, logout, checkLogin } = authSlice.actions;
export default authSlice.reducer;
