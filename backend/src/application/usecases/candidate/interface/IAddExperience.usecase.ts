import CreateExperienceDTO, {
  ExperienceDTO,
} from '../../../DTOs/candidate/experience.dto';

export default interface IAddExperience {
  execute(
    createExperienceDto: CreateExperienceDTO
  ): Promise<ExperienceDTO | null>;
}
