import CreateJobApplicationDTO, {
  JobApplicationDTO,
} from '../../../DTOs/job/jobApplication.dto.FIX';

export default interface IApplyJobUsecase {
  execute(createJobApplicationDto: CreateJobApplicationDTO): Promise<JobApplicationDTO | null>;
}
