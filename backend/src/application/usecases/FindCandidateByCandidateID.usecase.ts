import { inject, injectable } from 'tsyringe';
import IFindCandidateByCandidateIdUseCase from './interfaces/IFindCandidateByCandidateID.usecase';
import ICandidateRepo from '../../domain/interfaces/candidate/ICandidateRepo';
import CandidateDTO from '../DTOs/candidate/candidate.dto';
import mapToCandidateDTO from '../mappers/user/mapToCandidateDTO.mapper';

@injectable()
export default class FindCandidateByCandidateIDUseCase
  implements IFindCandidateByCandidateIdUseCase
{
  constructor(
    @inject('ICandidateRepository') private _CandidateRepository: ICandidateRepo
  ) {}

  async execute(candidateId: string): Promise<CandidateDTO | null> {
    const result = await this._CandidateRepository.findById(candidateId);
    if (result) {
      const candidateDto = mapToCandidateDTO(result);
      return candidateDto;
    }

    return null;
  }
}
