import { JobApplicationDTO } from '../../../DTOs/jobApplication/jobApplication.dto';

export default interface ICheckIsJobApplied {
  execute(jobId: string, candidateId: string): Promise<JobApplicationDTO | null>;
}
