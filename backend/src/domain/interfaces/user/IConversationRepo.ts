import Conversation, {
  ConversationWithUnreadMessageCount,
} from '../../entities/conversation/conversation.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IConversationRepo extends IBaseRepo<Conversation> {
  getConversations(
    logedUserId: string,
    search: string,
    page: number,
    limit: number
  ): Promise<ConversationWithUnreadMessageCount[] | null>;
  initializeConversation(senderId: string, recipientId: string): Promise<Conversation | null>;
  getUnreadConversationsCount(logedUserId: string): Promise<number | null>;
}
