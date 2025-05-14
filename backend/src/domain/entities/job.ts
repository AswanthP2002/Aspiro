import { ObjectId } from "mongodb"

export default interface Job {
    _id? : ObjectId
    companyId? : ObjectId
    jobTitle : string
    description : string
    requirements : string
    responsibilities : string
    jobType : string
    locationType : string
    location : string
    minSalary : number
    maxSalary : number
    vacancies : number
    qualification : string
    experience : string
    jobLevel : string
    isBlocked? : boolean
    isRejected? : boolean,
    createdAt? : Date
    updatedAt? : Date
    expiresAt? : Date
}