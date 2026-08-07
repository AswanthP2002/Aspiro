import { ExperienceDTO } from '../../../DTOs/experience/experience.dto';

export default interface IGetUserExperiencesUsecase {
  execute(userId?: string): Promise<ExperienceDTO[] | null>;
}
