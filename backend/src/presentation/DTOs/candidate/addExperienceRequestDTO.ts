export default interface addExperienceRequestDTO {
    userId : string
    jobRole : string
    jobType : string
    organization : string
    startDate : string
    isPresent : boolean
    endDate? : string //for checking
    location : string
    workMode : string
}