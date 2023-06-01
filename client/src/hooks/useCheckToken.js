import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProfile } from '../redux/actions';

const useCheckToken = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    const checkToken = () => {
      if (token) {
        dispatch(fetchProfile());
      }
    };

    checkToken();
  }, [token, dispatch]);
};

export default useCheckToken;
