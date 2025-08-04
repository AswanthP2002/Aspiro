import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminLogedIn(){
    const admin = useSelector((state : any) => {
        return state.adminAuth.admin
    })

    return admin ? <Navigate to='/admin/dashboard' /> : <Outlet />
}