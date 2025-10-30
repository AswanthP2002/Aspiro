import { Schema } from 'mongoose';
import Post from '../../../domain/entities/user/Post';

export const PostSchema = new Schema<Post>({
  description:{type:String},
  media:{
    cloudUrl:{type:String, required:true},
    publicId:{type:String, required:true}
  },
  creatorId:{type:Schema.Types.ObjectId, required:true, ref:'users'},
  likes:{type:[Schema.Types.ObjectId], ref:'users'}
}, {timestamps:true})
