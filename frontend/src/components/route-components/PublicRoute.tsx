import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: any) => {
    return state.userAuth.user;
  });

  return !user ? children : <Navigate to={'/feed'} replace />;
};

export default PublicRoute;
