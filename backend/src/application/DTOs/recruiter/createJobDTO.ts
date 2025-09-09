export default interface CreateJobDTO {
    companyId : string
    jobTitle : string
    description : string
    requirements : string
    responsibilities : string
    jobType : string
    duration : string
    requiredSkills : string[]
    optionalSkills : string[]
    locationType : string
    location : string
    minSalary : number
    maxSalary : number
    vacancies : number
    qualification : string
    experience : string
    jobLevel : string
    expiresAt : Date
}

export interface JobDTO {
    _id? : string
    companyId? : string
    jobTitle : string
    description : string
    requirements : string
    responsibilities : string
    duration : string
    requiredSkills : string[]
    optionalSkills : string[]
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
    expiresAt : Date
}