import IEducationRepo from '../../../domain/interfaces/candidate/IEducationRepo';
import {
  EducationDTO,
  UpdateEducationDTO,
} from '../../DTOs/candidate/education.dto';
import mapToEducationDTOFromEducation from '../../mappers/candidate/mapToEducationDTOFromEducation.mapper';
import mapToEducationFromUpdateEducationDTO from '../../mappers/candidate/mapToEducationFromUpdateEducationDTO.mapper';
import IEditEducationUseCase from './interface/IEditEducation.usecase';

export default class EditEducationUseCase implements IEditEducationUseCase {
  constructor(private _iEducationRepo: IEducationRepo) {}

  async execute(
    updateEducationDto: UpdateEducationDTO
  ): Promise<EducationDTO | null> {
    const { _id } = updateEducationDto;
    const updateEducation =
      mapToEducationFromUpdateEducationDTO(updateEducationDto);
    const result = await this._iEducationRepo.update(_id, updateEducation);
    if (result) {
      const dto = mapToEducationDTOFromEducation(result);
      return dto;
    }
    return null;
  }
}
