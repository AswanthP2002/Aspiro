import { Schema } from "mongoose";
import Conversation, { ConversationParticipants } from "../../../../domain/entities/user/conversation.entity";

const ConversationParticipantsSchema = new Schema<ConversationParticipants>({
    userId:{type: Schema.Types.ObjectId, ref:'users', required:true},
    joinedAt:{type: Date}
}, {timestamps:true})

export const ConversationSchema = new Schema<Conversation>({
    type:{type: String, enum:['private', 'group'], default:'private'},
    participants:{type: [ConversationParticipantsSchema]},
    lastMessage:{
        text: {type: String},
        senderId:{type: Schema.Types.ObjectId},
        sendAt:{type: Date}
    }
}, {timestamps: true})

// export interface ConversationParticipants {
//     userId: string;
//     joinedAt: string | Date
// }
// export default interface Conversation {
//     _id?: string;
//     type: "private" | "group";
//     participants:ConversationParticipants[];
//     lastMessage:{
//         text: string,
//         senderId: string,
//         sendAt: string | Date
//     }
//     createdAt: string
//     updatedAt: string
// }