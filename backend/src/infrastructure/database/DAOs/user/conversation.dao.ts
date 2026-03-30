import { model } from 'mongoose';
import Conversation from '../../../../domain/entities/conversation/conversation.entity';
import { ConversationSchema } from '../../Schemas/user/conversation.schema';

export const ConversationDAO = model<Conversation>('conversations', ConversationSchema);
