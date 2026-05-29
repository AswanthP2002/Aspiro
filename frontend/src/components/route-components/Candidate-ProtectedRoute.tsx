import { Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../candidate/Loader';

interface RootState {
  userAuth: {
    user: {_id: string, name: string},
    initialLoading: boolean,
    userRole: string,
    userToken: string
  }
}
const UserProtectedRoute = () => {
  const userAuth = useSelector((state: RootState) => {
    return state.userAuth;
  });

  const { user, userRole, initialLoading, userToken} = userAuth;

  if(initialLoading){
    return (
      <Modal sx={{backgroundColor: 'white'}} open={true}>
        <div>
          <Loader />
        </div>
      </Modal>
    )
  }

  if(user && userRole === 'user'){
    return <Outlet />
  } else if(userRole === 'admin'){
    return <Navigate to='/admin/dashboard' replace />
  }

  return <Navigate to='/login' replace />
};

export default UserProtectedRoute;
