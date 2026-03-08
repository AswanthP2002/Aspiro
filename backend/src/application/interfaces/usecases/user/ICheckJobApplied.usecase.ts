import { JobApplicationDTO } from '../../../DTOs/job/jobApplication.dto.FIX';

export default interface ICheckIsJobApplied {
  execute(jobId: string, candidateId: string): Promise<JobApplicationDTO | null>;
}
