import CandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import CandidateDTO from '../../DTOs/candidate/candidate.dto';
import UpdateCandidateDTO from '../../DTOs/candidate/updateCandidate.dto';
import mapToCandidateDTO from '../../mappers/user/mapToCandidateDTO.mapper';
import mapUpdateCandidateDtoToEntity from '../../mappers/user/mapUpdateCandidateDtoToEntity.mapper';
import IEditProfileUseCase from './interface/IEditProfile.usecase';

export default class EditProfileUseCase implements IEditProfileUseCase {
  constructor(private _iCandidateRepo: CandidateRepo) {}

  async execute(
    updateCandidateDto: UpdateCandidateDTO
  ): Promise<CandidateDTO | null> {
    //const candidate = await this._iCandidateRepo.findByUserId(updateCandidateDto._id)
    const updateData = mapUpdateCandidateDtoToEntity({
      _id: updateCandidateDto._id,
      ...updateCandidateDto,
    });

    const result = await this._iCandidateRepo.update(
      updateData._id?.toString(),
      updateData
    );

    if (result) {
      const dto = mapToCandidateDTO(result);
      return dto;
    }
    return null;
  }
}
