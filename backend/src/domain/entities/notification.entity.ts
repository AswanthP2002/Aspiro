
export default interface Notification {
    _id? : string
    senderId? : string
    receiverId? : string
    type? : 'follow' | 'application' | 'comment' | 'like' | 'message'
    typeRelatedId? : string
    title: string
    description : string
    isRead? : boolean
    createdAt? : Date
    link? : string
}