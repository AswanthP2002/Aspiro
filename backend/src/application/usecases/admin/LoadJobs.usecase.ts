import Job from '../../../domain/entities/recruiter/job.entity';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import ILoadJobsUseCase from './interfaces/ILoadJobs.usecase';

export default class LoadJobsUseCase implements ILoadJobsUseCase {
  constructor(private _jobRepo: IJobRepo) {}

  async execute(
    search: string,
    page: number,
    limit: number,
    sort: string,
    filter: any
  ): Promise<any> {
    //change strict later
    const result = await this._jobRepo.getJobs(
      search,
      page,
      limit,
      sort,
      filter
    );
    return result;
  }
}
