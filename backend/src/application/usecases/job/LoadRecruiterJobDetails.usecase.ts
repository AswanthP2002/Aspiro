import { inject, injectable } from 'tsyringe';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import JobMapper from '../../mappers/job/Job.mapperClass';
import ILoadRecruiterJobDetailsUsecase from '../../interfaces/usecases/job/ILoadRecruiterJobDetails.usecase';
import RecruiterJobDetailsDTO from '../../../domain/entities/job/recruiterJobDetails.dto';

@injectable()
export default class LoadRecruiterJobDetailsUsecase implements ILoadRecruiterJobDetailsUsecase {
  constructor(
    @inject('IJobRepository') private _repo: IJobRepo,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(jobId: string): Promise<RecruiterJobDetailsDTO | null> {
    const result = await this._repo.getJobDetails(jobId);
    if (result) {
      return this._mapper.jobAggregatedToRecruiterJobDetailsDTO(result);
    }

    return null;
  }
}
