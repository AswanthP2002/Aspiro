import IJobRepo from '../../../domain/interfaces/IJobRepo';
import LoadJobDTO, { LoadJobResDTO } from '../../DTOs/loadJob.dto';
import ILoadJobCandidateSideUseCase from '../../interfaces/usecases/user/IloadJobsAggregated.usecase';

export default class LoadJobsCandidateSideUseCase
  implements ILoadJobCandidateSideUseCase
{
  constructor(private _jobRepo: IJobRepo) {}

  async execute(loadJobDto: LoadJobDTO): Promise<LoadJobResDTO | null> {
    //search : string = "", page : number = 1, limit : number = 1, sort : string = 'job-latest', filters : any, minSalary : string, maxSalary : string
    const { search, page, limit, sort, filters, minSalary, maxSalary } =
      loadJobDto;
    const result = await this._jobRepo.getJobs(
      search,
      page,
      limit,
      sort,
      filters,
      minSalary,
      maxSalary
    );
    return result;
  }
}
