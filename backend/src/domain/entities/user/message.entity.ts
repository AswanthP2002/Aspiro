export interface MessageReadBy {
    userId?: string
    readAt: string | Date
}
export default interface Message {
    _id?: string
    conversationId?: string
    senderId?: string
    content: {
        text?: string,
        attachments?: any[]
    }
    readBy: MessageReadBy[]
    isDeleted: boolean
    createdAt: string | Date
    updatedAt: string | Date
}