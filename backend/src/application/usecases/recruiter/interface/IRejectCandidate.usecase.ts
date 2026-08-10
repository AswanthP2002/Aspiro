import { JobApplicationDTO } from '../../../DTOs/jobApplication/jobApplication.dto';

export default interface IRejectCandidateUseCase {
  execute(applicationId: string): Promise<JobApplicationDTO | null>;
}
