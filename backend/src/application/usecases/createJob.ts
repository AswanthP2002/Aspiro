import IJobRepo from "../../domain/interfaces/IJobRepo";
import ICreateJobUseCase from "./recruiter/interface/ICreateJobUseCase";
import CreateJobDTO, { JobDTO } from "../DTOs/recruiter/createJobDTO";
import mapToJobFromCreateJobDTO from "../mappers/recruiter/mapToJobFromCreateJobDTO";
import mapToJobDTOFromJob from "../mappers/recruiter/mapToJobDTOFromJob";


export default class CreateJobUseCase implements ICreateJobUseCase {
    constructor(private jobRepo : IJobRepo){}

    async execute(createjobDto : CreateJobDTO) : Promise<JobDTO | null> {
        const newJob = mapToJobFromCreateJobDTO(createjobDto)        
        const result = await this.jobRepo.create(newJob)
        
        if(result){
            const dto = mapToJobDTOFromJob(result)
            return dto
        }

        return null
    }
}