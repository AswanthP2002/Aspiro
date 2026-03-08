import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function NoAuthRoutes({children}: {children: React.ReactNode}){
    const logedUser = useSelector((state: any) => {
        return state.userAuth.user
    })

    return !logedUser ? children : <Navigate to={'/feed'} replace />
}