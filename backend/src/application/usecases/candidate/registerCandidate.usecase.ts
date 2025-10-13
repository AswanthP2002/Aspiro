import bcrypt from 'bcrypt';
import { generateCode } from '../../../utilities/generateCode';
import { sendEmail } from '../../../utilities/sendmail';
import IRegisterCandidateUseCase from './interface/IRegisterCandidate.usecase';
import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import CreateCandidateDTO from '../../DTOs/candidate/createCandidate.dto';
import CandidateDTO from '../../DTOs/candidate/candidate.dto';
import mapToCandidate from '../../mappers/candidate/mapToCandidate.mapper';
import mapToCandidateDTO from '../../mappers/candidate/mapToCandidateDTO.mapper';
import {
  DuplicateEmailError,
  DuplicateMobileError,
} from '../../../domain/errors/AppError';

export default class RegisterCandidateUseCase
  implements IRegisterCandidateUseCase
{
  constructor(private _candidateRepo: ICandidateRepo) {}

  async execute(
    createCandidateDto: CreateCandidateDTO
  ): Promise<CandidateDTO | null> {
    //convert candidatedto into candidate entity to transfer to the repository
    const newCandidate = mapToCandidate(createCandidateDto);
    const createdCandidate = await this._candidateRepo.create(newCandidate);
    //convert it back to dto
    if (createdCandidate) {
      let dto: CandidateDTO = mapToCandidateDTO(createdCandidate);
      return dto;
    }

    return null;
  }
}
