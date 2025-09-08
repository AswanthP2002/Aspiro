import JobApplicationAggregated from "../../../domain/entities/candidate/jobApplicationAggregated";
import JobApplicationAggregatedDTO from "../../DTOs/candidate/jobApplicationAggregatedDTO";

export default function mapTojobApplicationAggregatedDTOFromAggregatedData(aggregatedData : JobApplicationAggregated) : JobApplicationAggregatedDTO {
    return {
        _id:aggregatedData._id,
        candidateId:aggregatedData.candidateId,
        companyDetails:aggregatedData.companyDetails,
        coverLetterContent:aggregatedData.coverLetterContent,
        jobDetails:aggregatedData.jobDetails,
        jobId:aggregatedData.jobId,
        resumeId:aggregatedData.resumeId,
        status:aggregatedData.status,
        createdAt:aggregatedData.createdAt,
        updatedAt:aggregatedData.updatedAt
    }
}