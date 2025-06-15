import mongoose from "mongoose"

export default interface Education {
    _id? : mongoose.Types.ObjectId
    candidateId? : mongoose.Types.ObjectId
    stream : string
    level : string
    organization : string
    location : string
    startYear : string,
    isPresent : boolean
    endYear? : string
    createdAt : Date
    updatedAt : Date
}