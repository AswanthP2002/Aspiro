import CreateExperienceDTO, { ExperienceDTO } from '../../../DTOs/user/experience.dto.FIX';

export default interface IAddUserExperienceUsecase {
  execute(createExperienceDto: CreateExperienceDTO): Promise<ExperienceDTO | null>;
}
