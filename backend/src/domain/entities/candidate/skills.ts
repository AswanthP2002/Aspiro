import mongoose, { ObjectId } from "mongoose"

export default interface Skills {
    _id? : string
    type : string
    skill : string
    level : string
    candidateId? : string
}