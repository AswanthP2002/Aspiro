import IUserRepository from '../../../domain/interfaces/IUserRepo';
import deleteAssetsCloudinary from '../../../services/deleteAssetsCloudinary';
import RemoveProfilePhotoDTO from '../../DTOs/candidate -LEGACY/removeProfilePhoto.dto';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import IRemoveUserProfilePictureUsecase from '../../interfaces/usecases/user/IRemoveUserProfilePciture.usecase';
import { inject, injectable } from 'tsyringe';
import UserDTO from '../../DTOs/user/user.dto';

@injectable()
export default class RemoveUserProfilePictureUsecase implements IRemoveUserProfilePictureUsecase {
  constructor(@inject('IUserRepository') private _userRepo : IUserRepository) {}

  async execute(removeProfilePhotoDto: RemoveProfilePhotoDTO): Promise<UserDTO | null> {
    //delete image from cloudinary
    const { userId, cloudinaryPublicId } = removeProfilePhotoDto;

    await deleteAssetsCloudinary(cloudinaryPublicId);

    //update database
    const result = await this._userRepo.update(userId.toString(), {
      profilePicture: { cloudinaryPublicId: '', cloudinarySecureUrl: '' },
    });

    if (result) {
      const dto = mapUserToUserDTO(result);
      return dto;
    }

    return null;
  }
}
