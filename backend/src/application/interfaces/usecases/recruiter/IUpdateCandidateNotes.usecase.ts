import { JobApplicationDTO } from '../../../DTOs/job/jobApplication.dto.FIX';

export default interface IUpdateCandidateNotes {
  execute(dto: JobApplicationDTO): Promise<JobApplicationDTO | null>;
}
