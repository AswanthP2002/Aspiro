export default interface CreateExperienceDTO {
    userId? : string
    jobRole : string
    jobType : string
    organization : string
    startDate? : string
    isPresent : boolean
    endDate? : string//for checking
    location : string
    workMode : string
}

export interface ExperienceDTO {
    _id? : string
    userId? : string
    jobRole : string
    jobType : string
    organization : string
    startDate? : string
    isPresent : boolean
    endDate? : string //for checking
    location : string
    workMode : string
    createdAt? : string
    updatedAt? : string
}

export interface EditExperienceDTO {
    experienceId : string
    jobRole : string
    jobType : string
    organization : string
    startDate : string
    isPresent : boolean
    endDate? : string //for checking
    location : string
    workMode : string
}