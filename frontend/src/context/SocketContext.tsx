import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<{socket: Socket | null}>({socket: null})

export const SocketProvider = ({children}: {children: React.ReactNode}) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const user = useSelector((state: any) => {
        return state.userAuth.user
    })

    useEffect(() => {
        if(user?._id){
            const newSocket = io('http://localhost:5000')
            setSocket(newSocket)

            newSocket.emit('register_user', user._id)

            return () => {
                newSocket.close()
            }
        }
    }, [user])

    return <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
}