import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import CreateExperienceDTO, { ExperienceDTO } from '../../DTOs/user/experience.dto';
import mapToExperience from '../../mappers/user/mapToExperience.mapper';
import mapToExperienceDTO from '../../mappers/user/mapToExperienceDTO.mapper';
import { inject, injectable } from 'tsyringe';
import IAddUserExperienceUsecase from '../../interfaces/usecases/user/IAddUserExperience.usecase';

@injectable()
export default class AddUserExperienceUsecase implements IAddUserExperienceUsecase {
  constructor(@inject('IExperienceRepository') private _experienceRepo : IExperienceRepo) {}

  async execute(createExperienceDto: CreateExperienceDTO): Promise<ExperienceDTO | null> {
    const newExperience = mapToExperience(createExperienceDto);

    const result = await this._experienceRepo.create(newExperience);
    if (result) {
      const dto = mapToExperienceDTO(result);
      return dto;
    }

    return null;
  }
}
