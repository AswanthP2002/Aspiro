import IJobRepo from '../../../domain/interfaces/IJobRepo';
import ICreateJobUseCase from '../../interfaces/usecases/job/ICreateJob.usecase';
import CreateJobDTO, { JobDTO } from '../../DTOs/job/createJob.dto';
import mapToJobFromCreateJobDTO from '../../mappers/job/mapToJobFromCreateJobDTO.mapper';
import { inject, injectable } from 'tsyringe';
import JobMapper from '../../mappers/job/Job.mapperClass';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';

@injectable()
export default class CreateJobUseCase implements ICreateJobUseCase {
  constructor(
    @inject('IJobRepository') private _jobRepo: IJobRepo,
    @inject('JobMapper') private _mapper: JobMapper,
    @inject('ISubscriptionRepository') private _subscriptionRepo: ISubscriptionRepo
  ) {}

  async execute(createjobDto: CreateJobDTO): Promise<JobDTO | null> {
    const newJob = mapToJobFromCreateJobDTO(createjobDto);
    const result = await this._jobRepo.create(newJob);
    const userSubscriptionData = await this._subscriptionRepo.getUserSubscriptionDetails(
      createjobDto.recruiterId as string
    );

    if (userSubscriptionData && userSubscriptionData.features) {
      const existingCount = userSubscriptionData?.features['jobApplications'];
      if (parseInt(existingCount.toString()) > 0) {
        const reminingCount = parseInt(existingCount.toString()) - 1;
        await this._subscriptionRepo.updateFeaturesJobCreationCountByUserId(
          createjobDto.recruiterId as string,
          reminingCount.toString()
        );
      }
    }

    if (result) {
      const dto = this._mapper.jobEntityToJobDTO(result);
      return dto;
    }

    return null;
  }
}
