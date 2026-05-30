import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Swal from "sweetalert2"

type RootState = {
    userAuth: {
        user: {
            _id: string,
            subscription: {
                features: {[key: string]: string | number | boolean}
            }
        }
    }
}

export const JobApplicationPlanProtectedRoute = () => {
    const logedUser = useSelector((state: RootState) => state.userAuth.user)
    
    if(
        logedUser.subscription.features['jobApplications'] && 
        parseInt((logedUser.subscription.features['jobApplications'] as string)) > 0
    ){
        return <Outlet />
    }else {
        Swal.fire({
            icon: 'info',
            title: 'Limit Reached',
            text: 'You have reached the limit for this month. Upgrade your plan for more applications',
            showConfirmButton: true,
            showCancelButton: false,
        })
        return <Navigate to='/temp/pricing' replace />
    }
    
}