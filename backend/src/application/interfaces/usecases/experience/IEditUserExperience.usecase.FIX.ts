import { EditExperienceDTO, ExperienceDTO } from '../../../DTOs/experience/experience.dto.FIX';

export default interface IEditUserExperienceUsecase {
  execute(editExperienceDto: EditExperienceDTO): Promise<ExperienceDTO | null>;
}
