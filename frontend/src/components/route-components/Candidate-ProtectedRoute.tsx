import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const CandidateProtectedRoute = () => {
  const userAuth = useSelector((state: any) => {
    return state.userAuth;
  });

  const { user, userRole } = userAuth;

  return user && userRole === 'candidate' ? (
    <Outlet />
  ) : (
    <Navigate to={'/candidate/login'} replace />
  );
};

export default CandidateProtectedRoute;
