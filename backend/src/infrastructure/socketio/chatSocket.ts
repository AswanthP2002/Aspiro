import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import Notification from "../../domain/entities/notification.entity";

let io: Server

const userSocketMap = new Map<string, string>()

export const initalizeSocket = (expServer: HttpServer) => {
  io = new Server(expServer, {
    cors:{
      origin:'http://localost:5173',
      methods:['GET', 'POST']
    }
  })

  io.on('connection', (socket: Socket) => {
    console.log('User connected', socket.id)


    socket.on('register_user', (userId: string) => {
      userSocketMap.set(userId, socket.id)
    })

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id)
      for(const [userId, socketId] of userSocketMap.entries()){
        if(socket.id === socketId){
          userSocketMap.delete(userId)
        }
      }
    })
  })
}

export const emitNotification = (receiverId: string, notification: Notification) => {
  const socketId = userSocketMap.get(receiverId)
  if(socketId){
    console.log('sending notification to the user', socketId)
    io.to(socketId).emit('new_notification', notification)
  }
}