import { JobApplicationDTO } from '../../../DTOs/jobApplication/jobApplication.dto';

export default interface IUpdateCandidateNotes {
  execute(dto: JobApplicationDTO): Promise<JobApplicationDTO | null>;
}
