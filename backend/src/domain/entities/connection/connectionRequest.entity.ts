import User from '../user/User.FIX';

export type ConnectionRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED';

export default interface ConnectionRequest {
  _id?: string;
  receiver?: string;
  sender?: string;
  status: ConnectionRequestStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConnectionWithSenderDetails {
  _id: string;
  connectedUserDetails: {
    _id: string;
    name: string;
    headline: string;
    profilePicture: {
      cloudinaryPublicId: string;
      cloudinarySecureUrl: string;
    };
  };
}
