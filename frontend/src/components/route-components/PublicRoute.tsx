import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { UserRoutes } from '../../constants/routs/user.routes';

interface RootState {
  userAuth:{
    user:{
      id: string
    }
  }
}

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => {
    return state.userAuth.user
  })
  console.log('Checking - user Auth ---', user)
  return !user ? children : <Navigate to={UserRoutes.SOCIAL_FEED} replace />
  // const user = useSelector((state: RootState) => {
  //   return state.userAuth.user;
  // });

  // return !user ? children : <Navigate to={'/feed'} replace />;
};

export default PublicRoute;

/**
 * Testin :: commented actual logic
 * currently just showing actual route without user login check
 */
