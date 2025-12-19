//connection for socket

import { Server } from "socket.io"
import { container } from "tsyringe"


export const initSocket = (server: any) => {
    console.log('socket initialization called')
    const io = new Server(server, {
        cors:{
            origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
            methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            credentials:true
        }
    })

    //regsiter socket in di container
    container.registerInstance('socketIO', io)

    //socket connection
    io.on('connection', (socket) => {
        console.log('new user connected', socket.id)

        //message to the client for testing
        socket.emit('message', 'hello from server')

        //event listening for message sended
        socket.on('message-send', (message: string) => {
            console.log(message)
        })

        socket.to('socketcid').emit('message', "hi")

        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id)
        })
    })
}