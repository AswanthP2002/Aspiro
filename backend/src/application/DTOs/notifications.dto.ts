
export default interface CreateNotificationDTO {
    senderId? : string
    receiverId? : string
    type? : string
    typeRelatedId? : string
    title: string
    description : string
    link? : string
}


export interface NotificationDTO {
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