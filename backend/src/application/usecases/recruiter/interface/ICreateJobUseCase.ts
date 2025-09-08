import CreateJobDTO, { JobDTO } from "../../../DTOs/recruiter/createJobDTO";

export default interface ICreateJobUseCase {
    execute(createJobDto : CreateJobDTO) : Promise<JobDTO | null>
}