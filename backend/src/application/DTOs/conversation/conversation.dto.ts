import { ConversationParticipants } from '../../../domain/entities/conversation/conversation.entity';
import UserDTO from '../user/user.dto';

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

export interface InitlaizeConversationResponseDTO {
  _id?: string;
  type: 'private' | 'group';
  participants: UserDTO[];
  lastMessage: {
    text: string;
    senderId: string;
    sendAt: string | Date;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FetchConversationsRequestDTO {
  logedUserId: string;
  search: string;
  pageg: number;
  limit: number;
}

export interface ConversationsWithUnreadCountDTO extends ConversationDTO {
  unreadMessage: number;
}
