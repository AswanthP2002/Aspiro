import { JobApplicationDTO } from '../../../DTOs/jobApplication/jobApplication.dto.FIX';

export default interface IUpdateCandidateNotes {
  execute(dto: JobApplicationDTO): Promise<JobApplicationDTO | null>;
}
