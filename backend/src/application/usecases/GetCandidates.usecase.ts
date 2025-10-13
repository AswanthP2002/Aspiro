import Candidate from '../../domain/entities/candidate/candidates.LEGACY';
import ICandidateRepo from '../../domain/interfaces/candidate/ICandidateRepo';
import { FindCandidatesDTO } from '../DTOs/candidate/candidate.dto';
import CandidatePaginatedDTO from '../DTOs/candidate/candidatePaginated.dto';
import mapToCandidatePaginatedDTO from '../mappers/candidate/mapToCandidatePaginatedDTO.mapper';
import IGetCandidatesUseCase from './interfaces/IGetCandidates.usecase';

export default class GetCandidatesUseCase implements IGetCandidatesUseCase {
  constructor(private _iCandidateRepo: ICandidateRepo) {}

  async execute(
    getCandidatesDto: FindCandidatesDTO
  ): Promise<CandidatePaginatedDTO | null> {
    const { search, page, limit, sort, filter } = getCandidatesDto;
    const result = await this._iCandidateRepo.findCandidates({
      search,
      page,
      limit,
      sortOption: { createdAt: 1, name: 1 },
      filterOptions: { jobRole: [], status: [] },
    });
    if (result) {
      const dto = mapToCandidatePaginatedDTO(result);
      return dto;
    }

    return null;
  }
}
