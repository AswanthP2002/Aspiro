import IJobRepo from '../../domain/interfaces/IJobRepo';
import LoadJobDTO, { LoadJobResDTO } from '../DTOs/job/loadJob.dto.FIX';
import mapLoadJobResToDTO from '../mappers/mapLoadJobResToDTO.mapper';
import IGetJobsUseCase from './interfaces/IGetJobs.usecase';

export default class GetJobsUseCase implements IGetJobsUseCase {
  constructor(private _repo: IJobRepo) {}

  async execute(loadJobsDto: LoadJobDTO): Promise<LoadJobResDTO | null> {
    const { search, sort, filters, limit, maxSalary, minSalary, page } =
      loadJobsDto;

    /**
     * legacy need to remove
     */
    return null;
  }
}
