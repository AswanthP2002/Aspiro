import mongoose from "mongoose"


export default interface Experience {
    _id? : mongoose.Types.ObjectId
    candidateId? : mongoose.Types.ObjectId
    role : string
    jobtype : string
    organization : string
    startdate : Date
    ispresent : boolean
    enddate? : any //for checking
    location : string
    locationtype : string
    createdAt : Date
    updatedAt : Date
}