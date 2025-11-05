import { Schema } from 'mongoose';
import Notification from '../../../domain/entities/notification.entity';

export const NotificationSchema = new Schema<Notification>({
  title:{type:String, required:true},
  description:{type:String, required:true},
  senderId:{type:Schema.Types.ObjectId, ref:'users', required:true},
  receiverId:{type:Schema.Types.ObjectId, ref:'users', required:true},
  type:{type:String, enum:['comment', 'follow', 'application', 'like', 'message']},
  isRead:{type:Boolean, default:false},
  link:{type:String},
  typeRelatedId:{type:Schema.Types.ObjectId}
})