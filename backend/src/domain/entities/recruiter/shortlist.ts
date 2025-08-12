import mongoose from "mongoose";

export default interface Shortlist {
    jobId? : mongoose.Types.ObjectId
    recruiterId? : mongoose.Types.ObjectId
    applicationIds? : [mongoose.Types.ObjectId]
    createdAt? : Date
}