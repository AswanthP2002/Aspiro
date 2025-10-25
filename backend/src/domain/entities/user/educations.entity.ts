

export default interface Education {
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