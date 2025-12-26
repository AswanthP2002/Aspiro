import JobApplication from '../../../domain/entities/user/jobApplication.entity';
import CreateJobApplicationDTO from '../../DTOs/candidate -LEGACY/jobApplication.dto.FIX';

export default class JobApplicationMapper {
  public createJobApplicationDtoToJobApplication(dto: CreateJobApplicationDTO): JobApplication {
    return {
      candidateId: dto.candidateId,
      jobId: dto.jobId,
      coverLetterContent: dto.coverLetterContent,
      resumeId: dto.resumeId,
    };
  }
}
