import mongoose from "mongoose";

export default interface FavoriteJobs {
    _id? : string
    candidateId? : string
    jobId? : string
    createdAt? : Date

}