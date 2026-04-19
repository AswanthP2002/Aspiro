import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface RootUser {
    userAuth: {
        user: {
            _id: string
        }
    }
}
export default function NoAuthRoutes({children}: {children: React.ReactNode}){
    const logedUser = useSelector((state: RootUser) => {
        return state.userAuth.user
    })

    return !logedUser ? children : <Navigate to={'/feed'} replace />
}