import mongoose from "mongoose";

export default interface JobApplication {
    _id? : mongoose.Types.ObjectId
    candidateId? : mongoose.Types.ObjectId
    jobId? : mongoose.Types.ObjectId
    resumeId? : mongoose.Types.ObjectId
    coverLetterContent : string
    status? : string
    createdAt? : Date
    updatedAt? : Date
}