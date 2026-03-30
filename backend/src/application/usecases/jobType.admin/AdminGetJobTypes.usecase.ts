import { inject, injectable } from 'tsyringe';
import IAdminGetJobTypesUsecase from '../../interfaces/usecases/jobType.admin/IAdminGetJobType.usecase';
import IJobTypeRepository from '../../../domain/interfaces/admin/IJobType.repository';
import JobTypeMapper from '../../mappers/jobType/JobType.mapperClass';
import JobTypeDTO, { GetJobTypesDTO } from '../../DTOs/jobType.admin/jobType.dto';
import JobType from '../../../domain/entities/jobType/jobType.entity';

@injectable()
export default class AdminGetJobTypesUsecase implements IAdminGetJobTypesUsecase {
  constructor(
    @inject('IJobTypeRepository') private _repo: IJobTypeRepository,
    @inject('JobTypeMapper') private _mapper: JobTypeMapper
  ) {}

  async execute(
    dto: GetJobTypesDTO
  ): Promise<{ jobTypes: JobTypeDTO[]; totalPages: number } | null> {
    const { limit, page } = dto;
    const result = await this._repo.getPaginatedJobTypes(limit, page);
    if (result) {
      const dto: JobTypeDTO[] = [];
      result.jobTypes.forEach((jobType: JobType) => dto.push(this._mapper.EntityToDto(jobType)));
      return { jobTypes: dto, totalPages: 1 };
    }

    return null;
  }
}
