import { ExperienceDTO } from '../../../DTOs/user/experience.dto.FIX';

export default interface IGetUserExperiencesUsecase {
  execute(userId?: string): Promise<ExperienceDTO[] | null>;
}
