import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import { EditExperienceDTO, ExperienceDTO } from '../../DTOs/user/experience.dto.FIX';
import IEditUserExperienceUsecase from '../../interfaces/usecases/user/IEditUserExperience.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import { ExperienceMapper } from '../../mappers/user/Experience.mapperClass';

@injectable()
export default class EditUserExperienceUsecase implements IEditUserExperienceUsecase {
  private _mapper: ExperienceMapper;
  constructor(@inject('IExperienceRepository') private _experienceRepo: IExperienceRepo) {
    this._mapper = new ExperienceMapper();
  }

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
