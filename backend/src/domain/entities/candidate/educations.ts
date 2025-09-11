

export default interface Education {
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