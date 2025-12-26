import CreateJobApplicationDTO, {
  JobApplicationDTO,
} from '../../../DTOs/candidate -LEGACY/jobApplication.dto.FIX';

export default interface IApplyJobUsecase {
  execute(createJobApplicationDto: CreateJobApplicationDTO): Promise<JobApplicationDTO | null>;
}
