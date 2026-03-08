import { inject, injectable } from 'tsyringe';
import IAdminChangeJobTypeStatusUsecase from '../../interfaces/usecases/admin/IAdminChangeJobTypeStatus.usecase';
import IJobTypeRepository from '../../../domain/interfaces/admin/IJobType.repository';
import JobTypeMapper from '../../mappers/admin/JobType.mapperClass';
import JobTypeDTO, { ChangeJobTypeStatusDTO } from '../../DTOs/admin/jobType.dto';

@injectable()
export default class AdminChangeJobTypeStatusUsecase implements IAdminChangeJobTypeStatusUsecase {
  constructor(
    @inject('IJobTypeRepository') private _repo: IJobTypeRepository,
    @inject('JobTypeMapper') private _mapper: JobTypeMapper
  ) {}

  async execute(dto: ChangeJobTypeStatusDTO): Promise<JobTypeDTO | null> {
    const { id, isActive } = dto;
    if (isActive) {
      const result = await this._repo.update(id, { isActive: true });
      return result ? this._mapper.EntityToDto(result) : null;
    } else {
      const result = await this._repo.update(id, { isActive: false });
      return result ? this._mapper.EntityToDto(result) : null;
    }
  }
}
