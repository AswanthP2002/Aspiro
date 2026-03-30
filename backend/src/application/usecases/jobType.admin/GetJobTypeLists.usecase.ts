import { inject, injectable } from 'tsyringe';
import IGetJobTypeListUsecase from '../../interfaces/usecases/jobType.admin/IGetJobTypeLists.usecase';
import IJobTypeRepository from '../../../domain/interfaces/admin/IJobType.repository';
import JobTypeMapper from '../../mappers/jobType/JobType.mapperClass';
import JobTypeDTO from '../../DTOs/jobType.admin/jobType.dto';
import JobType from '../../../domain/entities/jobType/jobType.entity';

@injectable()
export default class GetJobTypeListsUsecase implements IGetJobTypeListUsecase {
  constructor(
    @inject('IJobTypeRepository') private _repo: IJobTypeRepository,
    @inject('JobTypeMapper') private _mapper: JobTypeMapper
  ) {}

  async execute(): Promise<JobTypeDTO[] | null> {
    const result = await this._repo.find();
    if (result) {
      const dto: JobTypeDTO[] = [];
      result.forEach((jobType: JobType) => dto.push(this._mapper.EntityToDto(jobType)));
      return dto;
    }

    return null;
  }
}
