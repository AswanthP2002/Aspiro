import JobApplicationAggregated from '../../../domain/entities/user/jobApplicationAggregated.entity';
import JobApplicationAggregatedDTO from '../../DTOs/candidate -LEGACY/jobApplicationAggregated.dto';

export default function mapTojobApplicationAggregatedDTOFromAggregatedData(
  aggregatedData: JobApplicationAggregated
): JobApplicationAggregatedDTO {
  return {
    _id: aggregatedData._id,
    candidateId: aggregatedData.candidateId,
    recruiterProfile: aggregatedData.recruiterProfile,
    recruiterUserProfile: aggregatedData.recruiterUserProfile,
    coverLetterContent: aggregatedData.coverLetterContent,
    jobDetails: aggregatedData.jobDetails,
    jobId: aggregatedData.jobId,
    resumeId: aggregatedData.resumeId,
    status: aggregatedData.status,
    createdAt: aggregatedData.createdAt,
    updatedAt: aggregatedData.updatedAt,
  };
}
