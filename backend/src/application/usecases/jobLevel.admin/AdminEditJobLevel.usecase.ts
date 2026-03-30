import { inject, injectable } from 'tsyringe';
import IAdminEditJobLevelUsecase from '../../interfaces/usecases/jobLevel.admin/IAdminEditJobLevel.usecase';
import IJobLevelRepository from '../../../domain/interfaces/admin/IJobLevel.repository';
import JobLevelMapper from '../../mappers/jobLevel/JobLevel.mapperClass';
import JobLevelDTO, { UpdateJobLevelDTO } from '../../DTOs/job.level.admin/jobLevel.dto';

@injectable()
export default class AdminEditJobLevelUsecase implements IAdminEditJobLevelUsecase {
  constructor(
    @inject('IJobLevelRepository') private _repo: IJobLevelRepository,
    @inject('JobLevelMapper') private _mapper: JobLevelMapper
  ) {}

  async execute(dto: UpdateJobLevelDTO): Promise<JobLevelDTO | null> {
    const { id, name } = dto;
    const result = await this._repo.update(id, { name, slug: name.toLowerCase() });
    if (result) {
      return this._mapper.EntityToDTO(result);
    }

    return null;
  }
}
