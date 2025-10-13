export default interface CreateJobApplicationDTO {
    candidateId? : string
    jobId? : string
    resumeId? : string
    coverLetterContent : string
}

export interface JobApplicationDTO {
    _id? : string
    candidateId? : string
    jobId? : string
    resumeId? : string
    coverLetterContent : string
    status? : string
    createdAt? : Date
    updatedAt? : Date
}