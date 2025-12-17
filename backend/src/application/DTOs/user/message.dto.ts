export interface CreateMessageDTO {
    sender : string
    receiver : string
    message : string
}

export interface MessageDTO {
    _id? : string
    sender? : string
    receiver? : string
    message : string
    read? : boolean
    createdAt? : Date | string
}