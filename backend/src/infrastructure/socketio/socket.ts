//connection for socket

import { Server } from 'socket.io';
import { container } from 'tsyringe';
import { ConnectionManager } from './connectionManager';
import Chat from '../../domain/entities/user/chat.entity';
import { ChatDAO } from '../database/Schemas/user/chat.schema';
import { ConversationDAO } from '../database/DAOs/user/conversation.dao';
import mongoose from 'mongoose';

export const initSocket = (server: any) => {
  console.log('socket initialization called');
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    },
  });

  //regsiter socket in di container
  container.registerInstance('socketIO', io);
  const connectionManager = container.resolve(ConnectionManager);

  //socket connection
  io.on('connection', (socket) => {
    console.info('Connection happened inside backend')
    const userId = socket.handshake.auth.userId as string | undefined;
    console.info('User id of the socket', userId)

    if (!userId) {
      console.warn(`Anonymous connection attempt: ${socket.id}`);
      return;
    }
    console.log('new user connected', userId, socket.id);

    socket.data.userId = userId;
    connectionManager.addConnection(userId, socket.id);
    //message to the client for testing
    io.emit('USER_STATUS_CHANGED', { userId, status: 'online' });

    socket.emit('message', 'hello from server');

    

    //event listening for m essage sended
    socket.on('message-send', (message: string) => {
      console.log(message);
    });

    socket.to('socketcid').emit('message', 'hi');
    socket.on('JOIN_ROOM', (data) => {
      socket.join(data.targetId);
      console.log('User joined room: ', data.targetId);
    });
    socket.on('SEND_PRIVATE_MESSAGE', async (data: Chat) => {
      const { conversationId, senderId, receiverId, text } = data;

      try {
        const newMessage = await ChatDAO.create({
          conversationId,
          senderId,
          receiverId,
          text,
        });

        await ConversationDAO.findByIdAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(conversationId),
          },
          {
            $set: {
              lastMessage: { text, senderId, sendAt: new Date() },
            },
          }
        );

        io.to(conversationId as string).emit('RECEIVE_PRIVATE_MESSAGE', newMessage);
      } catch (error: unknown) {
        console.log('Error occured while saving message', error);
      }
    });

    socket.on('MARK_MESSAGE_AS_READ', async ({ conversationId, userId }) => {
      await ChatDAO.updateMany(
        { conversationId, receiverId: userId, isRead: false },
        { $set: { isRead: true } }
      );

      io.to(conversationId).emit('MESSAGES_READ_UPDATE', { conversationId, readerId: userId });
    });

    socket.on('disconnect', () => {
      io.emit('USER_STATUS_CHANGED', { userId: socket.data.userId, status: 'offline' });
      if (socket.data.userId) {
        connectionManager.removeConnection(socket.data.userId, socket.id);
      }
      console.log('user disconnected', socket.id);
    });
  });
};
