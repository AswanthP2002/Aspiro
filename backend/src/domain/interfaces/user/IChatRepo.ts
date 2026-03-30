import Chat from '../../entities/chat/chat.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IChatRepository extends IBaseRepo<Chat> {
  getChatsByConversationId(conversationId: string, logedUserId: string): Promise<Chat[] | null>;
  updateChatDeletedFor(chatId: string, deletedUserId: string): Promise<Chat | null>;
}
