import { EditJobDTO, JobDTO } from "../../../DTOs/recruiter/createJob.dto";

export default interface IEditJobUsecase {
    execute(editJobDto: EditJobDTO): Promise<JobDTO | null>
}