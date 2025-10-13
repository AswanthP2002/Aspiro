import IJobRepo from '../../domain/interfaces/IJobRepo';
import LoadJobDTO, { LoadJobResDTO } from '../DTOs/loadJob.dto';
import mapLoadJobResToDTO from '../mappers/mapLoadJobResToDTO.mapper';
import IGetJobsUseCase from './interfaces/IGetJobs.usecase';

export default class GetJobsUseCase implements IGetJobsUseCase {
  constructor(private _repo: IJobRepo) {}

  async execute(loadJobsDto: LoadJobDTO): Promise<LoadJobResDTO | null> {
    const { search, sort, filters, limit, maxSalary, minSalary, page } =
      loadJobsDto;

    const result = await this._repo.getJobs(
      search,
      page,
      limit,
      sort,
      filters,
      minSalary,
      maxSalary
    );
    if (result) {
      const dto = mapLoadJobResToDTO(result);
      return dto;
    }
    return null;
  }
}
