export type ConnectionRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED';

export default interface ConnectionRequest {
  _id?: string;
  receiver?: string;
  sender?: string;
  status: ConnectionRequestStatus;
  createdAt?: string;
  updatedAt?: string;
}
