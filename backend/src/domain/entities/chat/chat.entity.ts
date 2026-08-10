export interface Attachment {
  url: string;
  key?: string;
  fileName: string;
  fileType: string;
  fileSize?: number
}
export default interface Chat {
  _id?: string;
  conversationId?: string;
  senderId?: string;
  receiverId?: string;
  text: string;
  isRead: boolean;
  attachments?: Attachment[]
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
  deleteFor?: string[];
}
