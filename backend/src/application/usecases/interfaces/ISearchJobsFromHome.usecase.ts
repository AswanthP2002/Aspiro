import JobAggregatedDTO from '../../DTOs/job/jobDetails.dto.FIX';

export default interface ISearchJobsFromHomeUseCase {
  execute(search: string): Promise<JobAggregatedDTO[] | null>;
}
