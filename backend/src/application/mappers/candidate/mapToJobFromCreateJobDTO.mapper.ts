import JobApplication from '../../../domain/entities/candidate/jobApplication.entity';
import CreateJobApplicationDTO from '../../DTOs/candidate/jobApplication.dto';
import CreateJobDTO from '../../DTOs/recruiter/createJob.dto';

export default function mapToJobApplicationFromCreateJobDTO(
  createJobApplicationDto: CreateJobApplicationDTO
): JobApplication {
  return {
    coverLetterContent: createJobApplicationDto.coverLetterContent,
    candidateId: createJobApplicationDto.candidateId,
    jobId: createJobApplicationDto.jobId,
    resumeId: createJobApplicationDto.resumeId,
  };
}
