import { JobApplicationDTO } from "../../../DTOs/candidate -LEGACY/jobApplication.dto.FIX";
import UpdateJobApplicationStatusDTO from "../../../DTOs/recruiter/UpdateJobApplicationStatus.dto";

export default interface IUpdateJobApplicationStatusUsecase {
    execute(updateJobApplicationDto: UpdateJobApplicationStatusDTO): Promise<JobApplicationDTO | null>
}