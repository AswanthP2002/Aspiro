import {io, Socket} from 'socket.io-client'

let socket: null | Socket = null
export const initializeSocket = (userId: string) => {
    if(socket){
        socket.disconnect()
    }

    socket = io('http://localhost:5000', {
        auth: {userId} 
    })
    console.log('-- socket is here -- ', socket)

    return socket
}

export const disconnectSocket = (): void => {
    if(socket){
        socket.disconnect()
        socket = null
    }
}

export const getSocket = () => socket