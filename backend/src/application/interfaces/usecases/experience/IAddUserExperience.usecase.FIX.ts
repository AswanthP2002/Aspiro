import CreateExperienceDTO, { ExperienceDTO } from '../../../DTOs/experience/experience.dto';

export default interface IAddUserExperienceUsecase {
  execute(createExperienceDto: CreateExperienceDTO): Promise<ExperienceDTO | null>;
}
