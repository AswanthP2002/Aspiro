import { injectable } from 'tsyringe';
import Conversation from '../../../domain/entities/conversation/conversation.entity';
import IConversationRepo from '../../../domain/interfaces/user/IConversationRepo';
import { ConversationDAO } from '../../database/DAOs/user/conversation.dao';
import BaseRepository from '../baseRepository';

@injectable()
export default class ConversationRepository
  extends BaseRepository<Conversation>
  implements IConversationRepo
{
  constructor() {
    super(ConversationDAO);
  }

  async getConversations(
    logedUserId: string,
    search: string,
    page: number,
    limit: number
  ): Promise<Conversation[] | null> {
    const skip = (page - 1) * limit;

    const result = await ConversationDAO.aggregate([
      { $unwind: { path: '$participants', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'participants.userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          participants: { $push: '$userDetails' },
          type: { $first: '$type' },
          lastMessage: { $first: '$lastMessage' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
        },
      },
      {
        $match: {
          $expr: { $gte: [{ $size: '$participants' }, 2] },
          'participants.name': { $regex: new RegExp(search, 'i') },
        },
      },
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    return result;
    // const result = await ConversationDAO.find({
    //   'participants.userId': new mongoose.Types.ObjectId(logedUserId),
    // })
    //   .populate('participants.userId', 'name email profilePicture')
    //   .sort({ createdAt: -1 });

    // return result;
  }

  // export default interface Conversation {
  //   _id?: string;
  //   type: 'private' | 'group';
  //   participants: ConversationParticipants[];
  //   lastMessage: {
  //     text: string;
  //     senderId: string;
  //     sendAt: string | Date;
  //   };
  //   createdAt?: string;
  //   updatedAt?: string;
  // }

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
