import mongoose from "mongoose"

export default interface AddEducationRequestDTO {
    userId : string
    educationStream : string 
    educationLevel : string
    institution : string
    location : string
    startYear : string,
    isPresent : boolean
    endYear? : string
}