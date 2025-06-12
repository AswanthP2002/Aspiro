import mongoose, { ObjectId } from "mongoose"
const {ObjectId} = mongoose.Types

export default interface Skills {
    _id? : mongoose.Types.ObjectId
    type : string
    skill : string
    level : string
    candidateID? : mongoose.Types.ObjectId
}