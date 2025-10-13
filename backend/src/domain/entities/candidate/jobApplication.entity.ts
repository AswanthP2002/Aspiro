

export default interface JobApplication {
    _id? : string
    candidateId? : string
    jobId? : string
    resumeId? : string
    coverLetterContent : string
    status? : string
    createdAt? : Date
    updatedAt? : Date
}