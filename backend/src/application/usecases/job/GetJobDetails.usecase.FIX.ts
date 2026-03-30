import { inject, injectable } from 'tsyringe';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import IGetJobDetailsUseCase from '../interfaces/IGetJobDetails.usecase.FIX';
import JobMapper from '../../mappers/job/Job.mapperClass';
import { LoadJobDetailsDTOForPublic } from '../../DTOs/job/loadJob.dto.FIX';

@injectable()
export default class GetJobDetailsUseCase implements IGetJobDetailsUseCase {
  constructor(
    @inject('IJobRepository') private _repo: IJobRepo,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(jobId: string): Promise<LoadJobDetailsDTOForPublic | null> {
    const result = await this._repo.getJobDetails(jobId);
    console.log('-- Checking company profile details from job details --', result);
    if (result) {
      const dto = this._mapper.jobAggregatedToJobDetailsForPublicDTO(result);
      return dto;
    }

    return null;
  }
}
