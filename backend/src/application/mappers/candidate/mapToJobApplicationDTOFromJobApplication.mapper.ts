import JobApplication from '../../../domain/entities/candidate/jobApplication.entity';
import { JobApplicationDTO } from '../../DTOs/candidate/jobApplication.dto';

export default function mapToJobApplicationDTOFromJobApplication(
  jobApplication: JobApplication
): JobApplicationDTO {
  return {
    coverLetterContent: jobApplication.coverLetterContent,
    _id: jobApplication._id,
    candidateId: jobApplication.candidateId,
    createdAt: jobApplication.createdAt,
    updatedAt: jobApplication.updatedAt,
    jobId: jobApplication.jobId,
    resumeId: jobApplication.resumeId,
    status: jobApplication.status,
  };
}
