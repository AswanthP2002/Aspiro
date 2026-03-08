import { inject, injectable } from 'tsyringe';
import IAdminGetJobTypesUsecase from '../../interfaces/usecases/admin/IAdminGetJobType.usecase';
import IJobTypeRepository from '../../../domain/interfaces/admin/IJobType.repository';
import JobTypeMapper from '../../mappers/admin/JobType.mapperClass';
import JobTypeDTO, { GetJobTypesDTO } from '../../DTOs/admin/jobType.dto';
import JobType from '../../../domain/entities/admin/jobType.entity';

@injectable()
export default class AdminGetJobTypesUsecase implements IAdminGetJobTypesUsecase {
  constructor(
    @inject('IJobTypeRepository') private _repo: IJobTypeRepository,
    @inject('JobTypeMapper') private _mapper: JobTypeMapper
  ) {}

  async execute(
    dto: GetJobTypesDTO
  ): Promise<{ jobTypes: JobTypeDTO[]; totalPages: number } | null> {
    const { search, limit, page } = dto;
    const result = await this._repo.find();
    if (result) {
      const dto: JobTypeDTO[] = [];
      result.forEach((jobType: JobType) => dto.push(this._mapper.EntityToDto(jobType)));
      return { jobTypes: dto, totalPages: 1 };
    }

    return null;
  }
}
