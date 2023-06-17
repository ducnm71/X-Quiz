import { createSlice } from '@reduxjs/toolkit';
const tokenLocal = localStorage.getItem('accessToken');
let initialState = {
  accessToken: tokenLocal ? tokenLocal : null,
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
      state.message = action.payload.message;
      state.loading = false;
      state.error = null;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.message = action.payload.message;
      state.loading = false;
      state.error = null;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutUser,
  updateAccessToken,
} = authSlice.actions;

export default authSlice.reducer;
