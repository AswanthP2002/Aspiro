import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import CreateJobApplicationDTO, {
  JobApplicationDTO,
} from '../../DTOs/jobApplication/jobApplication.dto';
import IApplyJobUsecase from '../../interfaces/usecases/jobApplication/IApplyJob.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import JobApplicationMapper from '../../mappers/jobApplication/JobApplication.mapperClass';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';

@injectable()
export default class ApplyJobUsecase implements IApplyJobUsecase {
  constructor(
    @inject('IJobApplicationRepository') private _iJobApplicationRepo: IJobApplicationRepo,
    @inject('IJobRepository') private _iJobRepo: IJobRepo,
    @inject('ISubscriptionRepository') private _subscriptionRepo: ISubscriptionRepo,
    @inject('JobApplicationMapper') private _mapper: JobApplicationMapper
  ) {}

  async execute(
    createJobApplicationDto: CreateJobApplicationDTO
  ): Promise<JobApplicationDTO | null> {
    const newJobApplication =
      this._mapper.createJobApplicationDtoToJobApplicationEntity(createJobApplicationDto);
    const mySubscription = await this._subscriptionRepo.getUserSubscriptionDetails(
      createJobApplicationDto.candidateId
    );
    const result = await this._iJobApplicationRepo.create(newJobApplication);
    if (result) {
      await this._iJobRepo.incraseApplicationCount(newJobApplication.jobId as string);
      if (mySubscription && mySubscription.features) {
        const count = mySubscription?.features['jobApplications'];
        const remainingCount = parseInt(count as string) - 1;
        await this._subscriptionRepo.updateFeatureJobApplicationCountByUserId(
          createJobApplicationDto.candidateId,
          remainingCount.toString()
        );
      }
      return this._mapper.jobApplicationEntityToDTO(result);
    }

    return null;
  }
}
