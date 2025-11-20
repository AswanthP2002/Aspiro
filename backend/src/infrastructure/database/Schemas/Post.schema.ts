import { Schema } from 'mongoose';
import Post from '../../../domain/entities/user/Post';

export const PostSchema = new Schema<Post>({
  description:{type:String},
  media:{
    cloudUrl:{type:String},
    publicId:{type:String}
  },
  userId:{type:Schema.Types.ObjectId, required:true, ref:'users'},
  likes:{type:[Schema.Types.ObjectId], ref:'users'},
  shares:{type:[Schema.Types.ObjectId], ref:'users'},
  views:{type:[Schema.Types.ObjectId], ref:'users'}
}, {timestamps:true})
