import { inject, injectable } from 'tsyringe';
import { ITrackMyJobApplicationDetailsUsecase } from '../../interfaces/usecases/jobApplication/ITrackMyJobApplicationDetails.usecase';
import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import JobApplicationMapper from '../../mappers/jobApplication/JobApplication.mapperClass';
import { JobApplicationTrackingDTO } from '../../DTOs/jobApplication/jobApplication.dto.FIX';

@injectable()
export default class TrackMyJobApplicationDetailsUsecase implements ITrackMyJobApplicationDetailsUsecase {
  constructor(
    @inject('IJobApplicationRepository') private _repo: IJobApplicationRepo,
    @inject('JobApplicationMapper') private _mapper: JobApplicationMapper
  ) {}

  async execute(applicationId: string): Promise<JobApplicationTrackingDTO | null> {
    const result = await this._repo.getJobApplicationDetailsCompanyRecruiterCombined(applicationId);
    if (result) {
      return this._mapper.jobApplicationCompanyJobRecruiterEntityToJobApplicationTrackDTO(result);
    }

    return null;
  }
}
