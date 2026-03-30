import IEducationRepo from '../../../domain/interfaces/user/IEducationRepo';
import { EducationDTO, UpdateEducationDTO } from '../../DTOs/education/education.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IEditUserEducationUsecase from '../../interfaces/usecases/education/IEditUserEducation.usecase.FIX';
import EducationMapper from '../../mappers/education/Education.mapperClass';

@injectable()
export default class EditUserEducationUsecase implements IEditUserEducationUsecase {
  constructor(
    @inject('IEducationRepository') private _iEducationRepo: IEducationRepo,
    @inject('EducationMapper') private _mapper: EducationMapper
  ) {}

  async execute(updateEducationDto: UpdateEducationDTO): Promise<EducationDTO | null> {
    const { _id } = updateEducationDto;
    const updateEducation = this._mapper.updateEducationDtoToEducation(updateEducationDto);
    const result = await this._iEducationRepo.update(_id as string, updateEducation);
    if (result) {
      const dto = this._mapper.educationToEducationDTO(result);
      return dto;
    }
    return null;
  }
}
