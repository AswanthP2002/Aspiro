import mongoose, { model, Schema } from 'mongoose';
import Chat, { Attachment } from '../../../../domain/entities/chat/chat.entity';
import { string } from 'zod';

export const AttachmentSchema = new Schema<Attachment>({
  url: { type: String },
  key: { type: String },
  fileName: { type: String },
  fileType: { type: String },
  fileSize: { type: Number },
});

export const ChatSchema = new Schema<Chat>(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: 'conversations', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    text: { type: String, required: false, default: '' },
    isRead: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deleteFor: { type: [mongoose.Schema.Types.ObjectId] },
    attachments: { type: [AttachmentSchema], default: [] },
  },
  { timestamps: true }
);

export const ChatDAO = model<Chat>('chat', ChatSchema);
