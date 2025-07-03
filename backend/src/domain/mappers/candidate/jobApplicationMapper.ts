import { JobApplicationDTO } from "../../../presentation/controllers/dtos/candidate/jobApplicationDTO";
import JobApplication from "../../entities/candidate/jobApplication";

export function createJobApplicationFromDTO(dto : JobApplicationDTO) : JobApplication {
    return {
        ...dto,
        createdAt:new Date(),
        updatedAt:new Date(),
        status:'Opened'
    }
}