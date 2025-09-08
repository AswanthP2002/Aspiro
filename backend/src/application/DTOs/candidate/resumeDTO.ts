
export default interface CreateResumeDTO {
    candidateId? : string
    file : any
    path : string
}


export interface ResumeDTO {
    _id? : string
    candidateId? : string
    resumeFileName? : string
    resumeUrlCoudinary : string
    resumePublicIdCloudinary : string
    createdAt? : Date
}