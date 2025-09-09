import Candidate from "../../../domain/entities/candidate/candidates"
import Resume from "../../../domain/entities/candidate/resume"
import Job from "../../../domain/entities/job"
import Recruiter from "../../../domain/entities/recruiter/recruiter"

export default interface ApplicationDetailsAggregatedDTO {
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
    jobDetails:Job
    companyDetails:Recruiter
}