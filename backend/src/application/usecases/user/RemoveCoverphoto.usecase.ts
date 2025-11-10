import User from '../../../domain/entities/user/User';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import deleteAssetsCloudinary from '../../../services/deleteAssetsCloudinary';
import { RemoveCoverPhotoDTO } from '../../DTOs/candidate -LEGACY/removeProfilePhoto.dto';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import { inject, injectable } from 'tsyringe';
import IRemoveUserCoverPhotoUsecase from '../../interfaces/usecases/user/IRemoveUserCoverPhoto.usecase';


@injectable()
export default class RemoveUserCoverPhotoUsecase implements IRemoveUserCoverPhotoUsecase {
  constructor(@inject('IUserRepository') private _userRepo : IUserRepository) {}

  async execute(removeCoverphotoDto: RemoveCoverPhotoDTO): Promise<User | null> {
    const { userId, cloudinaryPublicId } = removeCoverphotoDto;
    await deleteAssetsCloudinary(cloudinaryPublicId);

    //update db
    const result = await this._userRepo.update(userId.toString(), {
      coverPhoto: { cloudinarySecureUrl: '', cloudinaryPublicId: '' },
    });
    if (result) {
      const dto = mapUserToUserDTO(result);
      return dto;
    }

    return null;
  }
}
