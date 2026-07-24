import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

interface RootState {
    userAuth: {
        user: {
        _id: string,
        subscription?: {
            planId: string,
            subscriptionId: string
        }
    }
    }
}
export default function SubscriptionProtectedRoute(){
    const logedUser = useSelector((state: RootState) => {
        return state.userAuth.user
    })

    return logedUser?.subscription?.planId && logedUser.subscription.subscriptionId ? <Outlet /> : <Navigate to='/temp/pricing' replace />
    
}