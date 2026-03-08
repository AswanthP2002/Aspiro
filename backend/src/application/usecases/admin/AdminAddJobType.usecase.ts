import { inject, injectable } from 'tsyringe';
import IAdminAddJobTypeUsecase from '../../interfaces/usecases/admin/IAdminAddJobType.usecase';
import IJobTypeRepository from '../../../domain/interfaces/admin/IJobType.repository';
import JobTypeMapper from '../../mappers/admin/JobType.mapperClass';
import JobTypeDTO, { CreateJobTypeDTO } from '../../DTOs/admin/jobType.dto';

@injectable()
export default class AdminAddJobTypeUsecase implements IAdminAddJobTypeUsecase {
  constructor(
    @inject('IJobTypeRepository') private _repo: IJobTypeRepository,
    @inject('JobTypeMapper') private _mapper: JobTypeMapper
  ) {}

  async execute(dto: CreateJobTypeDTO): Promise<JobTypeDTO | null> {
    const newJobType = this._mapper.DtoToEntity(dto);
    const result = await this._repo.create(newJobType);
    if (result) {
      return this._mapper.EntityToDto(result);
    }

    return null;
  }
}
