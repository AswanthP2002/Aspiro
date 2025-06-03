import { ExperienceDTO } from "../../../presentation/controllers/dtos/candidate/experienceDTO";
import Experience from "../../entities/candidate/experience";

export default function createExperienceFromExperienceDTO(dto : ExperienceDTO) : Experience{
    return {
        ...dto,
        createdAt : new Date(),
        updatedAt : new Date(),
    }
}