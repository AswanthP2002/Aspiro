import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function CandidateProtectedRoute(){
    const candidate = useSelector((state : any) => {
        return state.userAuth.user
    })

    return candidate ? <Outlet /> : <Navigate to='/login' />
}