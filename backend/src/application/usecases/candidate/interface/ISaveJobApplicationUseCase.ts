import JobApplication from "../../../../domain/entities/candidate/jobApplication";
import CreateJobApplicationDTO, { JobApplicationDTO } from "../../../DTOs/candidate/jobApplicationDTO";

export default interface ISaveJobApplicationUseCase {
    execute(createJobApplicationDto : CreateJobApplicationDTO) : Promise<JobApplicationDTO | null>
}