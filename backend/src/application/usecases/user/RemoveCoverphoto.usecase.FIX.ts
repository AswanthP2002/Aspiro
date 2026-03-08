import IUserRepository from '../../../domain/interfaces/IUserRepo';
import deleteAssetsCloudinary from '../../../services/deleteAssetsCloudinary';
import { RemoveCoverPhotoDTO } from '../../DTOs/user/removeProfilePhoto.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IRemoveUserCoverPhotoUsecase from '../../interfaces/usecases/user/IRemoveUserCoverPhoto.usecase.FIX';
import UserDTO from '../../DTOs/user/user.dto.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export default class RemoveUserCoverPhotoUsecase implements IRemoveUserCoverPhotoUsecase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(removeCoverphotoDto: RemoveCoverPhotoDTO): Promise<UserDTO | null> {
    const { userId, cloudinaryPublicId } = removeCoverphotoDto;
    await deleteAssetsCloudinary(cloudinaryPublicId);

    //update db
    const result = await this._userRepo.update(userId.toString(), {
      coverPhoto: { cloudinarySecureUrl: '', cloudinaryPublicId: '' },
    });
    if (result) {
      const dto = this._mapper.userToUserDto(result);
      return dto;
    }

    return null;
  }
}
