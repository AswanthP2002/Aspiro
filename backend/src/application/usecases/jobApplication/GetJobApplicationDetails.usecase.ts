import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import IGetJobApplicationDetailsUseCase from '../../interfaces/usecases/jobApplication/IGetJobApplicationDetails.usecase';
import { inject, injectable } from 'tsyringe';
import { SingleApplicationDetailsForRecruiterDTO } from '../../DTOs/jobApplication/JobApplicationsListForRecruiter.dto';
import JobApplicationMapper from '../../mappers/jobApplication/JobApplication.mapperClass';

@injectable()
export default class GetJobApplicationDetailsUseCase implements IGetJobApplicationDetailsUseCase {
  constructor(
    @inject('IJobApplicationRepository') private _repo: IJobApplicationRepo,
    @inject('JobApplicationMapper') private _mapper: JobApplicationMapper
  ) {}

  async execute(applicationId: string): Promise<SingleApplicationDetailsForRecruiterDTO | null> {
    const result = await this._repo.getApplicationDetails(applicationId);
    if (result) {
      const dto = this._mapper.SingleJobApplicationDetailsAggregatedToDTO(result);
      return dto;
    }
    return null;
  }
}
