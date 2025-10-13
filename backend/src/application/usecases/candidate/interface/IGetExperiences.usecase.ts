import { ExperienceDTO } from "../../../DTOs/candidate/experience.dto";

export default interface ILoadExperiencesUseCase {
    execute(candidateId? : string) : Promise<ExperienceDTO[] | null>
}