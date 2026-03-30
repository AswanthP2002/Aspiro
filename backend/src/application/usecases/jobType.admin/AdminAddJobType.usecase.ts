import { inject, injectable } from 'tsyringe';
import IAdminAddJobTypeUsecase from '../../interfaces/usecases/jobType.admin/IAdminAddJobType.usecase';
import IJobTypeRepository from '../../../domain/interfaces/admin/IJobType.repository';
import JobTypeMapper from '../../mappers/jobType/JobType.mapperClass';
import JobTypeDTO, { CreateJobTypeDTO } from '../../DTOs/jobType.admin/jobType.dto';
import { ResourceAlreadyExistError } from '../../../domain/errors/AppError';

@injectable()
export default class AdminAddJobTypeUsecase implements IAdminAddJobTypeUsecase {
  constructor(
    @inject('IJobTypeRepository') private _repo: IJobTypeRepository,
    @inject('JobTypeMapper') private _mapper: JobTypeMapper
  ) {}

  async execute(dto: CreateJobTypeDTO): Promise<JobTypeDTO | null> {
    const existing = await this._repo.findJobTypeWithSlugName(dto.name?.toLowerCase() as string);
    if (existing) {
      throw new ResourceAlreadyExistError('Job Type');
    }
    const newJobType = this._mapper.DtoToEntity(dto);
    const result = await this._repo.create(newJobType);
    if (result) {
      return this._mapper.EntityToDto(result);
    }

    return null;
  }
}
