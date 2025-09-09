export interface EducationDTO {
    _id? : string
    candidateId? : string
    stream : string //particular group of education
    level : string
    organization : string
    location : string
    startYear : Date,
    isPresent : boolean
    endYear? : any
    createdAt? : Date
    updatedAt? : Date
}

export interface CreateEducationDTO {
    candidateId? : string
    stream : string //particular group of education
    level : string
    organization : string
    location : string
    startYear : Date,
    isPresent : boolean
    endYear? : any
}

export interface UpdateEducationDTO {
    _id : string
    stream : string //particular group of education
    level : string
    organization : string
    location : string
    startYear : Date,
    isPresent : boolean
    endYear? : any
}