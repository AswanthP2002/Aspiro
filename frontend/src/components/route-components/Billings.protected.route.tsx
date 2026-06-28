import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

type RootState = {
    userAuth: {
        user:{
            _id: string,
            subscription: {
                name: string,
                planId: string,
                subscriptionId: string
            }
        }
    }
}

const BillingsProtectedRoute = () => {
    const logedUser = useSelector((state: RootState) => {
        return state.userAuth.user
    })

    if(logedUser.subscription.planId){
        return <Outlet />
    }else{
        return <Navigate to='/temp/pricing' replace />
    }
}

export default BillingsProtectedRoute