import { ConversationWithUnreadMessageCount } from '../../../domain/entities/conversation/conversation.entity';
import { ConversationsWithUnreadCountDTO } from '../../DTOs/conversation/conversation.dto';

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
}
