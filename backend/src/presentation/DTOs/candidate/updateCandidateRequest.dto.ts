export default interface UpdateCandidateRequestDTO{
    _id : string
    role : string
    about : string
    location : {
        city : string,
        state : string,
        district : string,
        country : string,
        pincode : string
    }
}