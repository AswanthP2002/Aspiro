import { injectable } from 'tsyringe';
import ConnectionRequest from '../../../domain/entities/user/connectionRequest.entity';
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
}
