import { CreateJobDTO } from "../../presentation/controllers/dtos/jobDTO";
import Job from "../entities/job";

export function createJobFromDTO(dto : CreateJobDTO) : Job {
    return {
        ...dto,
        createdAt:new Date(),
        isBlocked:false,
        isRejected:false,
        updatedAt:new Date()
    }
}