import mongoose from "mongoose"

export default interface Certificates {
    _id? : mongoose.Types.ObjectId
    candidateId? : mongoose.Types.ObjectId
    issuedOrganization : string
    issuedDate : Date
    certificateId? : string
    certificateUrl? : string
    certificatePublicId? : string
}