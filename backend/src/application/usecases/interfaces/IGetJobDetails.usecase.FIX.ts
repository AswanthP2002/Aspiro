import JobAggregatedDTO from '../../DTOs/job/jobDetails.dto.FIX';

export default interface IGetJobDetailsUseCase {
  execute(jobId: string): Promise<JobAggregatedDTO | null>;
}
