import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RecruiterProtectedRoutes(){
    
    const recruiter = useSelector((state : any) => {
        return state.recruiterAuth.recruiter
    })

    return recruiter ? <Outlet /> : <Navigate to='/recruiter/login' replace />
}



export default RecruiterProtectedRoutes