import {
  EditExperienceDTO,
  ExperienceDTO,
} from '../../../DTOs/candidate/experience.dto';

export default interface IEditExperienceUseCase {
  execute(editExperienceDto: EditExperienceDTO): Promise<ExperienceDTO | null>;
}
