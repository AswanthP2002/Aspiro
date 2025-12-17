import ICandidateRepo from '../../domain/interfaces/user/ICandidateRepo';
import CandidateAggregatedDTO from '../DTOs/candidate -LEGACY/candidateAggregated.dto';
import mapToCandidateAggDTO from '../mappers/user/mapToCandidateAggDTO.mapper';
import IGetCandidateDetailsUseCase from './interfaces/IGetCandiateDetails.usecase';

export default class GetCandidateDetailsUseCase
  implements IGetCandidateDetailsUseCase
{
  constructor(private _iCandidateRepo: ICandidateRepo) {}

  async execute(candidateId: string): Promise<CandidateAggregatedDTO | null> {
    const result = await this._iCandidateRepo.candidateAggregatedData(
      candidateId
    );
    if (result) {
      const dto = mapToCandidateAggDTO(result);
      return dto;
    }
    return null;
  }
}
