import { JobApplicationDTO } from "../../../DTOs/candidate -LEGACY/jobApplication.dto";

export default interface IUpdateCandidateNotes {
    execute(dto: JobApplicationDTO): Promise<JobApplicationDTO | null>
}