import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

type RootUser = {
    userAuth: {
        userRole: string
    }
}

export default function AdminAlreadyLogedIn(){
    const logedAdmin = useSelector((state: RootUser) => {
        return state.userAuth
    })

    console.log('loged admin', logedAdmin)

    if(logedAdmin.userRole === 'admin'){
        return <Navigate to='/admin/dashboard' replace />
    }

    return <Outlet />
}