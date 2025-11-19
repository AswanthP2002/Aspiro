
import { Notify } from "notiflix";
import React, {createContext, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<{socket: Socket | null}>({socket: null})

export default function SocketProvider({children}: {children: React.ReactNode}){

    const [socket, setSocket] = useState<Socket | null>(null)
    const logedUser = useSelector((state: any) => {
        return state.userAuth.user
    })

    useEffect(() => {
        if(logedUser?.id){
            console.log('---- checking if a user exist or not ---- user exist !!!!!!!!')
            const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000')

            setSocket(newSocket)
            newSocket.on('message', (data) => {
                Notify.success(data)
            })

            return () => {
                newSocket.close()
            }
        }
    }, [logedUser])

    return <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
}