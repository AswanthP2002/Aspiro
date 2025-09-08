import { Schema } from "mongoose";
import Follow from "../../../domain/entities/Follow";

export const FollowSchema = new Schema<Follow>({
    follower:{type:Schema.Types.ObjectId, required:true},
    following:{type:Schema.Types.ObjectId, required:true},
    type:{type:String, enum:["candidate", "recruiter"]}
}, {_id:false, timestamps:true})


FollowSchema.index({follower:1, followee:1}, {unique:true})