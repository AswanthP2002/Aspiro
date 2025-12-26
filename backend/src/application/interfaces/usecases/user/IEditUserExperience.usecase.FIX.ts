import { ExperienceDto, UpdateExperienceDto } from '../../../DTOs/user/experience.dto.FIX';

export default interface IEditUserExperienceUsecase {
  execute(editExperienceDto: UpdateExperienceDto): Promise<ExperienceDto | null>;
}
