import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import CandidateAggregatedDTO from '../../DTOs/candidate/candidateAggregated.dto';
import mapCandidateAggToOverviewData from '../../mappers/candidate/mapCandidateAggToOverviewData.mapper';
import ILoadCandidatePersonalDataUseCase from './interface/ILoadCandidatePersonalData.usecase';

export class LoadCandidatePersonalDataUC
  implements ILoadCandidatePersonalDataUseCase
{
  constructor(private _repo: ICandidateRepo) {}

  async execute(id: string): Promise<CandidateAggregatedDTO | null> {
    const candidateDetails = await this._repo.candidateAggregatedData(id);
    //console.log('logging from the usecase itself entity', candidateDetails)
    if (candidateDetails) {
      const dto = mapCandidateAggToOverviewData(candidateDetails);
      //console.log('logging from the usecase itself dto', dto)
      return dto;
    }
    return null;
  }
}
