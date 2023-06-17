import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccessToken, fetchProfile, logout } from './actions';
import { selectAccessToken } from './selectors';

function withAuth(isAuth, MyComponent) {
  const AuthenticatedComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(selectAccessToken);
    useEffect(() => {
      const checkAccessTokenExpiration = () => {
        if (!accessToken) {
          return;
        } else {
          dispatch(fetchAccessToken());
        }
        dispatch(fetchProfile());
      };

      checkAccessTokenExpiration();
    }, [accessToken]);

    if (accessToken && isAuth === true) {
      return <MyComponent />;
    } else if (isAuth === false) {
      return <MyComponent />;
    } else {
      navigate('/signin');
      return null;
    }
  };

  return AuthenticatedComponent;
}

export default withAuth;
