import IUserRepository from '../../../domain/interfaces/IUserRepo';
import deleteAssetsCloudinary from '../../../services/deleteAssetsCloudinary';
import RemoveProfilePhotoDTO from '../../DTOs/user/removeProfilePhoto.dto.FIX';
import IRemoveUserProfilePictureUsecase from '../../interfaces/usecases/user/IRemoveUserProfilePciture.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import UserDTO from '../../DTOs/user/user.dto.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export default class RemoveUserProfilePictureUsecase implements IRemoveUserProfilePictureUsecase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(removeProfilePhotoDto: RemoveProfilePhotoDTO): Promise<UserDTO | null> {
    const { userId, cloudinaryPublicId } = removeProfilePhotoDto;

    await deleteAssetsCloudinary(cloudinaryPublicId);

    const result = await this._userRepo.update(userId.toString(), {
      profilePicture: { cloudinaryPublicId: '', cloudinarySecureUrl: '' },
    });

    if (result) {
      const dto = this._mapper.userToUserDto(result);
      return dto;
    }

    return null;
  }
}
