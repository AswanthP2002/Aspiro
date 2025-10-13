import IExperienceRepo from '../../../domain/interfaces/candidate/IExperienceRepo';
import IAddExperience from './interface/IAddExperience.usecase';
import CreateExperienceDTO, {
  ExperienceDTO,
} from '../../DTOs/candidate/experience.dto';
import mapToExperience from '../../mappers/candidate/mapToExperience.mapper';
import mapToExperienceDTO from '../../mappers/candidate/mapToExperienceDTO.mapper';

export default class AddExperienceUseCase implements IAddExperience {
  constructor(private _experienceRepo: IExperienceRepo) {}

  async execute(
    createExperienceDto: CreateExperienceDTO
  ): Promise<ExperienceDTO | null> {
    const newExperience = mapToExperience(createExperienceDto);

    const result = await this._experienceRepo.create(newExperience);
    if (result) {
      const dto = mapToExperienceDTO(result);
      return dto;
    }

    return null;
  }
}
