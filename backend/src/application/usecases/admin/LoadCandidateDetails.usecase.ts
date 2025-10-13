import { inject, injectable } from 'tsyringe';
import CandidateAggregatedDTO from '../../DTOs/candidate/candidateAggregated.dto';
import mapToCandidateAggDTO from '../../mappers/candidate/mapToCandidateAggDTO.mapper';
import ILoadCandidateDetailsUseCase from './interfaces/ILoadCandidateDetails.usecase';
import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';

@injectable()
export class LoadCandidateDetailsUseCase
  implements ILoadCandidateDetailsUseCase
{
  constructor(
    @inject('ICandidateRepository') private _candidateRepo: ICandidateRepo
  ) {}

  async execute(id: string): Promise<CandidateAggregatedDTO | null> {
    const candidate = await this._candidateRepo.candidateAggregatedData(id);
    if (candidate) {
      const dto = mapToCandidateAggDTO(candidate);
      return dto;
    }

    return null;
  }
}
