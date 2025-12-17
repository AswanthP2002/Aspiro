import { Schema } from 'mongoose';
import Notification from '../../../domain/entities/notification.entity';

export const NotificationSchema = new Schema<Notification>({
  recepientId:{type: Schema.Types.ObjectId, ref:'users', required:true},
  type:{type: String, enum:['USER_ACTION', 'JOB_ALERT', 'SYSTEM_NOTICE']},
  category:{type: String, enum:['LIKE', 'COMMENT', 'FOLLOW', 'CONNECTION_REQUEST', 'CONNECTION_ACCEPTED', 'EXPIRY', 'APPLICATION_STATUS_CHANGE', 'JOB']},
  actorId:{type: Schema.Types.ObjectId},
  targetType:{type: String, enum:['USER', 'JOB', 'POST', 'RECRUITER', 'APPLICATION']},
  targetId:{type: Schema.Types.ObjectId},
  message:{type: String},
  isRead:{type: Boolean, default:false},
  metaData:{type: Object}
}, {timestamps:true})


/**
 * _id: string
    recepientId: string
    type: 'USER_ACTION' | 'JOB_ALERT' | 'SYSTEM_NOTICE'
    category: 'LIKE' | 'COMMENT' | 'FOLLOW' | 'CONNECTION_REQUEST' | 'CONNECTION_ACCEPTED' | 'EXPIRY' | 'APPLICATION_STATUS_CHANGE' | 'JOB'
    actorId?: string
    targetType?: 'USER' | 'JOB' | 'POST' | 'RECRUITER' | 'APPLICATION'
    targetId?: string
    message?: string
    isRead: boolean
    createdAt: string
    metaData?: {[key: string]: string | number | boolean | object | undefined | null | Date | any}
 */