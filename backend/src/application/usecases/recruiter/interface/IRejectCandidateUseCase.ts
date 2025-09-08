import { JobApplicationDTO } from "../../../DTOs/candidate/jobApplicationDTO";

export default interface IRejectCandidateUseCase {
    execute(applicationId : string) : Promise<JobApplicationDTO | null>
}