import CreateJobApplicationDTO, {
  JobApplicationDTO,
} from '../../../DTOs/jobApplication/jobApplication.dto';

export default interface IApplyJobUsecase {
  execute(createJobApplicationDto: CreateJobApplicationDTO): Promise<JobApplicationDTO | null>;
}
