import mongoose from "mongoose"


export default interface Experience {
    _id? : string
    candidateId? : string
    role : string
    jobtype : string
    organization : string
    startdate : Date
    ispresent : boolean
    enddate? : any //for checking
    location : string
    locationtype : string
}