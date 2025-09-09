export default interface CreateJobRequestDTO {
    companyId : string
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
    expiresAt : Date
    duration : string
    requiredSkills : string[]
    optionalSkills : string[]
}