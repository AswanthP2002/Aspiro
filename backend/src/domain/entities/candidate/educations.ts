export default interface Education {
    _id? : string
    stream : string
    category : string
    organization : string
    location : string
    start : Date,
    isStudying : boolean
    end? : Date
    createdAt : Date
    updatedAt : Date
}