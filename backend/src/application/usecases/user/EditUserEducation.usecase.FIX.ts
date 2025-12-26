import IEducationRepo from '../../../domain/interfaces/user/IEducationRepo';
import { EducationDTO, UpdateEducationDTO } from '../../DTOs/user/education.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IEditUserEducationUsecase from '../../interfaces/usecases/user/IEditUserEducation.usecase.FIX';
import EducationMapper from '../../mappers/user/Education.mapperClass';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class EditUserEducationUsecase implements IEditUserEducationUsecase {
  private _mapper: EducationMapper;
  constructor(@inject('IEducationRepository') private _iEducationRepo: IEducationRepo) {
    this._mapper = new EducationMapper();
  }

  async execute(updateEducationDto: UpdateEducationDTO): Promise<EducationDTO | null> {
    const { _id } = updateEducationDto;
    const updateEducation = this._mapper.updateEducationDtoToEducation(updateEducationDto);
    console.log('editable data before updting', updateEducation);
    const result = await this._iEducationRepo.update(_id, updateEducation);
    if (result) {
      const dto = plainToInstance(EducationDTO, result);
      return dto;
    }
    return null;
  }
}
