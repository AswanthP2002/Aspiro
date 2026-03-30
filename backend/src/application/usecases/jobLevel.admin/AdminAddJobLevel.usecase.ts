import { inject, injectable } from 'tsyringe';
import IAdminAddJobLevelUsecase from '../../interfaces/usecases/jobLevel.admin/IAdminAddJobLevel.usecase';
import IJobLevelRepository from '../../../domain/interfaces/admin/IJobLevel.repository';
import JobLevelDTO, { CreateJobLevelDTO } from '../../DTOs/job.level.admin/jobLevel.dto';
import JobLevelMapper from '../../mappers/jobLevel/JobLevel.mapperClass';
import { ResourceAlreadyExistError } from '../../../domain/errors/AppError';

@injectable()
export default class AdminAddJobLevelUsecase implements IAdminAddJobLevelUsecase {
  constructor(
    @inject('IJobLevelRepository') private _repo: IJobLevelRepository,
    @inject('JobLevelMapper') private _mapper: JobLevelMapper
  ) {}

  async execute(dto: CreateJobLevelDTO): Promise<JobLevelDTO | null> {
    const existing = await this._repo.findJobLevelWithSlugName(dto.name.toLowerCase());
    if (existing) {
      throw new ResourceAlreadyExistError('Job Level');
    }
    const newJobLevel = this._mapper.dtoToEntity(dto);
    const result = await this._repo.create(newJobLevel);
    if (result) {
      return this._mapper.EntityToDTO(result);
    }

    return null;
  }
}
