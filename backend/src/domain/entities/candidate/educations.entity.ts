

export default interface Education {
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