import CreateJobApplicationDTO, {
  JobApplicationDTO,
} from '../../../DTOs/jobApplication/jobApplication.dto.FIX';

export default interface IApplyJobUsecase {
  execute(createJobApplicationDto: CreateJobApplicationDTO): Promise<JobApplicationDTO | null>;
}
