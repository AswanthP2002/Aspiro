import { inject, injectable } from 'tsyringe';
import IAdminChangeJobLevelStatusUsecase from '../../interfaces/usecases/jobLevel.admin/IAdminChangeJobLevelStatus.usecase';
import IJobLevelRepository from '../../../domain/interfaces/admin/IJobLevel.repository';
import JobLevelMapper from '../../mappers/jobLevel/JobLevel.mapperClass';
import JobLevelDTO from '../../DTOs/job.level.admin/jobLevel.dto';

@injectable()
export default class AdminChangeJobLevelStatus implements IAdminChangeJobLevelStatusUsecase {
  constructor(
    @inject('IJobLevelRepository') private _repo: IJobLevelRepository,
    @inject('JobLevelMapper') private _mapper: JobLevelMapper
  ) {}

  async execute(id: string, isActive: boolean): Promise<JobLevelDTO | null> {
    if (isActive) {
      const result = await this._repo.update(id, { isActive: true });
      if (result) return this._mapper.EntityToDTO(result);
    } else {
      const result = await this._repo.update(id, { isActive: false });
      if (result) return this._mapper.EntityToDTO(result);
    }

    return null;
  }
}
