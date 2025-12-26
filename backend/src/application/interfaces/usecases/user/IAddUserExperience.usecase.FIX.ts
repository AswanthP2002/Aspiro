import { CreateExperienceDto, ExperienceDto } from '../../../DTOs/user/experience.dto.FIX';

export default interface IAddUserExperienceUsecase {
  execute(createExperienceDto: CreateExperienceDto): Promise<ExperienceDto | null>;
}
