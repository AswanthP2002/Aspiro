import Chat from '../../entities/user/chat.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IChatRepository extends IBaseRepo<Chat> {
  getChatsByConversationId(conversationId: string): Promise<Chat[] | null>;
}
