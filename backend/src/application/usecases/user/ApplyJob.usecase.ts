import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import ISaveJobApplicationUseCase from '../../interfaces/usecases/user/IApplyJob.usecase';
import CreateJobApplicationDTO, {
  JobApplicationDTO,
} from '../../DTOs/candidate -LEGACY/jobApplication.dto';
import mapToJobApplicationFromCreateJobDTO from '../../mappers/user/mapToJobFromCreateJobDTO.mapper';
import mapToJobApplicationDTOFromJobApplication from '../../mappers/user/mapToJobApplicationDTOFromJobApplication.mapper';
import IApplyJobUsecase from '../../interfaces/usecases/user/IApplyJob.usecase';
import { inject, injectable } from 'tsyringe';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import JobApplicationAggregated from '../../../domain/entities/user/jobApplicationAggregated.entity';

@injectable()
export default class ApplyJobUsecase implements IApplyJobUsecase {
  constructor(
    @inject('IJobApplicationRepository') private _iJobApplicationRepo: IJobApplicationRepo,
    @inject('IJobRepository') private _iJobRepo: IJobRepo
  ) {}

  async execute(createJobApplicationDto: CreateJobApplicationDTO): Promise<JobApplicationDTO | null> {
    try {
      const newJobApplication = mapToJobApplicationFromCreateJobDTO(createJobApplicationDto);
      // const appllications = await this._iJobApplicationRepo.getCandidateSpecificApplications(newJobApplication.candidateId as string)
      // const jobsAppliedToday = appllications?.filter((application: JobApplicationAggregated) => {
      //   return application.createdAt
      // })

      //save job application
      const result = await this._iJobApplicationRepo.create(newJobApplication);

      //increate application count on that job
      const job = await this._iJobRepo.findById(createJobApplicationDto.jobId as string)
      if(job){
        await this._iJobRepo.incraseApplicationCount(job._id as string)
      }
      if (result) {
        const dto = mapToJobApplicationDTOFromJobApplication(result);
        return dto;
      }
      return null;
    } catch (error: unknown) {
      throw error
    }
  }
}
