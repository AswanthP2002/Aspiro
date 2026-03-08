import { inject, injectable } from 'tsyringe';
import IAdminGetJobLevelsUsecase from '../../interfaces/usecases/admin/IAdminGetJobLevel.usecase';
import IJobLevelRepository from '../../../domain/interfaces/admin/IJobLevel.repository';
import JobLevelMapper from '../../mappers/admin/JobLevel.mapperClass';
import JobLevelDTO, { GetJobLevelsDTO, PaginatedJobLevel } from '../../DTOs/admin/jobLevel.dto';
import JobLevel from '../../../domain/entities/admin/jobLevel.entity';

@injectable()
export default class AdminGetJobLevelsUsecase implements IAdminGetJobLevelsUsecase {
  constructor(
    @inject('IJobLevelRepository') private _repo: IJobLevelRepository,
    @inject('JobLevelMapper') private _mapper: JobLevelMapper
  ) {}

  async execute(dto: GetJobLevelsDTO): Promise<PaginatedJobLevel | null> {
    const { search, limit, page } = dto;

    const result = await this._repo.getAggregatedJobLevel(search, limit, page);
    if (result) {
      const dto: JobLevelDTO[] = [];
      result.jobLevels.forEach((jobLevel: JobLevel) =>
        dto.push(this._mapper.EntityToDTO(jobLevel))
      );
      return { jobLevels: dto, totalPages: result.totalPages };
    }
    return null;
  }
}
