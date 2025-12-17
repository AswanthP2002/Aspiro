import { JobApplicationStatus } from "../../../domain/entities/user/jobApplication.entity"

export default interface UpdateJobApplicationStatusDTO {
    _id: string
    status: JobApplicationStatus
    candidateName: string
    jobTitle: string
    candidateEmail: string
}