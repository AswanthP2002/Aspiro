import { model, Schema } from 'mongoose';
import Chat from '../../../../domain/entities/user/chat.entity';

export const ChatSchema = new Schema<Chat>(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: 'conversations', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    text: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ChatDAO = model<Chat>('chat', ChatSchema);
