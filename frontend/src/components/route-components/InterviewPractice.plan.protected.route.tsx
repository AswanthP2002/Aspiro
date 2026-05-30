import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

type RootState = {
    userAuth:{
        user:{
            _id: string,
            subscription:{
                features:{[key: string]: boolean | number | string}
            }
        }
    }
}

export const InterviewPracticePlanProtectedRoute = () => {
    const logedUser = useSelector((state: RootState) => state.userAuth.user)

    if(logedUser.subscription.features['interviewPractice']){
        return <Outlet />
    }else{
        return <Navigate to='/temp/pricing' replace />
    }
}