import mongoose from "mongoose";

export default interface FavoriteJobs {
    candidateId : mongoose.Types.ObjectId
    jobId : mongoose.Types.ObjectId
    createdAt? : Date

}