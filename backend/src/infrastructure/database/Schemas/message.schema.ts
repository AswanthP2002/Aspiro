import { Schema } from "mongoose";
import Messsage from "../../../domain/entities/Message";

export const MessageSchema = new Schema<Messsage>({
    sender:{type:Schema.Types.ObjectId},
    receiver:{type:Schema.Types.ObjectId},
    message:{type:String},
    read:{type:Boolean}
}, {timestamps:true})