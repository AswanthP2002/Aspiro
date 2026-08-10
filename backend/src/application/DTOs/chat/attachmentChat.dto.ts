export default interface AttachmentChatDTO {
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  attachements: Express.Multer.File;
}
