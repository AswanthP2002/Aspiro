export interface EducationDTO {
    _id? : string
    candidateId? : string
    stream : string //particular group of education
    level : string
    organization : string
    location : string
    startYear : string,
    isPresent : boolean
    endYear? : string
    createdAt? : string
    updatedAt? : string
}

export interface CreateEducationDTO {
    candidateId? : string
    stream : string //particular group of education
    level : string
    organization : string
    location : string
    startYear : string,
    isPresent : boolean
    endYear? : string
}

export interface UpdateEducationDTO {
    _id : string
    stream : string //particular group of education
    level : string
    organization : string
    location : string
    startYear : string,
    isPresent : boolean
    endYear? : string
}