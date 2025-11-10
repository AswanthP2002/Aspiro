import { JobApplicationDTO } from '../../../DTOs/candidate -LEGACY/jobApplication.dto';

export default interface IRejectCandidateUseCase {
  execute(applicationId: string): Promise<JobApplicationDTO | null>;
}
