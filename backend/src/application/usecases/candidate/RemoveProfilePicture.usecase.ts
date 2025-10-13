import User from '../../../domain/entities/shared/User.entitty';
import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import IUserRepository from '../../../domain/interfaces/IUserRepo.refactored';
import deleteAssetsCloudinary from '../../../services/deleteAssetsCloudinary';
import RemoveProfilePhotoDTO from '../../DTOs/candidate/removeProfilePhoto.dto';
import mapUserToUserDTO from '../../mappers/shared/mapUserToUserDTO.mapper';
import IRemoveProfilePictureUseCase from './interface/IRemoveProfilePicture.usecase';

export default class RemoveProfilePictureUseCase
  implements IRemoveProfilePictureUseCase
{
  constructor(
    private _iCandidateRepo: ICandidateRepo,
    private _userRepo: IUserRepository
  ) {}

  async execute(
    removeProfilePhotoDto: RemoveProfilePhotoDTO
  ): Promise<User | null> {
    //delete image from cloudinary
    const { candidateId, cloudinaryPublicId } = removeProfilePhotoDto;

    await deleteAssetsCloudinary(cloudinaryPublicId);

    //update database
    const result = await this._userRepo.update(candidateId.toString(), {
      profilePicture: { cloudinaryPublicId: '', cloudinarySecureUrl: '' },
    });
    if (result) {
      const dto = mapUserToUserDTO(result);
      return dto;
    }

    return null;
  }
}
