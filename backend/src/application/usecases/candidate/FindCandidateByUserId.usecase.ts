import { inject, injectable } from 'tsyringe';
import ICandidateRepo from '../../../domain/interfaces/user/ICandidateRepo';
import CandidateDTO from '../../DTOs/candidate -LEGACY/candidate.dto';
import mapToCandidateDTO from '../../mappers/user/mapToCandidateDTO.mapper';
import IFindCandidateByUserIdUseCase from './interface/IFindCandidateByUserId.usecase';

@injectable()
export default class FindCandidateByUserIdUseCase
  implements IFindCandidateByUserIdUseCase
{
  constructor(
    @inject('ICandidateRepository') private _candidateRepo: ICandidateRepo
  ) {}

  async execute(userId?: string): Promise<CandidateDTO | null> {
    const result = await this._candidateRepo.findByUserId(userId);

    if (result) {
      const dto = mapToCandidateDTO(result);
      return dto;
    }

    return null;
  }
}
