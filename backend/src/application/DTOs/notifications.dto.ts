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
  metadata?: { [key: string]: any };
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
  metadata?: { [key: string]: any };
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
  metadata?: { [key: string]: any };
  createdAt?: string;
}
