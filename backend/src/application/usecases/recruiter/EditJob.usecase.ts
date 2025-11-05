import { inject, injectable } from "tsyringe";
import IEditJobUsecase from "../../interfaces/usecases/recruiter/IEditJob.usecase";
import IJobRepo from "../../../domain/interfaces/IJobRepo";
import { EditJobDTO, JobDTO } from "../../DTOs/recruiter/createJob.dto";
import mapToJobFromEditJobDTO from "../../mappers/recruiter/mapToJobFromEditJobDTO.mapper";
import mapToJobDTOFromJob from "../../mappers/recruiter/mapToJobDTOFromJob.mapper";

@injectable()
export default class EditJobUsecase implements IEditJobUsecase {
    constructor(@inject('IJobRepository') private _jobRepo: IJobRepo) {}

    async execute(editJobDto: EditJobDTO): Promise<JobDTO | null> {
        const editableJob = mapToJobFromEditJobDTO(editJobDto)
        const result = await this._jobRepo.update(editableJob._id as string, editableJob)

        if(result){
            const jobDto = mapToJobDTOFromJob(result)
            return jobDto
        }

        return result
    }
}