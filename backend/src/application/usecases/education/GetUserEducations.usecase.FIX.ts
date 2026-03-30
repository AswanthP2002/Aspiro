import Education from '../../../domain/entities/education/educations.entity';
import IEducationRepo from '../../../domain/interfaces/user/IEducationRepo';
import { EducationDTO } from '../../DTOs/education/education.dto.FIX';
import IGetUserEducationsUsecase from '../../interfaces/usecases/education/IGetUserEducations.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import EducationMapper from '../../mappers/education/Education.mapperClass';

@injectable()
export default class GetUserEducationsUsecase implements IGetUserEducationsUsecase {
  constructor(
    @inject('IEducationRepository') private _educationRepo: IEducationRepo,
    @inject('EducationMapper') private _mapper: EducationMapper
  ) {}

  async execute(userId: string): Promise<EducationDTO[] | null> {
    const result = await this._educationRepo.findWithUserId(userId);

    if (result) {
      const dto: EducationDTO[] = [];
      result.forEach((education: Education) => {
        dto.push(this._mapper.educationToEducationDTO(education));
      });
      return dto;
    }
    return null;
  }
}
