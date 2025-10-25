import mongoose from "mongoose"

export default interface AddEducationRequestDTO {
    userId : string
    educationStream : string //particular group of education
    educationLevel : string
    institution : string
    location : string
    startYear : string,
    isPresent : boolean
    endYear? : string
}