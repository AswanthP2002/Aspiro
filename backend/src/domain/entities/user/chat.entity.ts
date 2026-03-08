export default interface Chat {
  _id?: string;
  conversationId?: string;
  senderId?: string;
  receiverId?: string;
  text: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
