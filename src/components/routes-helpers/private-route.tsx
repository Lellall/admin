import { Fragment, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  // const auth = !!(user && access_token);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  return <Fragment>{children}</Fragment>;
};

export default PrivateRoute;
