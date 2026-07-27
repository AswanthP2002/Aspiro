import JobsForHompePageDTO from '../../DTOs/job/jobsForHomePage.dto';

export default interface ISearchJobsFromHomeUseCase {
  execute(search: string): Promise<JobsForHompePageDTO[] | null>;
}
