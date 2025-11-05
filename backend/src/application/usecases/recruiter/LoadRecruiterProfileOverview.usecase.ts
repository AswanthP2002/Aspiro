import { inject, injectable } from 'tsyringe';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import ILoadRecruiterProfileOverviewUsecase from '../../interfaces/usecases/recruiter/ILoadRecruiterProfileOverview.usecase';
import mapProfileOverviewDataToDTO from '../../mappers/recruiter/mapProfileOvervieDataToDTO.mapper';
import RecruiterProfilelOverviewDataDTO from '../../DTOs/recruiter/recruiterProfileOverviewData.dto';

@injectable()
export class LoadRecruiterProfileOverviewUsecase implements ILoadRecruiterProfileOverviewUsecase {
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {}

  async execute(recruiterId: string): Promise<RecruiterProfilelOverviewDataDTO | null> {
    const result = await this._recruiterRepo.getRecruiterProfileOverview(recruiterId);

    if (result) {
      const dto = mapProfileOverviewDataToDTO(result)
      return dto;
    }
    return result;
  }
}
