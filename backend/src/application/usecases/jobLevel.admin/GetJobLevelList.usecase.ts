import { inject, injectable } from 'tsyringe';
import IGetJobLevelListsUsecase from '../../interfaces/usecases/jobLevel.admin/IGetJobLevelLists.usecase';
import IJobLevelRepository from '../../../domain/interfaces/admin/IJobLevel.repository';
import JobLevelMapper from '../../mappers/jobLevel/JobLevel.mapperClass';
import JobLevelDTO from '../../DTOs/job.level.admin/jobLevel.dto';
import JobLevel from '../../../domain/entities/jobLevel/jobLevel.entity';

@injectable()
export default class GetJobLevelListsUsecase implements IGetJobLevelListsUsecase {
  constructor(
    @inject('IJobLevelRepository') private _repo: IJobLevelRepository,
    @inject('JobLevelMapper') private _mapper: JobLevelMapper
  ) {}

  async execute(): Promise<JobLevelDTO[] | null> {
    const result = await this._repo.find();
    if (result) {
      const dto: JobLevelDTO[] = [];
      result.forEach((jobLevel: JobLevel) => dto.push(this._mapper.EntityToDTO(jobLevel)));
      return dto;
    }
    return null;
  }
}
