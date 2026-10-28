import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import RoundedSpinner from "../common/RoundedSpinner";

interface RootState {
    userAuth: {
        user: {email: string, id: string},
        userRole: string,
        initialLoading: boolean
    }
}
export default function AdminProtectedRoutes(){
    const logedAdmin = useSelector((state: RootState) => {
        return state.userAuth
    })
    console.log('loged user', logedAdmin)

    
    if(logedAdmin.initialLoading){
        console.log('Checking initial loading', logedAdmin.initialLoading)
        return(
            <RoundedSpinner secondaryColor="white" />
        )
    }

    if(logedAdmin.user && logedAdmin.userRole === 'admin'){
        console.log('poceeding with outlet')
        return <Outlet />
    }
    console.log('not proceeding with outlet')

    return <Navigate to='/admin/login' replace />

}