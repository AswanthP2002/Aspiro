import Candidate from "../candidate/candidates"
import Resume from "../candidate/resume"
import Job from "../job"
import Recruiter from "./recruiter"

export default interface ApplicationDetailsAggregated {
    _id: string
    candidateId: string
    jobId: string
    coverLetterContent: string
    resumeId: string
    status: string
    createdAt: Date
    updatedAt: Date
    candidateDetails: Candidate
    resumeDetails: Resume
    jobDetails : Job
    companyDetails : Recruiter
}