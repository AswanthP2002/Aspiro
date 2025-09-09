import Experience from "../../../../domain/entities/candidate/experience";
import { ExperienceDTO } from "../../../../presentation/controllers/dtos/candidate/experienceDTO";

export default interface ILoadExperiencesUseCase {
    execute(candidateId : string) : Promise<ExperienceDTO[] | null>
}