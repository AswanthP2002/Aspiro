import mongoose from "mongoose";

export default interface Resume {
    _id? : mongoose.Types.ObjectId
    candidateId? : mongoose.Types.ObjectId
    resumeFileName? : string
    resumeUrlCoudinary : string
    resumePublicIdCloudinary : string
    createdAt : Date
}