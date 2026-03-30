import { ExperienceDTO } from '../../../DTOs/experience/experience.dto.FIX';

export default interface IGetUserExperiencesUsecase {
  execute(userId?: string): Promise<ExperienceDTO[] | null>;
}
