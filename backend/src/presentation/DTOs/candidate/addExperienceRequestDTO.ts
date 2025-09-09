export default interface addExperienceRequestDTO {
    candidateId : string
    role : string
    jobtype : string
    organization : string
    startdate : Date
    ispresent : boolean
    enddate? : any //for checking
    location : string
    locationtype : string
}