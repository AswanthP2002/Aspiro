import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

type RootState = {
    userAuth: {
        user: {_id: string},
        userToken: string;
        userRole: string
    }
}

export default function PricingPageProtectedRoute(){
    const logedUser = useSelector((state: RootState) => {
        return state.userAuth
    })

    return logedUser.userRole === 'user' ? <Outlet /> : <Navigate to='/admin/dashboard' replace />
}