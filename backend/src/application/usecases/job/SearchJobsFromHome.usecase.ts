import { inject, injectable } from 'tsyringe';
// import JobAggregated from '../../domain/entities/jobAggregated.entity';
// import IJobRepo from '../../domain/interfaces/IJobRepo';
// import mapJobAggregatedToJobDetailsDTO from '../../domain/mappers/mapJobAggToJobDetailsDTO';
// import JobAggregatedDTO from '../DTOs/job/jobDetails.dto.FIX';
import ISearchJobsFromHomeUseCase from '../interfaces/ISearchJobsFromHome.usecase';
import JobAggregatedDTO from '../../DTOs/job/jobDetails.dto.FIX';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import JobAggregated from '../../../domain/entities/job/jobAggregated.entity';
// import ISearchJobsFromHomeUseCase from './interfaces/ISearchJobsFromHome.usecase';

@injectable()
export default class SearchJobsFromHomeUseCase implements ISearchJobsFromHomeUseCase {
  constructor(@inject('IJobRepository') private _iJobRepo: IJobRepo) {}

  async execute(search: string): Promise<JobAggregatedDTO[] | null> {
    const result = await this._iJobRepo.searchJobsFromHome(search);
    if (result) {
      const dto: JobAggregatedDTO[] = [];
      result.forEach((data: JobAggregated) => {
        dto.push(data as JobAggregatedDTO);
      });
      return dto;
    }
    return null;
  }
}
