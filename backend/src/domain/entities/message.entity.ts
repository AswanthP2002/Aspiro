export default interface Messsage {
    _id? : string
    sender? : string
    receiver? : string
    message : string,
    read? : boolean
    createdAt? : Date | string
}

