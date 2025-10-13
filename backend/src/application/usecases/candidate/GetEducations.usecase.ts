import Education from '../../../domain/entities/candidate/educations.entity';
import IEducationRepo from '../../../domain/interfaces/candidate/IEducationRepo';
import { EducationDTO } from '../../DTOs/candidate/education.dto';
import mapToEducationDTOFromEducation from '../../mappers/candidate/mapToEducationDTOFromEducation.mapper';
import ILoadEducationsUseCase from './interface/IGetEducations.usecase';

export default class GetEducationsUseCase implements ILoadEducationsUseCase {
  constructor(private _iEducationRepo: IEducationRepo) {}

  async execute(candidateId: string): Promise<EducationDTO[] | null> {
    const result = await this._iEducationRepo.findWithCandidateId(
      candidateId.toString()
    );
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
