import { JobApplicationDTO } from '../../../DTOs/job/jobApplication.dto.FIX';
import UpdateJobApplicationStatusDTO from '../../../DTOs/recruiter/UpdateJobApplicationStatus.dto';

export default interface IUpdateJobApplicationStatusUsecase {
  execute(
    updateJobApplicationDto: UpdateJobApplicationStatusDTO
  ): Promise<JobApplicationDTO | null>;
}
