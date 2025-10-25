import { ExperienceDTO } from "../../../DTOs/user/experience.dto";

export default interface IGetUserExperiencesUsecase {
    execute(userId? : string) : Promise<ExperienceDTO[] | null>
}