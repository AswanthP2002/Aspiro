import ConnectionRequest from '../entities/user/connectionRequest.entity';
import IBaseRepo from './IBaseRepo';

export default interface IConnectionRequestRepository extends IBaseRepo<ConnectionRequest> {
  cancelRequest(sender: string, receiver: string): Promise<ConnectionRequest | null>;
  rejectRequest(sender: string, receiver: string): Promise<ConnectionRequest | null>;
  acceptRequest(sender: string, myId: string): Promise<ConnectionRequest | null>
}
