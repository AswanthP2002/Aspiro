import { ConversationParticipants } from '../../../domain/entities/user/conversation.entity';

export default interface ConversationDTO {
  _id?: string;
  type: 'private' | 'group';
  participants: ConversationParticipants[];
  lastMessage: {
    text: string;
    senderId: string;
    sendAt: string | Date;
  };
  createdAt: string;
  updatedAt: string;
}
