import Conversation from '../../entities/user/conversation.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IConversationRepo extends IBaseRepo<Conversation> {
  getConversations(logedUserId: string): Promise<Conversation[] | null>;
  initializeConversation(senderId: string, recipientId: string): Promise<Conversation | null>;
}
