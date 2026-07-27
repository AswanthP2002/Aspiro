import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import PageLoader from "../common/PageLoader";

type RootState = {
    userAuth: {
        user: {_id: string},
        userToken: string;
        userRole: string;
        initialLoading: boolean;
    }
}

export default function PricingPageProtectedRoute(){
    console.log('-- PPPR: Entered to pricing page protected route --')
    const logedUser = useSelector((state: RootState) => {
        return state.userAuth
    })
    console.log('-- PPPR: Checking loged user inside protected route --', logedUser)
    if(logedUser.initialLoading){
        return <PageLoader />
    }else {
        return <Outlet />
    }

    // return logedUser.userRole === 'user' ? <Outlet /> : <Navigate to='/admin/dashboard' replace />
}