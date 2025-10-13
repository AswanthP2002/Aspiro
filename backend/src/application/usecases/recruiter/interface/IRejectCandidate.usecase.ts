import { JobApplicationDTO } from '../../../DTOs/candidate/jobApplication.dto';

export default interface IRejectCandidateUseCase {
  execute(applicationId: string): Promise<JobApplicationDTO | null>;
}
