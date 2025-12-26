import IUserRepository from '../../../domain/interfaces/IUserRepo';
import deleteAssetsCloudinary from '../../../services/deleteAssetsCloudinary';
import RemoveProfilePhotoDTO from '../../DTOs/candidate -LEGACY/removeProfilePhoto.dto.FIX';
import IRemoveUserProfilePictureUsecase from '../../interfaces/usecases/user/IRemoveUserProfilePciture.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import { UserDto } from '../../DTOs/user/user.dto.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class RemoveUserProfilePictureUsecase implements IRemoveUserProfilePictureUsecase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(removeProfilePhotoDto: RemoveProfilePhotoDTO): Promise<UserDto | null> {
    //delete image from cloudinary
    const { userId, cloudinaryPublicId } = removeProfilePhotoDto;

    await deleteAssetsCloudinary(cloudinaryPublicId);

    //update database
    const result = await this._userRepo.update(userId.toString(), {
      profilePicture: { cloudinaryPublicId: '', cloudinarySecureUrl: '' },
    });

    if (result) {
      const dto = plainToInstance(UserDto, result);
      return dto;
    }

    return null;
  }
}
