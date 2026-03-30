import { inject, injectable } from 'tsyringe';
import IAdminUpdateJobTypeUse from '../../interfaces/usecases/jobType.admin/IAdminUpdateJobType.usecase';
import IJobTypeRepository from '../../../domain/interfaces/admin/IJobType.repository';
import JobTypeMapper from '../../mappers/jobType/JobType.mapperClass';
import JobTypeDTO, { UpdateJobTypeDTO } from '../../DTOs/jobType.admin/jobType.dto';

@injectable()
export default class AdminUpdateJobTypeUsecase implements IAdminUpdateJobTypeUse {
  constructor(
    @inject('IJobTypeRepository') private _repo: IJobTypeRepository,
    @inject('JobTypeMapper') private _mapper: JobTypeMapper
  ) {}

  async execute(dto: UpdateJobTypeDTO): Promise<JobTypeDTO | null> {
    const { id, name } = dto;
    const result = await this._repo.update(id, { name, slug: name.toLowerCase() });
    if (result) {
      return this._mapper.EntityToDto(result);
    }
    return null;
  }
}
