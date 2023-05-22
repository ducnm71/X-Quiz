import fetApi from '../utils/fetApi';

const url = process.env.REACT_APP_SERVER_URL + '/user';

export const register = async (user, dispatch) => {
  try {
    const result = await fetApi({ url: url + '/register', body: user }, dispatch);
    if (result) {
      dispatch({ type: 'UPDATE_USER', payload: result });
      dispatch({ type: 'REGISTER', payload: true });
      localStorage.setItem('currentUser', JSON.stringify(result));
    }
  } catch (error) {
    dispatch({ type: 'UPDATE_USER', payload: null });
    dispatch({ type: 'REGISTER', payload: false });
  }
};

export const login = async (user, dispatch) => {
  try {
    const result = await fetApi({ url: url + '/login', body: user }, dispatch);
    if (result) {
      dispatch({ type: 'UPDATE_USER', payload: result });
      dispatch({ type: 'LOGIN', payload: true });
      localStorage.setItem('currentUser', JSON.stringify(result.name));
    }
  } catch (error) {
    dispatch({ type: 'UPDATE_USER', payload: null });
    dispatch({ type: 'LOGIN', payload: false, error: error.message });
  }
};
