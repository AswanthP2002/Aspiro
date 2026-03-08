import { EditExperienceDTO, ExperienceDTO } from '../../../DTOs/user/experience.dto.FIX';

export default interface IEditUserExperienceUsecase {
  execute(editExperienceDto: EditExperienceDTO): Promise<ExperienceDTO | null>;
}
