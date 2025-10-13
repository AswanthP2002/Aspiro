import ApplicationsAggregated from '../../../domain/entities/recruiter/jobApplicationsAggregated.entity';
import ApplicationsAggregatedDTO from '../../DTOs/recruiter/applicationAgg.dto';

export default function mapToApplicationAggregatedDTOFromAggregated(
  applicationAggregated: ApplicationsAggregated
): ApplicationsAggregatedDTO {
  return {
    _id: applicationAggregated._id,
    applicantDetails: applicationAggregated.applicantDetails,
    candidateId: applicationAggregated.candidateId,
    coverLetterContent: applicationAggregated.coverLetterContent,
    jobId: applicationAggregated.jobId,
    resume: applicationAggregated.resume,
    status: applicationAggregated.status,
    resumeId: applicationAggregated.resumeId,
    createdAt: applicationAggregated.createdAt,
    updatedAt: applicationAggregated.updatedAt,
  };
}
