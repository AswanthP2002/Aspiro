import { EducationDTO } from "../../../presentation/controllers/dtos/candidate/educationDTO";
import Education from "../../entities/candidate/educations";

export function createEducationFromDTO(dto : EducationDTO) : Education {
    return {
        ...dto,
        createdAt:new Date(),
        updatedAt:new Date(),
    }
}