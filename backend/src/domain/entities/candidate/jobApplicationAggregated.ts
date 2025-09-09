import Job from "../job"
import Recruiter from "../recruiter/recruiter"

export default interface JobApplicationAggregated {
    _id: string
    coverLetterContent: string
    createdAt: Date
    updatedAt: Date
    status: string
    candidateId: string
    jobId: string
    resumeId: string
    jobDetails: Job
    companyDetails: Recruiter
}

