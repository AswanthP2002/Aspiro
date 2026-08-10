import Chat from '../../../domain/entities/chat/chat.entity';
import Notification from '../../../domain/entities/notification/notification.entity';
import User from '../../../domain/entities/user/User';

export default interface IRealTimeEventEmitter {
  postLiked(notification: Notification): void;
  postUnliked(postId: string, userId: string): void;
  addPostComment(postId: string, userId: string, commentId: string, text: string): void;
  deletePostComment(postId: string, commentId: string, userId: string): void;
  follow(notification: Notification): void;
  connectionRequest(notification: Notification): void;
  removeNotification(receipient: string, notificationId: string): void;
  connectionAccepted(notification: Notification): void;
  deleteChatForAll(chatingPersonId: string, deletedChatId: string, conversationId: string): void;
  sendMesseWithAttachments(message: Chat, conversationId: string): void;
  sendNewMessage(message: Chat, receiver: string, sender: User): void;
}
