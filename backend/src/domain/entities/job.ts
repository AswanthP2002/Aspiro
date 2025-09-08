import { ObjectId } from "mongodb"

export default interface Job {
    _id? : string
    companyId? : string
    jobTitle : string
    description : string
    requirements : string
    responsibilities : string
    duration : string
    jobType : string
    locationType : string
    location : string
    minSalary : number
    maxSalary : number
    vacancies : number
    qualification : string
    experience : string
    jobLevel : string
    requiredSkills : string[]
    optionalSkills : string[]
    isBlocked? : boolean
    isRejected? : boolean,
    createdAt? : Date
    updatedAt? : Date
    expiresAt : Date
}