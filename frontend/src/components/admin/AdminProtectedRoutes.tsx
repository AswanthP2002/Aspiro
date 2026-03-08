import { Modal } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

interface RootState {
    userAuth: {
        user: {email: string, id: string},
        userRole: string,
        initialLoading: boolean
    }
}
export default function AdminProtectedRoutes(){
    // alert('Request reached under router verification')
    const logedAdmin = useSelector((state: RootState) => {
        return state.userAuth
    })

    if(logedAdmin.initialLoading){
        return(
            <Modal sx={{backgroundColor: 'white'}} open={true}>
                <div>
                  <Loader />
                </div>
              </Modal>
        )
    }

    if(logedAdmin.user && logedAdmin.userRole === 'admin'){
        return <Outlet />
    }

    return <Navigate to='/admin/login' replace />

}