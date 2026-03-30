import { ConnectionRequestStatus } from '../../../domain/entities/connection/connectionRequest.entity';

export interface SendConnectionRequestDTO {
  sender: string;
  receiver: string;
  acted_by: string;
  acted_user_avatar: string;
}

export interface ConnectionRequestDTO {
  _id?: string;
  receiver?: string;
  sender?: string;
  status: ConnectionRequestStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateConnectionRequestDTO {
  _id?: string;
  status?: ConnectionRequestStatus;
  sender?: string;
  receiver?: string;
}

export interface AcceptConnectionRequestDTO {
  myId?: string;
  senderId?: string;
  myName?: string;
  myAvatar?: string;
}

export interface GetConnectionsRequestDTO {
  userId: string;
  search: string;
  page: number;
  limit: number;
}

export interface ConnectionWithSenderDetailsDTO {
  _id?: string;
  receiver?: string;
  sender?: string;
  status: ConnectionRequestStatus;
  createdAt?: string;
  updatedAt?: string;
  senderDetails?: {
    _id?: string;
    name?: string;
    headline?: string;
    profilePicture?: string;
  };
}
