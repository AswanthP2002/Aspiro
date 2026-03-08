import { injectable } from 'tsyringe';
import Conversation from '../../../domain/entities/user/conversation.entity';
import IConversationRepo from '../../../domain/interfaces/user/IConversationRepo';
import { ConversationDAO } from '../../database/DAOs/user/conversation.dao';
import BaseRepository from '../baseRepository';
import mongoose from 'mongoose';

@injectable()
export default class ConversationRepository
  extends BaseRepository<Conversation>
  implements IConversationRepo
{
  constructor() {
    super(ConversationDAO);
  }

  async getConversations(logedUserId: string): Promise<Conversation[] | null> {
    const result = await ConversationDAO.find({
      'participants.userId': new mongoose.Types.ObjectId(logedUserId),
    })
      .populate('participants.userId', 'name email profilePicture')
      .sort({ createdAt: -1 });

    return result;
  }

  async initializeConversation(
    senderId: string,
    recipientId: string
  ): Promise<Conversation | null> {
    let conversation = await ConversationDAO.findOne({
      type: 'private',
      'participants.userId': { $all: [senderId, recipientId] },
    }).populate('participants.userId', 'name email profilePicture');

    if (!conversation) {
      conversation = await ConversationDAO.create({
        type: 'private',
        participants: [
          { userId: senderId, joinedAt: new Date() },
          { userId: recipientId, joinedAt: new Date() },
        ],
        lastMessage: {
          text: 'New Conversation Started',
          senderId: senderId,
          sendAt: new Date(),
        },
      });

      await conversation.save();

      await conversation.populate('participants.userId', 'name email profilePicture');
    }

    return conversation;
  }
}
