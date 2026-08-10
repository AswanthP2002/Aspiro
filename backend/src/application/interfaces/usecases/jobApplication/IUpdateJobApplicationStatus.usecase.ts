import { JobApplicationDTO } from '../../../DTOs/jobApplication/jobApplication.dto';
import UpdateJobApplicationStatusDTO from '../../../DTOs/jobApplication/UpdateJobApplicationStatus.dto';

export default interface IUpdateJobApplicationStatusUsecase {
  execute(
    updateJobApplicationDto: UpdateJobApplicationStatusDTO
  ): Promise<JobApplicationDTO | null>;
}
