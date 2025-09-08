export default interface CreateExperienceDTO {
    candidateId : string
    role : string
    jobtype : string
    organization : string
    startdate : Date
    ispresent : boolean
    enddate : any //for checking
    location : string
    locationtype : string
}

export interface ExperienceDTO {
    _id? : string
    candidateId : string
    role : string
    jobtype : string
    organization : string
    startdate : Date
    ispresent : boolean
    enddate? : any //for checking
    location : string
    locationtype : string
    createdAt? : Date
    updatedAt? : Date
}

export interface EditExperienceDTO {
    role : string
    jobtype : string
    organization : string
    startdate : Date
    ispresent : boolean
    enddate : any //for checking
    location : string
    locationtype : string
}