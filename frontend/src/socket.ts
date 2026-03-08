import {io} from 'socket.io-client'

let socket: any = null
export const initializeSocket = (userId: string) => {
    if(socket){
        socket.disconnect()
    }

    socket = io('http://localhost:5000', {
        auth: {userId}
    })

    return socket
}

export const disconnectSocket = (): void => {
    if(socket){
        socket.disconnect()
        socket = null
    }
}

export const getSocket = () => socket