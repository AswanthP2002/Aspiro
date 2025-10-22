import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserProtectedRoute = () => {
  const userAuth = useSelector((state: any) => {
    return state.userAuth;
  });

  const { user, userRole } = userAuth;

  return user && userRole === 'user' ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} replace />
  );
};

export default UserProtectedRoute;
