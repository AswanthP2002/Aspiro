import IUserRepository from '../../../domain/interfaces/IUserRepo';
import deleteAssetsCloudinary from '../../../services/deleteAssetsCloudinary';
import { RemoveCoverPhotoDTO } from '../../DTOs/candidate -LEGACY/removeProfilePhoto.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IRemoveUserCoverPhotoUsecase from '../../interfaces/usecases/user/IRemoveUserCoverPhoto.usecase.FIX';
import { UserDto } from '../../DTOs/user/user.dto.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class RemoveUserCoverPhotoUsecase implements IRemoveUserCoverPhotoUsecase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(removeCoverphotoDto: RemoveCoverPhotoDTO): Promise<UserDto | null> {
    const { userId, cloudinaryPublicId } = removeCoverphotoDto;
    await deleteAssetsCloudinary(cloudinaryPublicId);

    //update db
    const result = await this._userRepo.update(userId.toString(), {
      coverPhoto: { cloudinarySecureUrl: '', cloudinaryPublicId: '' },
    });
    if (result) {
      const dto = plainToInstance(UserDto, result);
      return dto;
    }

    return null;
  }
}
