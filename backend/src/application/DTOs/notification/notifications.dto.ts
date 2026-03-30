export default interface CreateNotificationDTO {
  recepientId?: string;
  category:
    | 'LIKE'
    | 'COMMENT'
    | 'FOLLOW'
    | 'CONNECTION_REQUEST'
    | 'CONNECTION_ACCEPTED'
    | 'COMMENT_REPLY'
    | 'SHARE';
  actorId?: string;
  targetType?: 'USER' | 'POST' | 'COMMENT';
  targetId?: string;
  targetUrl?: string;
  message?: string;
  isRead?: boolean;
  metadata?: { [key: string]: string | number | boolean | object | null | undefined };
}

export interface UpdateNotificationDTO {
  _id: string;
  recepientId?: string;
  category?:
    | 'LIKE'
    | 'COMMENT'
    | 'FOLLOW'
    | 'CONNECTION_REQUEST'
    | 'CONNECTION_ACCEPTED'
    | 'COMMENT_REPLY'
    | 'SHARE';
  actorId?: string;
  targetType?: 'USER' | 'POST' | 'COMMENT';
  targetId?: string;
  targetUrl?: string;
  message?: string;
  isRead?: boolean;
  isDeleted?: boolean;
  metadata?: { [key: string]: string | number | boolean | object | null | undefined };
  createdAt?: string;
}

export interface NotificationDTO {
  _id?: string;
  recepientId?: string;
  category:
    | 'LIKE'
    | 'COMMENT'
    | 'FOLLOW'
    | 'CONNECTION_REQUEST'
    | 'CONNECTION_ACCEPTED'
    | 'COMMENT_REPLY'
    | 'SHARE';
  actorId?: string;
  targetType?: 'USER' | 'POST' | 'COMMENT';
  targetId?: string;
  targetUrl?: string;
  message?: string;
  isRead?: boolean;
  isDeleted?: boolean;
  metadata?: { [key: string]: string | number | boolean | object | null | undefined };
  createdAt?: string;
  actorDetails?: {
    _id?: string;
    name?: string;
    profilePicture?: string;
    headline?: string;
  };
}
