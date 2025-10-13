export default interface addExperienceRequestDTO {
    candidateId : string
    role : string
    jobtype : string
    organization : string
    startdate : string
    ispresent : boolean
    enddate : string //for checking
    location : string
    locationtype : string
}