import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

type RootState = {
    userAuth: {
        user:{
            _id: string,
            subscription: {
                features:{[key: string]: string | boolean | number}
            }
        }
    }
}


export const ResumeAnalyzePlanProtectedRoute = () => {
    const logedUser = useSelector((state: RootState) => state.userAuth.user)

    if(logedUser.subscription.features['resumeAnalyzer']){
        return <Outlet />
    }else{
        return <Navigate to='/temp/pricing' replace />
    }
}

export const ResumeAutoCreatePlanProtectedRoute = () => {
    const logedUser = useSelector((state: RootState) => state.userAuth.user)

    if(logedUser.subscription.features['resumeBuilder']){
        return <Outlet />
    }else{
        return <Navigate to='/temp/pricing' replace />
    }
}