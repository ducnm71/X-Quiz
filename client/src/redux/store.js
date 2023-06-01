import { configureStore } from '@reduxjs/toolkit';
import authSlice, { loginSuccess } from './authSlice';
import profileSlice from './profileSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
  },
});
const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  store.dispatch(loginSuccess({ accessToken }));
}

export default store;
