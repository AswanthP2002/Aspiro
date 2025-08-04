import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RecruiterLogedInRoutes(){
    const recruiter = useSelector((state : any) => {
        console.log('this is state', state)
        return state.recruiterAuth.recruiterToken
    })

    return recruiter ? <Navigate to='/recruiter' /> : <Outlet />
}