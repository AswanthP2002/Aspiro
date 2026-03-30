import { injectable } from 'tsyringe';
import BaseRepository from '../baseRepository';
import Chat from '../../../domain/entities/chat/chat.entity';
import { ChatDAO } from '../../database/Schemas/user/chat.schema';
import IChatRepository from '../../../domain/interfaces/user/IChatRepo';
import mongoose from 'mongoose';

@injectable()
export default class ChatRepository extends BaseRepository<Chat> implements IChatRepository {
  constructor() {
    super(ChatDAO);
  }

  async getChatsByConversationId(
    conversationId: string,
    logedUserId: string
  ): Promise<Chat[] | null> {
    const chats = ChatDAO.find({
      conversationId: new mongoose.Types.ObjectId(conversationId),
      deleteFor: { $ne: new mongoose.Types.ObjectId(logedUserId) },
    }).sort({ createdAt: 1 });

    return chats;
  }

  async updateChatDeletedFor(chatId: string, deletedUserId: string): Promise<Chat | null> {
    const result = await ChatDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(chatId) },
      { $push: { deleteFor: deletedUserId } },
      { returnDocument: 'after' }
    );

    return result;
  }
}
