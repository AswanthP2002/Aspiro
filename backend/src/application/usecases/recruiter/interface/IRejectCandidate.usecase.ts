import { JobApplicationDTO } from '../../../DTOs/jobApplication/jobApplication.dto.FIX';

export default interface IRejectCandidateUseCase {
  execute(applicationId: string): Promise<JobApplicationDTO | null>;
}
