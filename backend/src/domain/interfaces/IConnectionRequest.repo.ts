import ConnectionRequest, {
  ConnectionWithSenderDetails,
} from '../entities/connection/connectionRequest.entity';
import IBaseRepo from './IBaseRepo';

export default interface IConnectionRequestRepository extends IBaseRepo<ConnectionRequest> {
  cancelRequest(sender: string, receiver: string): Promise<ConnectionRequest | null>;
  rejectRequest(sender: string, receiver: string): Promise<ConnectionRequest | null>;
  acceptRequest(sender: string, myId: string): Promise<ConnectionRequest | null>;
  getConnections(
    userId: string,
    page: number,
    limit: number,
    search: string
  ): Promise<ConnectionWithSenderDetails[] | null>;
}
