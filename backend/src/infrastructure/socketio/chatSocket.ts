import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import Notification from "../../domain/entities/notification.entity";
import { MessageDAO } from "../database/DAOs/message.dao";
import mongoose from "mongoose";

let io: Server

const userSocketMap = new Map<string, string>()

export const initalizeSocket = (expServer: HttpServer) => {
  io = new Server(expServer, {
    cors:{
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      methods:['GET', 'POST']
    },
    path: '/socket.io' // Explicitly define the path for Socket.IO
  })

  io.on('connection', (socket: Socket) => {
    console.log('User connected', socket.id)


    socket.on('register_user', (userId: string) => {
      (socket as any).userId = userId
      userSocketMap.set(userId, socket.id)
      
    })

    socket.on('chat:send',async (data) => {
      const {receiverId, text} = data

      const messageResult = await MessageDAO.create({
        message:text,
        receiver:new mongoose.Types.ObjectId(receiverId)
      })

      const recieverSocket = userSocketMap.get(receiverId)

      if(recieverSocket){
        io.to(recieverSocket).emit('chat:receive', messageResult)
      }

      socket.emit('chat:send', text)
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