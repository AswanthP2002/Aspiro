import { inject, injectable } from 'tsyringe';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import { AdminJobDetailsDTO } from '../../DTOs/job/jobDetails.dto.FIX';
import JobMapper from '../../mappers/job/Job.mapperClass';
import IAdminLoadJobDetailsUseCase from '../admin/interfaces/ILoadJobDetails.usecase';

@injectable()
export class AdminLoadJobDetailsUseCase implements IAdminLoadJobDetailsUseCase {
  constructor(
    @inject('IJobRepository') private _repo: IJobRepo,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(id: string): Promise<AdminJobDetailsDTO | null> {
    const reuslt = await this._repo.getJobDetailsForAdmin(id);
    if (reuslt) {
      return this._mapper.jobAggragatedToAdminJobDetailsDTO(reuslt);
    }

    return null;
  }
}
