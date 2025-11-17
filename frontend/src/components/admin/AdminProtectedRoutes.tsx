import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoutes(){
    const admin = useSelector((state : any) => {
        return state.userAuth.user
    })

    return admin ? <Outlet /> : <Navigate to='/admin/login' />
}