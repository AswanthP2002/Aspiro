import Conversation from '../../entities/conversation/conversation.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IConversationRepo extends IBaseRepo<Conversation> {
  getConversations(
    logedUserId: string,
    search: string,
    page: number,
    limit: number
  ): Promise<Conversation[] | null>;
  initializeConversation(senderId: string, recipientId: string): Promise<Conversation | null>;
}
