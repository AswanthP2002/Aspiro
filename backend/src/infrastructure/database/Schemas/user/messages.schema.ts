/**
 * export interface MessageReadBy {
    userId: string
    readAt: string | Date
}
export default interface Message {
    _id?: string
    conversationId: string
    senderId: string
    content: {
        text?: string,
        attachments?: any[]
    }
    readBy: MessageReadBy[]
    isDeleted: boolean
    createdAt: string | Date
    updatedAt: string | Date
}
 */

import { Schema } from "mongoose";
import Message, { MessageReadBy } from "../../../../domain/entities/user/message.entity";

const MessageReadBySchema = new Schema<MessageReadBy>({
    userId: {type: Schema.Types.ObjectId, ref:'users', required:true},
    readAt: {type: Date}
}, {timestamps:true})

export const MessageSchema = new Schema<Message>({
    conversationId:{type: Schema.Types.ObjectId, ref:'conversations', required: true},
    senderId:{type: Schema.Types.ObjectId, ref:'users', required:true},
    content:{
        text:{type: String},
        attachments:{type: []}
    },
    readBy:{type:[MessageReadBySchema]},
    isDeleted:{type: Boolean, default: false}
}, {timestamps: true})