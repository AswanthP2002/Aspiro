import { injectable } from 'tsyringe';
import ConnectionRequest, {
  ConnectionWithSenderDetails,
} from '../../../domain/entities/connection/connectionRequest.entity';
import IConnectionRequestRepository from '../../../domain/interfaces/IConnectionRequest.repo';
import { ConnectionRequestDAO } from '../../database/DAOs/user/connectionRequest.dao';
import BaseRepository from '../baseRepository';
import mongoose from 'mongoose';

@injectable()
export default class ConnectionRequestRepository
  extends BaseRepository<ConnectionRequest>
  implements IConnectionRequestRepository
{
  constructor() {
    super(ConnectionRequestDAO);
  }

  async cancelRequest(sender: string, receiver: string): Promise<ConnectionRequest | null> {
    const result = await ConnectionRequestDAO.findOneAndUpdate(
      {
        sender: new mongoose.Types.ObjectId(sender),
        receiver: new mongoose.Types.ObjectId(receiver),
      },
      { $set: { status: 'CANCELED' } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async rejectRequest(sender: string, receiver: string): Promise<ConnectionRequest | null> {
    const result = await ConnectionRequestDAO.findOneAndUpdate(
      {
        sender: new mongoose.Types.ObjectId(sender),
        receiver: new mongoose.Types.ObjectId(receiver),
      },
      { $set: { status: 'REJECTED' } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async acceptRequest(sender: string, myId: string): Promise<ConnectionRequest | null> {
    const result = await ConnectionRequestDAO.findOneAndUpdate(
      {
        sender: new mongoose.Types.ObjectId(sender),
        receiver: new mongoose.Types.ObjectId(myId),
      },
      { $set: { status: 'ACCEPTED' } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async getConnections(
    userId: string,
    page: number,
    limit: number,
    search: string
  ): Promise<ConnectionWithSenderDetails[] | null> {
    const skip = (page - 1) * limit;
    const result = await ConnectionRequestDAO.aggregate([
      {
        $match: {
          receiver: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $facet: {
          connections: [
            {
              $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'senderDetails',
              },
            },
            { $unwind: { path: '$senderDetails', preserveNullAndEmptyArrays: true } },
            {
              $match: {
                'senderDetails.name': { $regex: new RegExp(search, 'i') },
              },
            },
            { $skip: skip },
            { $limit: limit },
          ],
        },
      },
    ]);

    const connections = result[0]?.connections;

    return connections;
  }
}
