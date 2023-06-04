import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.loading = false;
      state.error = null;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.loading = false;
      state.error = null;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
  },
});
export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logoutUser } =
  authSlice.actions;

export default authSlice.reducer;
