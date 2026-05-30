import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
type RootState = {
    userAuth: {
        user:{
            _id: string,
            subscription:{
                planId: string,
                subscriptionId: string,
                features: {[key: string]: string | number | boolean}
            }
        }
    }
}


export const RecruiterProfilePlanProtectedRoute = (): React.ReactElement => {
    const logedUser = useSelector((state: RootState) => state.userAuth.user)

    if(logedUser.subscription.features['recruiterProfile']){
        return <Outlet />
    }else{
        return <Navigate to='/temp/pricing' replace />
    }
}