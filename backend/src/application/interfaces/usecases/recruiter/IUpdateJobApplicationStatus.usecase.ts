import { JobApplicationDTO } from "../../../DTOs/candidate -LEGACY/jobApplication.dto";
import UpdateJobApplicationStatusDTO from "../../../DTOs/recruiter/UpdateJobApplicationStatus.dto";

export default interface IUpdateJobApplicationStatusUsecase {
    execute(updateJobApplicationDto: UpdateJobApplicationStatusDTO): Promise<JobApplicationDTO | null>
}