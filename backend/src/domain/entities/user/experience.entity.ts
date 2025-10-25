
export default interface Experience {
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

