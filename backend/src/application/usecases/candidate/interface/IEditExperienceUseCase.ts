import { EditExperienceDTO, ExperienceDTO } from "../../../DTOs/candidate/experienceDTO";

export default interface IEditExperienceUseCase {
    execute(experienceId : string, editExperienceDto : EditExperienceDTO) : Promise<ExperienceDTO | null>
}