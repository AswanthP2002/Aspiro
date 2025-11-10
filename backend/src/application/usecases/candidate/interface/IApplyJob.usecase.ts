import CreateJobApplicationDTO, {
  JobApplicationDTO,
} from '../../../DTOs/candidate -LEGACY/jobApplication.dto';

export default interface ISaveJobApplicationUseCase {
  execute(
    createJobApplicationDto: CreateJobApplicationDTO
  ): Promise<JobApplicationDTO | null>;
}
