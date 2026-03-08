import { injectable } from 'tsyringe';
import BaseRepository from '../baseRepository';
import Chat from '../../../domain/entities/user/chat.entity';
import { ChatDAO } from '../../database/Schemas/user/chat.schema';
import IChatRepository from '../../../domain/interfaces/user/IChatRepo';
import mongoose from 'mongoose';

@injectable()
export default class ChatRepository extends BaseRepository<Chat> implements IChatRepository {
  constructor() {
    super(ChatDAO);
  }

  async getChatsByConversationId(conversationId: string): Promise<Chat[] | null> {
    const chats = ChatDAO.find({
      conversationId: new mongoose.Types.ObjectId(conversationId),
    }).sort({ createdAt: 1 });

    return chats;
  }
}
