import IEducationRepo from '../../../domain/interfaces/candidate/IEducationRepo';
import { EducationDTO, UpdateEducationDTO } from '../../DTOs/user/education.dto';
import mapToEducationDTOFromEducation from '../../mappers/user/mapToEducationDTOFromEducation.mapper';
import mapToEducationFromUpdateEducationDTO from '../../mappers/user/mapToEducationFromUpdateEducationDTO.mapper';
import { inject, injectable } from 'tsyringe';
import IEditUserEducationUsecase from '../../interfaces/usecases/user/IEditUserEducation.usecase';

@injectable()
export default class EditUserEducationUsecase implements IEditUserEducationUsecase {
  constructor(@inject('IEducationRepository') private _iEducationRepo: IEducationRepo) {}

  async execute(updateEducationDto: UpdateEducationDTO): Promise<EducationDTO | null> {
    const { _id } = updateEducationDto;
    const updateEducation = mapToEducationFromUpdateEducationDTO(updateEducationDto);
    console.log('editable data before updting', updateEducation)
    const result = await this._iEducationRepo.update(_id, updateEducation);
    if (result) {
      const dto = mapToEducationDTOFromEducation(result);
      return dto;
    }
    return null;
  }
}
