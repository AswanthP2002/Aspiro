import { inject, injectable } from 'tsyringe';
import IAdminAddJobLevelUsecase from '../../interfaces/usecases/admin/IAdminAddJobLevel.usecase';
import IJobLevelRepository from '../../../domain/interfaces/admin/IJobLevel.repository';
import JobLevelDTO, { CreateJobLevelDTO } from '../../DTOs/admin/jobLevel.dto';
import JobLevelMapper from '../../mappers/admin/JobLevel.mapperClass';

@injectable()
export default class AdminAddJobLevelUsecase implements IAdminAddJobLevelUsecase {
  constructor(
    @inject('IJobLevelRepository') private _repo: IJobLevelRepository,
    @inject('JobLevelMapper') private _mapper: JobLevelMapper
  ) {}

  async execute(dto: CreateJobLevelDTO): Promise<JobLevelDTO | null> {
    const newJobLevel = this._mapper.dtoToEntity(dto);
    const result = await this._repo.create(newJobLevel);
    if (result) {
      return this._mapper.EntityToDTO(result);
    }

    return null;
  }
}
