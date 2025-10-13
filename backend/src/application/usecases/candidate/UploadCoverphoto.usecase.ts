import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import IUserRepository from '../../../domain/interfaces/IUserRepo.refactored';
import imgUploadToCloudinary from '../../../services/uploadToCloudinary';
import CandidateDTO from '../../DTOs/candidate/candidate.dto';
import { UploadCoverPhotoDTO } from '../../DTOs/candidate/uploadCoverPhoto.dto';
import UserDTO from '../../DTOs/shared/user.dto';
import mapToCandidateDTO from '../../mappers/candidate/mapToCandidateDTO.mapper';
import mapUpdateCandidateDtoToEntity from '../../mappers/candidate/mapUpdateCandidateDtoToEntity.mapper';
import mapUpdateUserDtoToUser from '../../mappers/shared/mapUpdateUserDtoToUser.refactored.mapper';
import mapUserToUserDTO from '../../mappers/shared/mapUserToUserDTO.mapper';
import IUploadCoverPhotoUseCase from './interface/IUploadCoverPhoto.usecase';

export default class UploadCoverphotoUseCase
  implements IUploadCoverPhotoUseCase
{
  constructor(
    private _iCandidateRepo: ICandidateRepo,
    private _userRepo: IUserRepository
  ) {}

  async execute(
    uploadCoverPhotoDto: UploadCoverPhotoDTO
  ): Promise<UserDTO | null> {
    const { candidateId } = uploadCoverPhotoDto;
    const cloudinaryResult: any = await imgUploadToCloudinary(
      uploadCoverPhotoDto.imageFile,
      'candidate',
      uploadCoverPhotoDto.publicId
    );
    const { secure_url, public_id } = cloudinaryResult;
    const updateData = mapUpdateUserDtoToUser({
      _id: candidateId.toString(),
      coverPhoto: {
        cloudinarySecureUrl: secure_url,
        cloudinaryPublicId: public_id,
      },
    });

    const result = await this._userRepo.update(
      candidateId.toString(),
      updateData
    );
    if (result) {
      const dto = mapUserToUserDTO(result);
      return dto;
    }
    return null;
  }
}
