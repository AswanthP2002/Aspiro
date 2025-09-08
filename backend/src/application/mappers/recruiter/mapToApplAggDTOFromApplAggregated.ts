import ApplicationsAggregated from "../../../domain/entities/recruiter/jobApplicationsAggregated";
import ApplicationsAggregatedDTO from "../../DTOs/recruiter/ApplicationAggDTO";

export default function mapToApplicationAggregatedDTOFromAggregated(applicationAggregated : ApplicationsAggregated) : ApplicationsAggregatedDTO {
    return {
        _id:applicationAggregated._id,
        applicantDetails:applicationAggregated.applicantDetails,
        candidateId:applicationAggregated.candidateId,
        coverLetterContent:applicationAggregated.coverLetterContent,
        jobId:applicationAggregated.jobId,
        resume:applicationAggregated.resume,
        status:applicationAggregated.status,
        resumeId:applicationAggregated.resumeId,
        createdAt:applicationAggregated.createdAt,
        updatedAt:applicationAggregated.updatedAt
    }
}