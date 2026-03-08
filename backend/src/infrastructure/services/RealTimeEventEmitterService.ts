import { Server } from 'socket.io';
import IRealTimeEventEmitter from '../../application/interfaces/services/IRealTimeEventEmitter';
import { inject, injectable } from 'tsyringe';
import { ConnectionManager } from '../socketio/connectionManager';
import Notification from '../../domain/entities/notification.entity';
import { SocketEvents } from '../socketio/events';

@injectable()
export class RealTimeEventEmitterService implements IRealTimeEventEmitter {
  constructor(
    @inject('socketIO') private _io: Server,
    private _connectionManager: ConnectionManager
  ) {}

  postLiked(notification: Notification): void {
    this._io.emit('FEED_POST_LIKED', {
      postId: notification.targetId,
      userId: notification.actorId,
    });
    if (notification.actorId === notification.recepientId) return;
    const getSockets = this._connectionManager.getSockets(notification.recepientId as string);
    getSockets.forEach((socketId: string) => {
      this._io.to(socketId).emit('POST_LIKED', notification);
    });
  }

  postUnliked(postId: string, userId: string): void {
    this._io.emit('postUnliked', { postId, userId });
  }

  addPostComment(postId: string, userId: string, commentId: string, text: string): void {
    this._io.emit('commentAdded', { postId, userId, commentId, text });
  }

  deletePostComment(postId: string, commentId: string, userId: string): void {
    this._io.emit('commentDeleted', { postId, commentId, userId });
  }

  follow(notification: Notification): void {
    const targetSockets = this._connectionManager.getSockets(notification.recepientId as string);
    targetSockets.forEach((socketId: string) => {
      this._io.to(socketId).emit(SocketEvents.FOLLOWED, notification);
    });
  }

  connectionRequest(notification: Notification): void {
    const targetedSockets = this._connectionManager.getSockets(notification.recepientId as string);
    targetedSockets.forEach((socketId: string) => {
      this._io.to(socketId).emit(SocketEvents.CONNECTION_REQUEST, notification);
    });
  }

  connectionAccepted(notification: Notification): void {
    const targetedSockets = this._connectionManager.getSockets(notification.recepientId as string);
    targetedSockets.forEach((socketId: string) => {
      this._io.to(socketId).emit(SocketEvents.CONNECTION_REQUEST_ACCEPTED, notification);
    });
  }

  removeNotification(receipient: string, notificationId: string): void {
    const targettedSockets = this._connectionManager.getSockets(receipient);
    targettedSockets.forEach((socketId: string) => {
      this._io.to(socketId).emit(SocketEvents.CONNECTION_REQUEST_CANCELLED, notificationId);
    });
  }
}
