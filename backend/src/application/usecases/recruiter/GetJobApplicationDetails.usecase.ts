import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import IGetJobApplicationDetailsUseCase from '../../interfaces/usecases/recruiter/IGetJobApplicationDetails.usecase';
import { inject, injectable } from 'tsyringe';
import { SingleApplicationDetailsForRecruiterDTO } from '../../DTOs/job/JobApplicationsListForRecruiter.dto';
import JobApplicationMapper from '../../mappers/job/JobApplication.mapperClass';

@injectable()
export default class GetJobApplicationDetailsUseCase implements IGetJobApplicationDetailsUseCase {
  constructor(
    @inject('IJobApplicationRepository') private _repo: IJobApplicationRepo,
    @inject('JobApplicationMapper') private _mapper: JobApplicationMapper
  ) {}

  async execute(applicationId: string): Promise<SingleApplicationDetailsForRecruiterDTO | null> {
    const result = await this._repo.getApplicationDetails(applicationId);
    if (result) {
      const dto = this._mapper.SingleJobApplicationDetailsAggregatedToDTO(result)
      return dto;
    }
    return null;
  }
}
