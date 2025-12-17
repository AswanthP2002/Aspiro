export interface EducationDTO {
    _id? : string
    userId? : string
    educationStream : string //particular group of education
    educationLevel : string
    institution : string
    location : string
    startYear? : string,
    isPresent : boolean
    endYear? : string
    createdAt? : string
    updatedAt? : string
}

export interface CreateEducationDTO {
    userId? : string
    educationStream : string //particular group of education
    educationLevel : string
    institution : string
    location : string
    startYear? : string,
    isPresent : boolean
    endYear? : string
}

export interface UpdateEducationDTO {
    _id : string
    educationStream : string //particular group of education
    educationLevel : string
    institution : string
    location : string
    startYear? : string,
    isPresent : boolean
    endYear? : string
}