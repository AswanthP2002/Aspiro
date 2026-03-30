import Notification from '../../../domain/entities/notification/notification.entity';

export default interface IRealTimeEventEmitter {
  postLiked(notification: Notification): void;
  postUnliked(postId: string, userId: string): void;
  addPostComment(postId: string, userId: string, commentId: string, text: string): void;
  deletePostComment(postId: string, commentId: string, userId: string): void;
  follow(notification: Notification): void;
  connectionRequest(notification: Notification): void;
  removeNotification(receipient: string, notificationId: string): void;
  connectionAccepted(notification: Notification): void;
}
