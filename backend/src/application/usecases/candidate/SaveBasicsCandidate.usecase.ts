import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import IUserRepository from '../../../domain/interfaces/IUserRepo.refactored';
import CandidateDTO from '../../DTOs/candidate/candidate.dto';
import UpdateCandidateDTO from '../../DTOs/candidate/updateCandidate.dto';
import mapToCandidateDTO from '../../mappers/candidate/mapToCandidateDTO.mapper';
import mapUpdateCandidateDtoToEntity from '../../mappers/candidate/mapUpdateCandidateDtoToEntity.mapper';
import ISaveBasicsCandidateUseCase from './interface/ISaveBasicsCandidate.usecase';

export default class SaveIntroDetailsUseCase
  implements ISaveBasicsCandidateUseCase
{
  constructor(
    private _candidateRepo: ICandidateRepo,
    private _userRepo: IUserRepository
  ) {}

  async execute(
    updateCandidateDto: UpdateCandidateDTO
  ): Promise<CandidateDTO | null> {
    console.log('upcoming data from the controller', updateCandidateDto);
    const updateData = mapUpdateCandidateDtoToEntity({
      _id: updateCandidateDto?._id,
      ...updateCandidateDto,
    });
    console.log('data after mapping', updateData);
    //throw new Error('Custome error for resting')
    // console.log('this is coming from the controller id, before mapping', updateCandidateDto?._id?.toString(), typeof updateCandidateDto?._id)
    // console.log('this is coming from the controller id, after mapping', updateData?._id?.toString(), typeof updateData?._id)
    //throw new Error('Custome error for testing')
    const result = await this._candidateRepo.update(
      updateData?._id?.toString(),
      updateData
    ); //made update / candidate dtos _id required :: default optional

    if (result) {
      const dto = mapToCandidateDTO(result);
      return dto;
    }
    return null;
  }
}
