import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function CandidateProtectedRoute(){
    const candidate = useSelector((state : {userAuth: {user: {_id: string}}}) => {
        return state.userAuth.user
    })

    return candidate ? <Outlet /> : <Navigate to='/login' />
}