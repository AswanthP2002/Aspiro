import { Schema } from 'mongoose';
import Conversation, {
  ConversationParticipants,
} from '../../../../domain/entities/conversation/conversation.entity';

const ConversationParticipantsSchema = new Schema<ConversationParticipants>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    joinedAt: { type: Date },
  },
  { timestamps: true }
);

export const ConversationSchema = new Schema<Conversation>(
  {
    type: { type: String, enum: ['private', 'group'], default: 'private' },
    participants: { type: [ConversationParticipantsSchema] },
    lastMessage: {
      text: { type: String },
      senderId: { type: Schema.Types.ObjectId },
      sendAt: { type: Date },
    },
  },
  { timestamps: true }
);
