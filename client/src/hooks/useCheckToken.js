import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useCheckToken = () => {
  const token = useSelector((state) => state.auth.accessToken);
  useEffect(() => {}, [token]);
};

export default useCheckToken;
