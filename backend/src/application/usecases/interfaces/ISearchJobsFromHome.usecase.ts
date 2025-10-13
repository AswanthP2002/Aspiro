import JobAggregatedDTO from '../../DTOs/jobDetails.dto';

export default interface ISearchJobsFromHomeUseCase {
  execute(search: string): Promise<JobAggregatedDTO[] | null>;
}
