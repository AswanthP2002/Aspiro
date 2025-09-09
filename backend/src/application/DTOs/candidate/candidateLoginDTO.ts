export interface LoginCandidateInpDTO {
    email : string
    password : string
}

export interface LoginCandidateOutDTO {
    // {token, refreshToken, user:{id:candidate._id, email:candidate.email}}
    token : string
    refreshToken : string,
    user:{
        id?:string,
        email:string
    }
}