import { JobApplicationDTO } from '../../../DTOs/job/jobApplication.dto.FIX';

export default interface IRejectCandidateUseCase {
  execute(applicationId: string): Promise<JobApplicationDTO | null>;
}
