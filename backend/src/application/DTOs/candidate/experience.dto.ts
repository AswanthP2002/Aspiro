export default interface CreateExperienceDTO {
    candidateId? : string
    role : string
    jobtype : string
    organization : string
    startdate : string
    ispresent : boolean
    enddate : string//for checking
    location : string
    locationtype : string
}

export interface ExperienceDTO {
    _id? : string
    candidateId? : string
    role : string
    jobtype : string
    organization : string
    startdate : string
    ispresent : boolean
    enddate : string //for checking
    location : string
    locationtype : string
    createdAt? : string
    updatedAt? : string
}

export interface EditExperienceDTO {
    experienceId : string
    role : string
    jobtype : string
    organization : string
    startdate : string
    ispresent : boolean
    enddate : string //for checking
    location : string
    locationtype : string
}