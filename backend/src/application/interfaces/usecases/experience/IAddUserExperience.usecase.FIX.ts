import CreateExperienceDTO, { ExperienceDTO } from '../../../DTOs/experience/experience.dto.FIX';

export default interface IAddUserExperienceUsecase {
  execute(createExperienceDto: CreateExperienceDTO): Promise<ExperienceDTO | null>;
}
