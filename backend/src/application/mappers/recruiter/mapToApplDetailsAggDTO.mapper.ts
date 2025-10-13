import ApplicationDetailsAggregated from '../../../domain/entities/recruiter/jobApplicationDetailsAggregated.entity';
import ApplicationDetailsAggregatedDTO from '../../DTOs/recruiter/applicationDetailsAgg.dto';

export default function mapToApplicationDetailsAggregatedDTO(
  aggregatedData: ApplicationDetailsAggregated
): ApplicationDetailsAggregatedDTO {
  return {
    _id: aggregatedData._id,
    candidateDetails: aggregatedData.candidateDetails,
    resumeDetails: aggregatedData.resumeDetails,
    candidateId: aggregatedData.candidateId,
    coverLetterContent: aggregatedData.coverLetterContent,
    jobId: aggregatedData.jobId,
    status: aggregatedData.status,
    resumeId: aggregatedData.resumeId,
    createdAt: aggregatedData.createdAt,
    updatedAt: aggregatedData.updatedAt,
    jobDetails: aggregatedData.jobDetails,
    companyDetails: aggregatedData.companyDetails,
  };
}
