import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import CreateJobApplicationDTO, {
  JobApplicationDTO,
} from '../../DTOs/jobApplication/jobApplication.dto.FIX';
import IApplyJobUsecase from '../../interfaces/usecases/jobApplication/IApplyJob.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import JobApplicationMapper from '../../mappers/jobApplication/JobApplication.mapperClass';

@injectable()
export default class ApplyJobUsecase implements IApplyJobUsecase {
  constructor(
    @inject('IJobApplicationRepository') private _iJobApplicationRepo: IJobApplicationRepo,
    @inject('IJobRepository') private _iJobRepo: IJobRepo,
    @inject('JobApplicationMapper') private _mapper: JobApplicationMapper
  ) {}

  async execute(
    createJobApplicationDto: CreateJobApplicationDTO
  ): Promise<JobApplicationDTO | null> {
    console.log('-- checking job application credentials from usecase --');
    console.log('-- dto before mapping --', createJobApplicationDto);
    const newJobApplication =
      this._mapper.createJobApplicationDtoToJobApplicationEntity(createJobApplicationDto);
    console.log('-- enttiy after mapping --', newJobApplication);
    const result = await this._iJobApplicationRepo.create(newJobApplication);
    if (result) {
      await this._iJobRepo.incraseApplicationCount(newJobApplication.jobId as string);
      return this._mapper.jobApplicationEntityToDTO(result);
    }

    return null;
  }
}
