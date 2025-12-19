export interface ConversationParticipants {
    userId?: string;
    joinedAt: string | Date
}
export default interface Conversation {
    _id?: string;
    type: "private" | "group";
    participants:ConversationParticipants[];
    lastMessage:{
        text: string,
        senderId: string,
        sendAt: string | Date
    }
    createdAt: string
    updatedAt: string
}