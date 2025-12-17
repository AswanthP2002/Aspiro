import { JobApplicationStatus } from "../../../domain/entities/user/jobApplication.entity"

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
    status? : JobApplicationStatus
    notes?: string
    createdAt? : Date
    updatedAt? : Date
}