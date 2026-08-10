import Conversation, {
  ConversationWithUnreadMessageCount,
} from '../../../domain/entities/conversation/conversation.entity';
import {
  ConversationsWithUnreadCountDTO,
  InitlaizeConversationResponseDTO,
} from '../../DTOs/conversation/conversation.dto';
import UserDTO from '../../DTOs/user/user.dto';

export default class ConversationMapper {
  public conversationWithUnreadCountEntityToDTO(
    data: ConversationWithUnreadMessageCount
  ): ConversationsWithUnreadCountDTO {
    return {
      _id: data._id,
      type: data.type,
      participants: data.participants,
      lastMessage: data.lastMessage,
      unreadMessage: data.unReadMessage.length,
      createdAt: data.createdAt as string,
      updatedAt: data.updatedAt as string,
    };
  }

  public conversationDtoToInitalizeConvResponseDTO(
    data: Conversation & { participantsData: UserDTO[] }
  ): InitlaizeConversationResponseDTO {
    console.log('Checking upcoming data inside mapper', data)
    return {
      _id: data._id,
      type: data.type,
      lastMessage: data.lastMessage,
      createdAt: data.createdAt as string,
      updatedAt: data.updatedAt as string,
      participants: data.participantsData as UserDTO[],
    };
  }
}
