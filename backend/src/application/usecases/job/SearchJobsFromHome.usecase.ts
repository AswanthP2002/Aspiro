import { inject, injectable } from 'tsyringe';
import ISearchJobsFromHomeUseCase from '../interfaces/ISearchJobsFromHome.usecase';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import JobAggregated from '../../../domain/entities/job/jobAggregated.entity';
import JobMapper from '../../mappers/job/Job.mapperClass';
import JobsForHompePageDTO from '../../DTOs/job/jobsForHomePage.dto';

@injectable()
export default class SearchJobsFromHomeUseCase implements ISearchJobsFromHomeUseCase {
  constructor(
    @inject('IJobRepository') private _iJobRepo: IJobRepo,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(search: string): Promise<JobsForHompePageDTO[] | null> {
    const result = await this._iJobRepo.searchJobsFromHome(search);
    if (result) {
      const dto: JobsForHompePageDTO[] = [];
      result.forEach((data: JobAggregated) => {
        dto.push(this._mapper.jobAggregatedToJobsHomePageSearchDTO(data));
      });
      return dto;
    }
    return null;
  }
}
