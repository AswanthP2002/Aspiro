import Experience from "../../../../domain/entities/candidate/experience";
import { ExperienceDTO } from "../../../../presentation/controllers/dtos/candidate/experienceDTO";
import CreateExperienceDTO from "../../../DTOs/candidate/experienceDTO";

export default interface IAddExperience {
    execute(createExperienceDto : CreateExperienceDTO) : Promise<ExperienceDTO | null>
}