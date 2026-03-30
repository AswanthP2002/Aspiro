import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import CreateExperienceDTO, { ExperienceDTO } from '../../DTOs/experience/experience.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IAddUserExperienceUsecase from '../../interfaces/usecases/experience/IAddUserExperience.usecase.FIX';
import { ExperienceMapper } from '../../mappers/experience/Experience.mapperClass';

@injectable()
export default class AddUserExperienceUsecase implements IAddUserExperienceUsecase {
  constructor(
    @inject('IExperienceRepository') private _experienceRepo: IExperienceRepo,
    @inject('ExperienceMapper') private _mapper: ExperienceMapper
  ) {}

  async execute(createExperienceDto: CreateExperienceDTO): Promise<ExperienceDTO | null> {
    const newExperience = this._mapper.dtoToExperience(createExperienceDto);

    const result = await this._experienceRepo.create(newExperience);
    if (result) {
      const dto = this._mapper.experienceToExperienceDTO(result);
      return dto;
    }

    return null;
  }
}
