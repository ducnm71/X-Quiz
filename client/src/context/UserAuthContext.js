import { useContext, createContext, useEffect, useReducer } from 'react';
import Reducer from './Reducer';

const initialState = {
  currentUser: null,
  loading: false,
  // alert: { open: false, severity: 'info', message: '' },
  profile: { name: '', photoURL: '' },
  authLogin: false,
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const UserAuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
    }
  }, []);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default UserAuthContext;
