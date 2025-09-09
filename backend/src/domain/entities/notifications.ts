
export default interface Notifications {
    _id? : string
    senderId? : string
    receiverId? : string
    type? : string
    typeRelatedId? : string
    title: string
    description : string
    isRead? : boolean
    createdAt? : Date
    link? : string
}