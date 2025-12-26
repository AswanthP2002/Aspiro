import { ExperienceDto } from '../../../DTOs/user/experience.dto.FIX';

export default interface IGetUserExperiencesUsecase {
  execute(userId?: string): Promise<ExperienceDto[] | null>;
}
