import mongoose from "mongoose"

export default interface AddEducationRequestDTO {
    candidateId : string
    stream : string //particular group of education
    level : string
    organization : string
    location : string
    startYear : Date,
    isPresent : boolean
    endYear? : any
}