import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProfile } from '../redux/actions';

const useCheckToken = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const checkToken = () => {
      if (token) {
        dispatch(fetchProfile(token));
      }
    };

    checkToken();
  }, [token, dispatch]);
};

export default useCheckToken;
