import Education from '../../../domain/entities/user/educations.entity';
import IEducationRepo from '../../../domain/interfaces/candidate/IEducationRepo';
import { EducationDTO } from '../../DTOs/user/education.dto';
import mapToEducationDTOFromEducation from '../../mappers/user/mapToEducationDTOFromEducation.mapper';
import IGetUserEducationsUsecase from '../../interfaces/usecases/user/IGetUserEducations.usecase';
import { inject, injectable } from 'tsyringe';


@injectable()
export default class GetUserEducationsUsecase implements IGetUserEducationsUsecase {
  constructor(@inject('IEducationRepository') private _educationRepo : IEducationRepo) {}

  async execute(userId: string): Promise<EducationDTO[] | null> {
    const result = await this._educationRepo.findWithUserId(userId)
    
    if (result) {
      const dto: EducationDTO[] = [];
      result.forEach((education: Education) => {
        dto.push(mapToEducationDTOFromEducation(education));
      });
      return dto;
    }
    return null;
  }
}
