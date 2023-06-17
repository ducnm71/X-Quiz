import { fetchApi } from '~/utils/fetchApi';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutUser,
  updateAccessToken,
} from './authSlice';
import { updateProfile } from './profileSlice';

const url = process.env.REACT_APP_SERVER_URL;

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    console.log('1');
    const data = await fetchApi(
      {
        url: url + 'user/login',
        method: 'POST',
        body: credentials,
      },
      dispatch,
    );
    console.log(data, '22222');
    if (data.success) {
      dispatch(loginSuccess(data));
      return true;
    } else {
      dispatch(loginFailure(data));
      return false;
    }
  } catch (error) {
    console.log('2');
    dispatch(loginFailure(error.message));
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());

    const data = await fetchApi(
      {
        url: url + 'user/register',
        method: 'POST',
        body: userData,
      },
      dispatch,
    );
    if (data.success) {
      dispatch(registerSuccess(data));
      return true;
    } else {
      dispatch(registerFailure(data.error));
      return false;
    }
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

export const logout = () => async (dispatch) => {
  await fetchApi({ url: url + 'user/logout' });
  dispatch(logoutUser());
};

export const fetchProfile = () => async (dispatch, getState) => {
  const { accessToken } = getState().auth;

  try {
    const data = await fetchApi(
      {
        url: url + 'user/profile',
        method: 'GET',
        token: accessToken,
      },
      dispatch,
    );
    dispatch(updateProfile(data));
  } catch (error) {}
};

export const fetchAccessToken = () => async (dispatch, getState) => {
  try {
    const data = await fetchApi(
      {
        url: url + 'token/refresh',
        method: 'GET',
      },
      dispatch,
    );

    dispatch(updateAccessToken(data));
  } catch (error) {
    dispatch(updateAccessToken(null));
  }
};
