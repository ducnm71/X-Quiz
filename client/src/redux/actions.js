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

    const data = await fetchApi(
      {
        url: url + 'user/login',
        method: 'POST',
        body: credentials,
      },
      dispatch,
    );

    dispatch(loginSuccess(data));
  } catch (error) {
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

    dispatch(registerSuccess(data));
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
