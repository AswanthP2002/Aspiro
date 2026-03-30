import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import { EditExperienceDTO, ExperienceDTO } from '../../DTOs/experience/experience.dto.FIX';
import IEditUserExperienceUsecase from '../../interfaces/usecases/experience/IEditUserExperience.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import { ExperienceMapper } from '../../mappers/experience/Experience.mapperClass';

@injectable()
export default class EditUserExperienceUsecase implements IEditUserExperienceUsecase {
  constructor(
    @inject('IExperienceRepository') private _experienceRepo: IExperienceRepo,
    @inject('ExperienceMapper') private _mapper: ExperienceMapper
  ) {}

  async execute(editExperienceDto: EditExperienceDTO): Promise<ExperienceDTO | null> {
    const { experienceId } = editExperienceDto;
    const editData = this._mapper.updateExperienceDtoToExperience(editExperienceDto);
    const result = await this._experienceRepo.update(experienceId, editData);
    if (result) {
      const dto = this._mapper.experienceToExperienceDTO(result);

      return dto;
    }
    return null;
  }
}
