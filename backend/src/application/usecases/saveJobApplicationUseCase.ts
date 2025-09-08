import mongoose from "mongoose";
import JobApplication from "../../domain/entities/candidate/jobApplication";
import IJobApplicationRepo from "../../domain/interfaces/IJobApplicationRepo";
import { createJobApplicationFromDTO } from "../../domain/mappers/candidate/jobApplicationMapper";
import { JobApplicationSchema } from "../../presentation/controllers/dtos/candidate/jobApplicationDTO";
import ISaveJobApplicationUseCase from "./candidate/interface/ISaveJobApplicationUseCase";
import CreateJobApplicationDTO, { JobApplicationDTO } from "../DTOs/candidate/jobApplicationDTO";
import mapToJobApplicationFromCreateJobDTO from "../mappers/candidate/mapToJobFromCreateJobDTO";
import mapToJobApplicationDTOFromJobApplication from "../mappers/candidate/mapToJobApplicationDTOFromJobApplication";

export default class SaveJobApplicationUseCase implements ISaveJobApplicationUseCase {
    constructor(private _iJobApplicationRepo : IJobApplicationRepo){}

    async execute(createJobApplicationDto : CreateJobApplicationDTO) : Promise<JobApplicationDTO | null> {
        const newJobApplication = mapToJobApplicationFromCreateJobDTO(createJobApplicationDto)
        
        const result = await this._iJobApplicationRepo.create(newJobApplication)
        if(result){
            const dto = mapToJobApplicationDTOFromJobApplication(result)
            return dto
        }
        return null
    }
}