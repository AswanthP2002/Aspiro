import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import ISaveJobApplicationUseCase from '../../interfaces/usecases/user/IApplyJob.usecase.FIX';
import CreateJobApplicationDTO, {
  JobApplicationDTO,
} from '../../DTOs/candidate -LEGACY/jobApplication.dto.FIX';
import mapToJobApplicationFromCreateJobDTO from '../../mappers/user/mapToJobFromCreateJobDTO.mapper';
import mapToJobApplicationDTOFromJobApplication from '../../mappers/user/mapToJobApplicationDTOFromJobApplication.mapper';
import IApplyJobUsecase from '../../interfaces/usecases/user/IApplyJob.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import JobApplicationAggregated from '../../../domain/entities/user/jobApplicationAggregated.entity';
import JobApplicationMapper from '../../mappers/user/JobApplication.mapperClass';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class ApplyJobUsecase implements IApplyJobUsecase {
  private _mapper: JobApplicationMapper;
  constructor(
    @inject('IJobApplicationRepository') private _iJobApplicationRepo: IJobApplicationRepo,
    @inject('IJobRepository') private _iJobRepo: IJobRepo
  ) {
    this._mapper = new JobApplicationMapper();
  }

  async execute(
    createJobApplicationDto: CreateJobApplicationDTO
  ): Promise<JobApplicationDTO | null> {
    const newJobApplication =
      this._mapper.createJobApplicationDtoToJobApplication(createJobApplicationDto);

    //save job application
    const result = await this._iJobApplicationRepo.create(newJobApplication);

    //increate application count on that job
    const job = await this._iJobRepo.findById(createJobApplicationDto.jobId as string);
    if (job) {
      await this._iJobRepo.incraseApplicationCount(job._id as string);
    }
    if (result) {
      const dto = plainToInstance(JobApplicationDTO, result);
      return dto;
    }
    return null;
  }
}
