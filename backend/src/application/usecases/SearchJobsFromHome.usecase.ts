import JobAggregated from '../../domain/entities/jobAggregated.entity';
import IJobRepo from '../../domain/interfaces/IJobRepo';
import mapJobAggregatedToJobDetailsDTO from '../../domain/mappers/mapJobAggToJobDetailsDTO';
import JobAggregatedDTO from '../DTOs/jobDetails.dto';
import ISearchJobsFromHomeUseCase from './interfaces/ISearchJobsFromHome.usecase';

export default class SearchJobsFromHomeUseCase
  implements ISearchJobsFromHomeUseCase
{
  constructor(private _iJobRepo: IJobRepo) {}

  async execute(search: string): Promise<JobAggregatedDTO[] | null> {
    const result = await this._iJobRepo.searchJobsFromHome(search);
    if (result) {
      const dto: JobAggregatedDTO[] = [];
      result.forEach((data: JobAggregated) => {
        dto.push(mapJobAggregatedToJobDetailsDTO(data));
      });
      return dto;
    }
    return null;
  }
}
